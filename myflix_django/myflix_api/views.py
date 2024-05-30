from django.shortcuts import get_object_or_404
from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Movie, Genre, Actor
from .serializers import MovieSerializer, GenreSerializer, ActorSerializer


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.SearchFilter]  # Enable search filtering
    search_fields = ['title', 'director', 'actors__name']  # Define searchable fields

    def get_queryset(self):
        queryset = self.queryset

        # Get filter parameters from request.GET (modify as needed)
        genre = self.request.GET.get('genre', None)
        actor = self.request.GET.get('actor', None)
        director = self.request.GET.get('director', None)
        released_after = self.request.GET.get('released_after', None)
        imdb_rating_gte = self.request.GET.get('imdb_rating_gte', None)

        # Apply filters based on request parameters
        if genre:
            queryset = queryset.filter(genre__name=genre)
        if actor:
            queryset = queryset.filter(actors__name=actor)
        if director:
            queryset = queryset.filter(director__name=director)
        if released_after:
            try:
                released_after = int(released_after)
                queryset = queryset.filter(released__gte=released_after)
            except ValueError:
                pass  # Handle invalid released_after value (optional)
        if imdb_rating_gte:
            try:
                imdb_rating_gte = float(imdb_rating_gte)
                queryset = queryset.filter(imdb_rating__gte=imdb_rating_gte)
            except ValueError:
                pass  # Handle invalid imdb_rating_gte value (optional)

        return queryset


class GenreListView(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)  # Assuming you have a GenreSerializer
        return Response(serializer.data)


class ActorListView(APIView):
    def get(self, request):
        actors = Actor.objects.all()
        serializer = ActorSerializer(actors, many=True)  # Assuming you have an ActorSerializer
        return Response(serializer.data)