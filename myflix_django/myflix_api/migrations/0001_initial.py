# Generated by Django 4.0 on 2024-05-27 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=180)),
                ('released', models.IntegerField()),
                ('certificate', models.CharField(max_length=10)),
                ('runtime', models.IntegerField()),
                ('genre', models.CharField(max_length=60)),
                ('imdb_rating', models.FloatField()),
                ('overview', models.CharField(max_length=255)),
                ('director', models.CharField(max_length=30)),
                ('star1', models.CharField(max_length=30)),
                ('star2', models.CharField(max_length=30)),
                ('star3', models.CharField(max_length=30)),
                ('star4', models.CharField(max_length=30)),
                ('gross', models.CharField(max_length=11)),
                ('poster', models.URLField()),
            ],
        ),
    ]
