# MyFlix
MyFlix is my personal project that I haved created with the goal of improving my skills in full stack development.

This app, displays a list of movies which can be filtered by several options. Users are able to
register an account and sign in, this allows them to add movies to their watch list. Once they have watched
the movie, they can then move it to their watched list.

For my tech stack, I used a **mysql** database, **Django** for the back-end and **React** for the front-end.

To help me create the API I used DjangoRestFramework, I also used Djoser and JWT for handling authentication.

To speed up front-end development, I used chakra ui, which is a React component library.

For the most part, I am pretty happy with how it went. My API works great and the front-end functions exactly how it should, with minimal page refreshes.
The styling is also decent and I am especially happy with the infinite sliding carousel of movie scenes on the landing page,
although my colour selection for light mode was somewhat poor.

I learnt a lot making this project and would definitely approach this differently if done again.

![myflix_movies](https://github.com/Nasim06/MyFlix/assets/79113348/5fa8f708-cf63-4aa5-984f-287382627615)


![myflix_watchList](https://github.com/Nasim06/MyFlix/assets/79113348/253a518c-3595-4620-b541-330d4516e70b)

# How to install and use
First off, you need to clone the project
```
git clone https://github.com/Nasim06/MyFlix.git
```
You should then create a mysql database, you could also just use sqlLite but you'll need to adjust the database settings in the settings.py file.
```
CREATE DATABSE myflix;
```
I used pipenv to manage my python virtual environment and dependencies, so cd into myflix_django and run:
```
pipenv shell
pipenv install
```
Then cd into myflix_react and run:
```
npm install
```
In myflix_django, create a local_settings.py file for storing your secret key and database username and password.
If you look in the settings.py file, you should be able to see where I've used these variables and the naming I've used.
Once you have all the correct daatabase setting, you need to make migrations with:
```
//while inside the pipenv shell
python manage.py makemigrations
python manage.py migrate
```
You should now create a superuser:
```
python manage.py createsuperuser
```
You may notice a file called CleanedData.csv, this contains all the movie data. There is also a file called migrate_data.py for migrating that data to the database.
So you need to run: 
```
python migrate_data.py
```
You can now start everything up:
```
python manage.py runserver
```
And in myflix_react:
```
npm run dev
```
If successfull you should be met with this landing page:
![myflix_landing](https://github.com/Nasim06/MyFlix/assets/79113348/2c72d200-55ac-4bc4-be56-3b7c3e475be4)

