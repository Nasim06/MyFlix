from django.contrib import admin
from import_export.admin import ImportExportModelAdmin  # Import ImportExportModelAdmin
from .models import Movie, Genre, Actor
from import_export import resources


class MovieResource(resources.ModelResource):
    class Meta:
        model = Movie

@admin.register(Movie)
class MovieAdmin(ImportExportModelAdmin): 
    resource_class = MovieResource

class MovieFilterAdmin(admin.ModelAdmin):
    search_fields = ("title")

admin.site.register(Genre)

admin.site.register(Actor)