# Project dependencies (pinned versions)

This document lists the main dependencies used in this project and their versions so you can reproduce the environment.

## Node / Backend (from `package.json`)

- bcryptjs: ^3.0.2
- connect-mongo: ^5.1.0
- dotenv: ^17.2.2
- ejs: ^3.1.10
- express: ^5.1.0
- express-session: ^1.18.2
- mongoose: ^8.18.1

Dev:
- nodemon: ^3.1.10

Install (backend):

```bash

npm install
```

## Python / ML service (from `ml_service/requirements.txt`)

- blinker==1.9.0
- click==8.3.1
- Flask==3.1.2
- flask-cors==6.0.1
- itsdangerous==2.2.0
- Jinja2==3.1.6
- joblib==1.5.2
- MarkupSafe==3.0.3
- numpy==2.3.5
- pandas==2.3.3
- python-dateutil==2.9.0.post0
- pytz==2025.2
- scikit-learn==1.7.2
- scipy==1.16.3
- six==1.17.0
- threadpoolctl==3.6.0
- tzdata==2025.2
- Werkzeug==3.1.3

Install (ml service):

```bash
cd ml_service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Notes:
- `requirements.txt` at project root is a copy of `ml_service/requirements.txt` for convenience.
- If you run the ML service inside Docker, the `ml_service/Dockerfile` already installs the necessary Python packages (it uses `requirements.txt`).
- If you need Gunicorn for production, add a line such as `gunicorn==21.2.0` to the ML requirements.

If you'd like, I can also:
- Add a `pyproject.toml` / `poetry.lock` instead of `requirements.txt`.
- Add a `docker-compose.override.yml` to mount the backend for local dev.
