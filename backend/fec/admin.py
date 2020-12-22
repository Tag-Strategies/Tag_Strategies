from django.contrib import admin  # noqa

from .models import Politician, Organization

# Register your models here.

admin.site.register(Politician)
admin.site.register(Organization)
