from django.urls import path, include
from .views import *

urlpatterns = [
    path('movies', MovieListView.as_view()),
    path('movies/byId', MovieListByIdsView.as_view()),
    path('genres', GenreListView.as_view()),
    path('actors', ActorListView.as_view()),
    path('watchlist', WatchListListAPIView.as_view()),
    path('watchlist/create', WatchListCreateAPIView.as_view()),
    path('watchlist/<int:pk>', WatchListDetailAPIView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
