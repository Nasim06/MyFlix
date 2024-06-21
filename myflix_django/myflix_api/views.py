from django.shortcuts import get_object_or_404
from rest_framework import generics, filters, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Movie, Genre, Actor, WatchList
from .serializers import MovieSerializer, GenreSerializer, ActorSerializer, WatchListSerializer
from rest_framework.views import APIView


class NoPagination(PageNumberPagination):
    page_size = None


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter] 

    def get_queryset(self):
        queryset = self.queryset

        #Values for filtering
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
    


class MovieListByIdsView(APIView):
    serializer_class = MovieSerializer

    def post(self, request):
        try:
            movie_ids = request.data.get('movie_ids')
            if not movie_ids or not isinstance(movie_ids, list):
                return Response({'error': 'Invalid request format. Please provide a list of movie IDs.'}, status=status.HTTP_400_BAD_REQUEST)
        except (KeyError, ValueError):
            return Response({'error': 'Invalid request format. Please provide a list of movie IDs.'}, status=status.HTTP_400_BAD_REQUEST)

        queryset = Movie.objects.filter(id__in=movie_ids)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    pagination_class = NoPagination



class ActorListView(generics.ListAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    pagination_class = NoPagination
    


class UserWatchListMixin(object):
    #Mixin to filter WatchList items based on the authenticated user.
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WatchList.objects.filter(user=self.request.user)
    
    def has_permission(self, request, obj=None):
        if obj is None:
            return True
        return obj.user == request.us



class WatchListListAPIView(UserWatchListMixin, generics.ListAPIView):
    #Generic view to list movies in a user's watchlist, optionally filtered by watched status.
    serializer_class = WatchListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = super().get_queryset(*args, **kwargs)
        watched = self.request.GET.get("watched", None)
        if watched:
            queryset = queryset.filter(watched=watched)
        return queryset



class WatchListCreateAPIView(UserWatchListMixin, generics.CreateAPIView):
    #Generic view to create a new WatchList entry for the authenticated user.
    serializer_class = WatchListSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        movie_id = request.data['movie']
        watched = request.data['watched']
        movie = get_object_or_404(Movie, id=movie_id)
        user_watchlist, created = WatchList.objects.get_or_create(user=self.request.user, movie=movie)
        if not created:
            return Response({'message': 'Movie already exists in your Watchlist'}, status=status.HTTP_409_CONFLICT)
        if watched:
            user_watchlist.watched = watched
        user_watchlist.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class WatchListDetailAPIView(UserWatchListMixin, generics.RetrieveUpdateDestroyAPIView):
    #Generic view to retrieve, update, or delete a specific WatchList entry for the authenticated user.
    serializer_class = WatchListSerializer

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs)

    def patch(self, request, pk=None, *args, **kwargs):
        #Patch a specific WatchList entry (update watched status).
        watchlist_item = self.get_object()
        serializer = self.get_serializer(watchlist_item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk=None, *args, **kwargs):
        #Delete a specific WatchList entry for the authenticated user.
        watchlist_item = self.get_object()
        watchlist_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)