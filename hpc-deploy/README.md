# Judge0 HPC Deployment with Apptainer

Deploy Judge0 code execution service on your HPC cluster using Apptainer containers.

## Quick Start

### 1. Copy to HPC Server

```bash
# From your local machine
scp -r hpc-deploy/ user@hpc-server:~/
```

### 2. Run Setup on HPC

```bash
# SSH into your HPC server
ssh user@hpc-server

# Navigate and run setup
cd ~/hpc-deploy
chmod +x *.sh
./setup.sh
```

This will:
- Create directory structure at `~/judge0-hpc/`
- Pull Redis, PostgreSQL, and Judge0 container images (~5GB)
- Generate configuration and startup scripts

### 3. Start Services

```bash
cd ~/judge0-hpc
./start-all.sh
```

### 4. Verify Installation

```bash
./status.sh          # Check service status
./test-submission.sh # Run test Python code
```

### 5. Connect CodeArena

Update your local `.env`:
```env
JUDGE0_API_URL="http://your-hpc-server:2358"
JUDGE0_AUTH_TOKEN=""
```

---

## Directory Structure

After setup, you'll have:
```
~/judge0-hpc/
├── images/              # Container images (SIF files)
│   ├── redis.sif
│   ├── postgres.sif
│   └── judge0.sif
├── data/                # Persistent data
│   ├── postgres/
│   └── redis/
├── logs/                # Service logs
├── judge0.env           # Configuration
├── start-all.sh         # Start all services
├── stop-all.sh          # Stop all services
├── status.sh            # Check status
└── test-submission.sh   # Test submission
```

---

## Configuration

Edit `~/judge0-hpc/judge0.env` to customize:

| Variable | Default | Description |
|----------|---------|-------------|
| `JUDGE0_PORT` | 2358 | API port |
| `WORKER_COUNT` | 4 | Parallel workers |
| `CPU_TIME_LIMIT` | 5 | Seconds per execution |
| `MEMORY_LIMIT` | 256000 | KB per execution |

---

## Troubleshooting

### Workers fail to start
Ask HPC admin to enable fakeroot:
```bash
# Admin runs:
sudo apptainer config fakeroot --add your_username
```

### Port already in use
```bash
# Edit judge0.env and change ports:
JUDGE0_PORT=3358
POSTGRES_PORT=5433
REDIS_PORT=6380
```

### Services crash on restart
```bash
./stop-all.sh
rm -rf ~/judge0-hpc/data/*  # Reset data
./start-all.sh
```

### Check logs
```bash
tail -f ~/judge0-hpc/logs/workers.log
tail -f ~/judge0-hpc/logs/judge0-api.log
```

---

## SLURM Job (Optional)

For persistent deployment, create `judge0.slurm`:

```bash
#!/bin/bash
#SBATCH --job-name=judge0
#SBATCH --nodes=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=8G
#SBATCH --time=30-00:00:00
#SBATCH --output=judge0-%j.log

~/judge0-hpc/start-all.sh

# Keep job alive
while true; do
    sleep 3600
done
```

Submit: `sbatch judge0.slurm`

---

## Supported Languages

| Language | ID | Version |
|----------|-----|---------|
| Python | 71 | 3.8.1 |
| C++ | 54 | GCC 9.2.0 |
| Java | 62 | OpenJDK 13.0.1 |
| JavaScript | 63 | Node.js 12.14.0 |
| Go | 60 | 1.13.5 |
| Rust | 73 | 1.40.0 |

Full list: `curl http://localhost:2358/languages`
