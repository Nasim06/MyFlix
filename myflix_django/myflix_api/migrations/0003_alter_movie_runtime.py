# Generated by Django 4.0 on 2024-05-28 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myflix_api', '0002_alter_movie_gross_alter_movie_imdb_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='runtime',
            field=models.IntegerField(max_length=6),
        ),
    ]
