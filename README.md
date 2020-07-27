# Steps to run application

This app uses Python3, PostgreSQL.

1. Next, run `source env/bin/activate` to activate the environment.
2. install dependencies with `pip install -r requirements.txt`
3. You may need to run `python manage.py makemigrations` and `python manage.py migrate` depending on your installed/configured machine.
4. run application with `python manage.py runserver` to start on port 8000 by default, or `python manage.py runserver 5000` to choose port 5000.

Notes:

Hard coded objects are as follows:

```python
doctors = [{
    'id': 1,
    'first_name': 'Michelle',
    'last_name': 'Benoit'
}, {
    'id': 2,
    'first_name': 'Andy',
    'last_name': 'Dam'
}]
# Appointments should have a unique ID,
# patient first name, patient last name, date & time, and kind (New Patient or Follow-up).
appointment = {
    'id': 1,
    'first_name': 'richard',
    'last_name': 'trevorrow',
    # 'date_time': datetime.datetime.now(),
    'date_time': "25/07/2020 08:30:00",
    'kind': 'New Patient'
}

appointments = {
    'Andy': [appointment],
    'Michelle': [appointment]
}
```

You can access endpoints at:

- `localhost:8000/api/get_list_of_doctors` (GET)
- `localhost:8000/api/get_appointments_by_doc/:pk` (GET). pk will be the ID of the doctor. For example: `localhost:8000/api/get_appointments_by_doc/1` to get Michelle's appointments.
- `localhost:8000/api/add_appt_for_doc` (POST). Include this type of body:
    ```json
    {
        "name": "Michelle",
        "appt": {
            "id": 2,
            "first_name": "Richard",
            "last_name": "Trevorrow",
            "date_time": "25/07/2020 08:45:00",
            "kind": "New Patient"
        }
    }
    ```
- `localhost:8000/api/delete_appt_for_doc` (DELETE). name key is the doctors first name, pk is the appointment ID. Include this type of body in the request:
    ```json
    {
        "name": "Michelle",
        "pk": 1
    }
    ```
