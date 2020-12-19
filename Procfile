web: gunicorn backend.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=backend -B --loglevel=info
