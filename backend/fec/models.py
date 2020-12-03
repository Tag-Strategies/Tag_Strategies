from django.db import models

# Create your models here.
class Politician(models.Model):
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)
    candidate_Id = models.IntegerField()

    def __str__(self):
        return self.lastName