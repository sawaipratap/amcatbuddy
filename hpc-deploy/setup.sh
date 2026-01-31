#!/bin/bash
# =============================================================================
# Judge0 HPC Deployment Script for Apptainer
# =============================================================================
# This script sets up Judge0 code execution service on an HPC cluster
# using Apptainer (formerly Singularity) containers.
#
# Prerequisites:
#   - Apptainer installed (verify with: apptainer --version)
#   - Internet access to pull Docker images
#   - Sufficient disk space (~5GB for images)
#
# Usage:
#   1. Copy this entire 'hpc-deploy' folder to your HPC server
#   2. Run: chmod +x *.sh
#   3. Run: ./setup.sh
#   4. Run: ./start-all.sh
# =============================================================================

set -e  # Exit on error

echo "=============================================="
echo "  Judge0 HPC Setup with Apptainer"
echo "=============================================="

# Configuration
DEPLOY_DIR="${JUDGE0_DEPLOY_DIR:-$HOME/judge0-hpc}"
PORT="${JUDGE0_PORT:-2358}"

echo ""
echo "📁 Deployment directory: $DEPLOY_DIR"
echo "🔌 Judge0 API port: $PORT"
echo ""

# Create directory structure
echo "📂 Creating directory structure..."
mkdir -p "$DEPLOY_DIR"/{images,data/postgres,data/redis,logs}
cd "$DEPLOY_DIR"

