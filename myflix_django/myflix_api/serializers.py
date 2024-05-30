from rest_framework import serializers
from .models import Movie, Actor, Genre
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class MovieSerializer(serializers.ModelSerializer):
    class Meta():
        model = Movie
        fields = "__all__"

class ActorSerializer(serializers.ModelSerializer):
    class Meta():
        model = Actor
        fields = ['name']

class GenreSerializer(serializers.ModelSerializer):
    class Meta():
        model = Genre
        fields = ['name']
