# Backend server uses python and django

## Steps to install and run application

Specifications: This app uses Python 3.7 and PostgreSQL.

1. Run `source venv/bin/activate` to activate the python environment.
2. Install dependencies with `pip install -r requirements.txt`
3. Run `python manage.py makemigrations` and `python manage.py migrate` to setup the database.
4. Start application with the command `python manage.py runserver`. This will start a server on port 8000.
    If you want to use a different port, start the server with this command: `python manage.py runserver 0.0.0.0:<PORT NUMBER>`.

## Endpoints

The base url will be: `localhost:8000`.
All endpoints are prefaced with `/api` .

### GET REQUESTS

- `/doctors`
- `/patients`
- `/users`
- `/appointments`
- `/doctors/:id/appointments`
- `/doctors/:id/times/:selected_date`

### POST REQUESTS

- `/doctors`
- `/createuser`
- `/login`
- `/doctors/:id/appointment`

### DELETE REQUESTS

- `/doctors/:id/appointment`

The final URI will be something like `http://localhost:8000/api/doctors`.