# Copy configuration files if running from source
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/judge0.def" ]; then
    cp "$SCRIPT_DIR"/*.def "$DEPLOY_DIR/" 2>/dev/null || true
    cp "$SCRIPT_DIR"/*.sh "$DEPLOY_DIR/" 2>/dev/null || true
fi

# Pull Docker images and convert to SIF
echo ""
echo "📦 Pulling container images (this may take 10-15 minutes)..."
echo ""

cd "$DEPLOY_DIR/images"

# Redis
if [ ! -f "redis.sif" ]; then
    echo "  → Pulling Redis..."
    apptainer pull --name redis.sif docker://redis:7-alpine
else
    echo "  ✓ Redis image already exists"
fi

# PostgreSQL
if [ ! -f "postgres.sif" ]; then
    echo "  → Pulling PostgreSQL..."
    apptainer pull --name postgres.sif docker://postgres:15-alpine
else
    echo "  ✓ PostgreSQL image already exists"
fi

# Judge0
if [ ! -f "judge0.sif" ]; then
    echo "  → Pulling Judge0 (this is the largest image)..."
    apptainer pull --name judge0.sif docker://judge0/judge0:1.13.0
else
    echo "  ✓ Judge0 image already exists"
fi

cd "$DEPLOY_DIR"

# Create environment file
echo ""
echo "⚙️  Creating configuration..."
cat > "$DEPLOY_DIR/judge0.env" << 'EOF'
# Judge0 Configuration
# Edit these values as needed

# Database Configuration
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=judge0
POSTGRES_USER=judge0
POSTGRES_PASSWORD=judge0_hpc_password_change_me

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Judge0 API Configuration
JUDGE0_PORT=2358

# Execution Limits
CPU_TIME_LIMIT=5
MAX_CPU_TIME_LIMIT=15
WALL_TIME_LIMIT=10
MAX_WALL_TIME_LIMIT=20
MEMORY_LIMIT=256000
MAX_MEMORY_LIMIT=512000
STACK_LIMIT=64000
MAX_STACK_LIMIT=128000
MAX_PROCESSES_AND_OR_THREADS=60

# Features
ENABLE_WAIT_RESULT=true
ENABLE_BATCHED_SUBMISSIONS=true
MAX_QUEUE_SIZE=100

# Worker Configuration
WORKER_COUNT=4
EOF

# Create start script for Redis
cat > "$DEPLOY_DIR/start-redis.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"
DEPLOY_DIR="$(dirname "$0")"

echo "🔴 Starting Redis..."

# Check if already running
if pgrep -f "redis.sif" > /dev/null; then
    echo "  Redis is already running"
    exit 0
fi

cd "$DEPLOY_DIR"
nohup apptainer run \
    --bind "$DEPLOY_DIR/data/redis:/data" \
    "$DEPLOY_DIR/images/redis.sif" \
    redis-server --appendonly yes --port $REDIS_PORT \
    > "$DEPLOY_DIR/logs/redis.log" 2>&1 &

echo "  Redis started on port $REDIS_PORT (PID: $!)"
sleep 2
SCRIPT
chmod +x "$DEPLOY_DIR/start-redis.sh"

# Create start script for PostgreSQL
cat > "$DEPLOY_DIR/start-postgres.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"
DEPLOY_DIR="$(dirname "$0")"

echo "🐘 Starting PostgreSQL..."

# Check if already running
if pgrep -f "postgres.sif" > /dev/null; then
    echo "  PostgreSQL is already running"
    exit 0
fi

cd "$DEPLOY_DIR"

# Initialize database if needed
if [ ! -f "$DEPLOY_DIR/data/postgres/PG_VERSION" ]; then
    echo "  Initializing database..."
    apptainer exec \
        --bind "$DEPLOY_DIR/data/postgres:/var/lib/postgresql/data" \
        --env POSTGRES_DB=$POSTGRES_DB \
        --env POSTGRES_USER=$POSTGRES_USER \
        --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        --env PGDATA=/var/lib/postgresql/data \
        "$DEPLOY_DIR/images/postgres.sif" \
        initdb -D /var/lib/postgresql/data
fi

nohup apptainer run \
    --bind "$DEPLOY_DIR/data/postgres:/var/lib/postgresql/data" \
    --env POSTGRES_DB=$POSTGRES_DB \
    --env POSTGRES_USER=$POSTGRES_USER \
    --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    --env PGDATA=/var/lib/postgresql/data \
    "$DEPLOY_DIR/images/postgres.sif" \
    postgres -p $POSTGRES_PORT \
    > "$DEPLOY_DIR/logs/postgres.log" 2>&1 &

echo "  PostgreSQL started on port $POSTGRES_PORT (PID: $!)"
sleep 5
SCRIPT
chmod +x "$DEPLOY_DIR/start-postgres.sh"

# Create start script for Judge0 API
cat > "$DEPLOY_DIR/start-judge0.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"
DEPLOY_DIR="$(dirname "$0")"

echo "⚖️  Starting Judge0 API..."

# Check if already running
if pgrep -f "judge0.sif.*server" > /dev/null; then
    echo "  Judge0 API is already running"
    exit 0
fi

cd "$DEPLOY_DIR"
nohup apptainer run \
    --env REDIS_HOST=$REDIS_HOST \
    --env REDIS_PORT=$REDIS_PORT \
    --env POSTGRES_HOST=$POSTGRES_HOST \
    --env POSTGRES_PORT=$POSTGRES_PORT \
    --env POSTGRES_DB=$POSTGRES_DB \
    --env POSTGRES_USER=$POSTGRES_USER \
    --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    --env ENABLE_WAIT_RESULT=$ENABLE_WAIT_RESULT \
    --env ENABLE_BATCHED_SUBMISSIONS=$ENABLE_BATCHED_SUBMISSIONS \
    --env MAX_QUEUE_SIZE=$MAX_QUEUE_SIZE \
    --env CPU_TIME_LIMIT=$CPU_TIME_LIMIT \
    --env MAX_CPU_TIME_LIMIT=$MAX_CPU_TIME_LIMIT \
    --env WALL_TIME_LIMIT=$WALL_TIME_LIMIT \
    --env MAX_WALL_TIME_LIMIT=$MAX_WALL_TIME_LIMIT \
    --env MEMORY_LIMIT=$MEMORY_LIMIT \
    --env MAX_MEMORY_LIMIT=$MAX_MEMORY_LIMIT \
    --env RAILS_ENV=production \
    --env SECRET_KEY_BASE=your_secret_key_base_change_this_in_production \
    "$DEPLOY_DIR/images/judge0.sif" \
    ./scripts/server \
    > "$DEPLOY_DIR/logs/judge0-api.log" 2>&1 &

echo "  Judge0 API started on port $JUDGE0_PORT (PID: $!)"
sleep 3
SCRIPT
chmod +x "$DEPLOY_DIR/start-judge0.sh"

# Create start script for Workers
cat > "$DEPLOY_DIR/start-workers.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"
DEPLOY_DIR="$(dirname "$0")"

echo "👷 Starting Judge0 Workers..."

# Check if already running
if pgrep -f "judge0.sif.*workers" > /dev/null; then
    echo "  Workers are already running"
    exit 0
fi

cd "$DEPLOY_DIR"

# Try with fakeroot first (required for sandbox)
if apptainer run --fakeroot --help &>/dev/null; then
    echo "  Using fakeroot mode for secure sandbox"
    nohup apptainer run \
        --fakeroot \
        --env REDIS_HOST=$REDIS_HOST \
        --env REDIS_PORT=$REDIS_PORT \
        --env POSTGRES_HOST=$POSTGRES_HOST \
        --env POSTGRES_PORT=$POSTGRES_PORT \
        --env POSTGRES_DB=$POSTGRES_DB \
        --env POSTGRES_USER=$POSTGRES_USER \
        --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        --env COUNT=$WORKER_COUNT \
        --env INTERVAL=0.1 \
        "$DEPLOY_DIR/images/judge0.sif" \
        ./scripts/workers \
        > "$DEPLOY_DIR/logs/workers.log" 2>&1 &
else
    echo "  ⚠️  Fakeroot not available, using unsecure sandbox"
    echo "     Ask your HPC admin to enable fakeroot for secure execution"
    nohup apptainer run \
        --env REDIS_HOST=$REDIS_HOST \
        --env REDIS_PORT=$REDIS_PORT \
        --env POSTGRES_HOST=$POSTGRES_HOST \
        --env POSTGRES_PORT=$POSTGRES_PORT \
        --env POSTGRES_DB=$POSTGRES_DB \
        --env POSTGRES_USER=$POSTGRES_USER \
        --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        --env COUNT=$WORKER_COUNT \
        --env INTERVAL=0.1 \
        --env JUDGE0_HOMEPAGE_SHOULD_NOT_RUN_INIT_SCRIPT=true \
        "$DEPLOY_DIR/images/judge0.sif" \
        ./scripts/workers \
        > "$DEPLOY_DIR/logs/workers.log" 2>&1 &
fi

echo "  $WORKER_COUNT workers started (PID: $!)"
SCRIPT
chmod +x "$DEPLOY_DIR/start-workers.sh"

# Create master start script
cat > "$DEPLOY_DIR/start-all.sh" << 'SCRIPT'
#!/bin/bash
DEPLOY_DIR="$(dirname "$0")"

echo "=============================================="
echo "  Starting Judge0 Services"
echo "=============================================="
echo ""

"$DEPLOY_DIR/start-redis.sh"
"$DEPLOY_DIR/start-postgres.sh"
"$DEPLOY_DIR/start-judge0.sh"
"$DEPLOY_DIR/start-workers.sh"

echo ""
echo "=============================================="
echo "  All services started!"
echo "=============================================="
echo ""
source "$DEPLOY_DIR/judge0.env"
echo "🌐 Judge0 API: http://$(hostname):$JUDGE0_PORT"
echo "📋 Logs: $DEPLOY_DIR/logs/"
echo ""
echo "Test with:"
echo "  curl http://localhost:$JUDGE0_PORT/about"
echo ""
SCRIPT
chmod +x "$DEPLOY_DIR/start-all.sh"

# Create stop script
cat > "$DEPLOY_DIR/stop-all.sh" << 'SCRIPT'
#!/bin/bash
echo "Stopping Judge0 services..."

pkill -f "judge0.sif.*workers" 2>/dev/null && echo "  Stopped workers" || echo "  Workers not running"
pkill -f "judge0.sif.*server" 2>/dev/null && echo "  Stopped Judge0 API" || echo "  Judge0 API not running"
pkill -f "postgres.sif" 2>/dev/null && echo "  Stopped PostgreSQL" || echo "  PostgreSQL not running"
pkill -f "redis.sif" 2>/dev/null && echo "  Stopped Redis" || echo "  Redis not running"

echo "All services stopped."
SCRIPT
chmod +x "$DEPLOY_DIR/stop-all.sh"

# Create status script
cat > "$DEPLOY_DIR/status.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"
DEPLOY_DIR="$(dirname "$0")"

echo "=============================================="
echo "  Judge0 Service Status"
echo "=============================================="
echo ""

check_service() {
    if pgrep -f "$1" > /dev/null; then
        echo "  ✅ $2: Running"
    else
        echo "  ❌ $2: Stopped"
    fi
}

check_service "redis.sif" "Redis"
check_service "postgres.sif" "PostgreSQL"
check_service "judge0.sif.*server" "Judge0 API"
check_service "judge0.sif.*workers" "Workers"

echo ""
echo "API Health Check:"
if curl -s "http://localhost:$JUDGE0_PORT/about" > /dev/null 2>&1; then
    echo "  ✅ API responding on port $JUDGE0_PORT"
    curl -s "http://localhost:$JUDGE0_PORT/about" | head -c 100
    echo ""
else
    echo "  ❌ API not responding"
fi
echo ""
SCRIPT
chmod +x "$DEPLOY_DIR/status.sh"

# Create test script
cat > "$DEPLOY_DIR/test-submission.sh" << 'SCRIPT'
#!/bin/bash
source "$(dirname "$0")/judge0.env"

echo "Testing Judge0 submission..."
echo ""

# Python hello world in base64
CODE=$(echo -n 'print("Hello from Judge0!")' | base64)

RESULT=$(curl -s -X POST "http://localhost:$JUDGE0_PORT/submissions?base64_encoded=true&wait=true" \
  -H "Content-Type: application/json" \
  -d "{\"source_code\":\"$CODE\",\"language_id\":71}")

echo "Response:"
echo "$RESULT" | python3 -c "
import sys, json, base64
try:
    d = json.load(sys.stdin)
    print(f\"  Status: {d.get('status', {}).get('description', 'Unknown')}\")
    if d.get('stdout'):
        print(f\"  Output: {base64.b64decode(d['stdout']).decode()}\")
    if d.get('stderr'):
        print(f\"  Stderr: {base64.b64decode(d['stderr']).decode()}\")
    if d.get('compile_output'):
        print(f\"  Compile: {base64.b64decode(d['compile_output']).decode()}\")
except Exception as e:
    print(f'Error parsing response: {e}')
    print(sys.stdin.read())
"
SCRIPT
chmod +x "$DEPLOY_DIR/test-submission.sh"

echo ""
echo "=============================================="
echo "  ✅ Setup Complete!"
echo "=============================================="
echo ""
echo "📁 Files created in: $DEPLOY_DIR"
echo ""
echo "Next steps:"
echo "  1. Edit configuration: nano $DEPLOY_DIR/judge0.env"
echo "  2. Start all services: $DEPLOY_DIR/start-all.sh"
echo "  3. Check status:       $DEPLOY_DIR/status.sh"
echo "  4. Test submission:    $DEPLOY_DIR/test-submission.sh"
echo ""
echo "To connect from CodeArena, set in your .env:"
echo "  JUDGE0_API_URL=http://your-hpc-server:2358"
echo ""
