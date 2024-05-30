from django.urls import path, include
from .views import *

urlpatterns = [
    path('movies', MovieListView.as_view()),
    path('genres', GenreListView.as_view()),
    path('actors', ActorListView.as_view()),
]
