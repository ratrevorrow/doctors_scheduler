from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.core import serializers
from django.utils import timezone
import pytz
from .models import *
# AppointmentSerializer, DoctorSerializer,
from .serializers import AppointmentSerializer, UserSerializer
import datetime

timezone.now()
DATE_FORMAT_1 = '%Y-%m-%dT%H:%M:%S'
DATE_FORMAT_2 = '%Y-%m-%d %H:%M:%S'
time_slots = {}

####################### GET #######################


def get_all_doctors():
    return User.objects.filter(role="DOCTOR").values('id', 'email', 'first_name', 'last_name')


def get_all_patients():
    # return get_items(User.objects.all())
    return User.objects.filter(role="PATIENT").values('id', 'email', 'first_name', 'last_name')


def get_appts_for_doc(pk):
    return Appointment.objects.filter(doctor=pk).values('id', 'date', 'patient')


def get_appts():
    return Appointment.objects.all().values('id', 'date', 'doctor', 'patient')


def get_times_available_for_date(pk, date):
    __init_time_slots()
    date = datetime.datetime.strptime(date, '%Y-%m-%d')
    items = get_items(Appointment.objects.filter(date__date=date))
    for item in items:
        date_time = datetime.datetime.strptime(
            item['fields']['date'], DATE_FORMAT_1)
        time_slots[str(date_time.time())] -= 1
    return time_slots

####################### POST #######################


def add_appt(new_appt):
    new_appt['date'] = datetime.datetime.strptime(
        new_appt['date'], DATE_FORMAT_2)
    new_appt['date'].astimezone(tz=pytz.UTC)
    return __create_or_fail(AppointmentSerializer(data=new_appt))


def alter_user(data):
    if not data['password']:
        print('Empty password')
        return False
    user = User.objects.get(email=data['email'])
    user.set_password(data['password'])
    user.set_has_changed_password(True)
    user.save()
    print("Changed password")
    return True


def add_user(user):
    user['password'] = 'initial_password'
    return __create_or_fail(UserSerializer(data=user))

####################### DELETE #######################


def delete_appt(pk):
    try:
        Appointment.objects.get(id=pk).delete()
        return True
    except:
        return False


####################### PRIVATE HELPER FUNCTIONS #######################
def __create_or_fail(serializer):
    if serializer.is_valid():
        serializer.save()
        print('User/Appointment saved to database')
        return True
    print(serializer.errors)
    print(serializer.error_messages)
    return False


def get_items(queryset):
    return json.loads(serializers.serialize("json", queryset))


def __init_time_slots():
    for i in range(8, 10):
        time_slots[f'0{i}:00:00'] = 3
        time_slots[f'0{i}:15:00'] = 3
        time_slots[f'0{i}:30:00'] = 3
        time_slots[f'0{i}:45:00'] = 3

    for i in range(10, 17):
        time_slots[f'{i}:00:00'] = 3
        time_slots[f'{i}:15:00'] = 3
        time_slots[f'{i}:30:00'] = 3
        time_slots[f'{i}:45:00'] = 3

    time_slots['17:00:00'] = 3

####################### PUBLIC HELPER FUNCTIONS #######################


def is_fully_booked(new_appt):
    length = len(get_items(Appointment.objects.filter(
        doctor=new_appt['doctor'], date=new_appt['date'])))
    if length >= 3:
        return True
    return False


def is_patient_booked_already(new_appt):
    length = len(get_items(Appointment.objects.filter(
        date=new_appt['date'], doctor=new_appt['doctor'], patient=new_appt['patient'])))
    if length > 0:
        return True
    return False


def is_increment_of_fifteen(new_appt):
    date_time = new_appt['date'].split(' ')
    date = date_time[0]
    time = date_time[1]
    # check to see if the time asked for is spaced 15 minutes out
    if int(time.split(':')[1]) % 15 != 0:
        return False
    return True
