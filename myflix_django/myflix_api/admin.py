from django.contrib import admin
from import_export.admin import ImportExportModelAdmin  # Import ImportExportModelAdmin
from .models import Movie, Genre, Actor
from import_export import resources


class MovieResource(resources.ModelResource):
    class Meta:
        model = Movie

@admin.register(Movie)
class MovieAdmin(ImportExportModelAdmin):  # Use ImportExportModelAdmin
    resource_class = MovieResource 

admin.site.register(Genre)

admin.site.register(Actor)