# Context Engineering Course

## Running Locally

### Prerequisites

- Python 3.11+
- [Redis Stack](https://redis.io/docs/stack/) running on `localhost:6379`
- [Agent Memory Server (RAMS)](https://github.com/redis/agent-memory-server) running on `http://localhost:8088`

Start both services with Docker:

```bash
docker run -d --name redis-stack -p 6379:6379 redis/redis-stack-server:latest

docker run -d --name rams -p 8088:8000 redis/agent-memory-server:latest \
  -e REDIS_URL=redis://host.docker.internal:6379
```

### 1. Configure the environment

Copy the example env file and fill in your OpenAI API key:

```bash
cp .env.example .env   # if it exists, otherwise create .env at the repo root
```

The `.env` file at the **repository root** must contain:

```ini
LOCAL=true

# Your OpenAI API key (or the workshop key if provided)
GENAI_WKSHP_OPENAI_API_KEY=sk-...

# Local service URLs — override the Docker Compose hostnames used in the portal
REDIS_URL=redis://localhost:6379
AGENT_MEMORY_URL=http://localhost:8088
```

`LOCAL=true` is the single switch that activates local mode. When it is set:
- `REDIS_URL` and `AGENT_MEMORY_URL` point to your local services instead of the Docker Compose hostnames (`redis`, `agent-memory-server`).
- `GENAI_WKSHP_OPENAI_API_KEY` is automatically mapped to `OPENAI_API_KEY` so every notebook and agent package picks it up transparently.

The PS Portal environment never has this file, so portal behaviour is completely unaffected.

### 2. Install dependencies

```bash
cd materials/ws
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Launch Jupyter

```bash
cd materials/ws
source .venv/bin/activate
jupyter lab
```

Open any notebook under `notebooks/` and run it top-to-bottom. No manual `export` commands are needed.

### 4. Test a notebook non-interactively (CI / smoke test)

```bash
cd materials/ws
source .venv/bin/activate

jupyter nbconvert --to notebook --execute --allow-errors \
  --ExecutePreprocessor.timeout=300 \
  notebooks/03/01_working_memory.ipynb \
  --output /tmp/out_working_memory.ipynb
```

Check the result:

```bash
python3 - << 'EOF'
import json
nb = json.load(open('/tmp/out_working_memory.ipynb'))
errors = [
    (i, o['ename'], o['evalue'])
    for i, c in enumerate(nb['cells']) if c['cell_type'] == 'code'
    for o in c.get('outputs', []) if o.get('output_type') == 'error'
    if '# TODO' not in ''.join(c['source'])   # skip intentional stubs
]
if errors:
    for cell, name, val in errors:
        print(f'Cell {cell}: {name}: {val}')
else:
    print('PASS')
EOF
```

Run all notebooks in one shot:

```bash
for nb in notebooks/00/*.ipynb notebooks/01/*.ipynb notebooks/02/*.ipynb notebooks/03/*.ipynb; do
  echo "Running $nb..."
  jupyter nbconvert --to notebook --execute --allow-errors \
    --ExecutePreprocessor.timeout=300 "$nb" \
    --output /tmp/$(basename "$nb") 2>&1 | tail -1
done
```

### How local config is loaded

The `.env` file is discovered automatically by every agent and `src` package via `python-dotenv`'s `find_dotenv(usecwd=True)`, which walks up the directory tree from the Jupyter kernel's working directory. This call sits at the top of:

- `progressive_agents/stage{1..6}/agent/__init__.py`
- `src/redis_context_course/__init__.py`

So importing any agent or course package is enough — no notebook cell needs to touch environment variables.
