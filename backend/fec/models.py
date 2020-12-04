from django.db import models

# Create your models here.
class Politician(models.Model):
    name = models.CharField(max_length=200, default="XXXXX XXXXXX", unique=True)

    def __str__(self):
        return self.name