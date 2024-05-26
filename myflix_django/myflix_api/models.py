from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=180)
    released = models.IntegerField()
    runtime = models.IntegerField()
    genre = models.CharField(max_length=60)
    rating = models.FloatField()

