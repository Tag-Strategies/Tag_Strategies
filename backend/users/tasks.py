from django.core import management

from Tag_Strategies import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
