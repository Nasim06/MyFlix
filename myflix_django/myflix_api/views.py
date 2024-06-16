from django.shortcuts import get_object_or_404
from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Movie, Genre, Actor
from .serializers import MovieSerializer, GenreSerializer, ActorSerializer


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter] 

    def get_queryset(self):
        queryset = self.queryset

        title = self.request.GET.get('title', None)
        genre = self.request.GET.get('genre', None)
        actor = self.request.GET.get('actor', None)
        director = self.request.GET.get('director', None)
        released = self.request.GET.get('released', None)
        imdb_rating_gte = self.request.GET.get('imdb_rating_gte', None)
        runtime_lte = self.request.GET.get('runtime_lte', None)

        if title:
            queryset = queryset.filter(title__icontains=title)
        if genre and genre != "All":
            queryset = queryset.filter(genre__name=genre)
        if actor:
            queryset = queryset.filter(actors__name__icontains = actor)
        if director:
            queryset = queryset.filter(director__icontains = director)
        if released:
            try:
                released = int(released)
                queryset = queryset.filter(released=released)
            except ValueError:
                pass  
        if imdb_rating_gte:
            try:
                imdb_rating_gte = float(imdb_rating_gte)
                queryset = queryset.filter(imdb_rating__gte=imdb_rating_gte)
            except ValueError:
                pass 
        if runtime_lte:
            try:
                runtime_lte = float(runtime_lte)
                queryset = queryset.filter(runtime__lte=runtime_lte)
            except ValueError:
                pass   


        return queryset


class GenreListView(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)


class ActorListView(APIView):
    def get(self, request):
        actors = Actor.objects.all()
        serializer = ActorSerializer(actors, many=True)
        return Response(serializer.data)