from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=180)
    released = models.IntegerField()
    runtime = models.IntegerField()
    genre = models.CharField(max_length=60)
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1)
    overview = models.CharField(max_length=255)
    director = models.CharField(max_length=50)
    star1 = models.CharField(max_length=30)
    star2 = models.CharField(max_length=30)
    star3 = models.CharField(max_length=30)
    star4 = models.CharField(max_length=30)
    gross = models.IntegerField()
    poster = models.URLField()

    def __str__(self):
        return self.title