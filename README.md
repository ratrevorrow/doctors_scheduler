# Steps to run application

This app uses Python3, PostgreSQL.

1. Next, run `source env/bin/activate` to activate the environment.
2. install dependencies with `pip install -r requirements.txt`
3. You may need to run `python manage.py makemigrations` and `python manage.py migrate` depending on your installed/configured machine.
4. run application with `python manage.py runserver` to start on port 8000 by default, or `python manage.py runserver 5000` to choose port 5000.

You can access endpoints at:

- `localhost:8000/api/doctors` (GET)
- `localhost:8000/api/appointments` (GET)
- `localhost:8000/api/doctors/<int:pk>/appointments` (GET)
- `localhost:8000/api/doctors/<int:pk>/times/available` (GET)
- `localhost:8000/api/doctors/<int:pk>/appointment` (POST)
- `localhost:8000/api/doctors` (POST)
- `localhost:8000/api/doctors/<int:pk>/appointment` (DELETE)
