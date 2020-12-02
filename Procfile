web: gunicorn Tag_Strategies.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=Tag_Strategies -B --loglevel=info
