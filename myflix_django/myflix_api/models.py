from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
    
class Actor(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=180)
    released = models.IntegerField()
    runtime = models.IntegerField()
    genre = models.ManyToManyField(Genre)
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1)
    overview = models.CharField(max_length=255)
    director = models.CharField(max_length=50)
    actors = models.ManyToManyField(Actor)
    gross = models.IntegerField()
    poster = models.URLField()

    def __str__(self):
        return self.title

class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    watched = models.BooleanField(default=False)


