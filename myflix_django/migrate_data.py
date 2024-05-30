import os
import django

# Replace 'myflix_django' with your project's name
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myflix_django.settings')
django.setup()

import csv
from django.core.exceptions import ValidationError
from myflix_api.models import Movie, Genre, Actor

def import_data(csv_file_path):
  """
  This function imports data from a CSV file into the Movie, Genre, and Actor models.

  Args:
      csv_file_path (str): The path to the CSV file.
  """
  with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
      # Create or get Genre objects
      genres = [Genre.objects.get_or_create(name=genre.strip())[0] for genre in row['genre'].split(',')]

      # Create or get Actor objects
      actors = [Actor.objects.get_or_create(name=actor.strip())[0] for actor in [row['star1'], row['star2'], row['star3'], row['star4']]]

      # Create Movie object
      try:
        movie = Movie.objects.create(
          title=row['title'],
          released=row['released'],
          runtime=row['runtime'],
          imdb_rating=row['imdb_rating'],
          overview=row['overview'],
          director=row['director'],
          gross=row['gross'],
          poster=row['poster'],
        )
        movie.genre.set(genres)
        movie.actors.set(actors)
      except ValidationError as e:
        print(f"Error importing row {row['id']}: {e}")
        continue

      print(f"Imported movie: {movie.title}")


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE_PATH = os.path.join(BASE_DIR, 'CleanedData.csv')  # Replace with your CSV file path

import_data(CSV_FILE_PATH)