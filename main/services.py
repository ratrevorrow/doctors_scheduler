from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.core import serializers
from django.utils import timezone
import pytz
from .models import *
from .serializers import AppointmentSerializer, DoctorSerializer
import datetime

timezone.now()
DATE_FORMAT_1 = '%Y-%m-%dT%H:%M:%SZ'
DATE_FORMAT_2 = '%Y-%m-%d %H:%M:%S'
time_slots = {}

####################### GET REQUESTS #######################
def get_all_doctors():
    return __get_items(Doctor.objects.all())

def get_appts_for_doc(pk):
    return __get_items(Appointment.objects.filter(doctor=pk))

def get_appts():
    return __get_items(Appointment.objects.all())

def get_times_available_for_date(data):
    # __init_time_slots()
    # date = datetime.datetime.strptime(data['date'], '%Y-%m-%d')
    # items = __get_items(Appointment.objects.filter(date__date=date))
    # print(time_slots)
    # for item in items:
    #     datetime_appt = datetime.datetime.strptime(item['fields']['date'], DATE_FORMAT)
    #     print(time_slots[datetime_appt.time()])
    #     # time_slots[datetime_appt.time()] -= 1
    # return time_slots, HTTP_200_OK
    return None, HTTP_200_OK

####################### POST REQUESTS #######################
def add_appt(new_appt):
    new_appt['date'] = datetime.datetime.strptime(new_appt['date'], DATE_FORMAT_2)
    new_appt['date'].astimezone(tz=pytz.UTC)
    return __create_or_fail(AppointmentSerializer(data=new_appt))

def add_doc(doctor):
    return __create_or_fail(DoctorSerializer(data=doctor))

####################### DELETE REQUESTS #######################
def delete_appt(pk):
    Appointment.objects.filter(id=pk).delete()



####################### HELPER FUNCTIONS #######################
def __create_or_fail(serializer):
    if serializer.is_valid():
        serializer.save()
        print('saved')
        return True
    return False

def __get_items(queryset):
    return json.loads(serializers.serialize("json", queryset))

def __init_time_slots():
    for i in range(8, 17):
        print(datetime.datetime.strptime('8:00:00', DATE_FORMAT))
        time_slots[f'{i}:00:00'] = 3
        time_slots[f'{i}:15:00'] = 3
        time_slots[f'{i}:30:00'] = 3
        time_slots[f'{i}:45:00'] = 3

    time_slots['17:00:00'] = 3

def is_fully_booked(new_appt):
    length = len(__get_items(Appointment.objects.filter(doctor=new_appt['doctor'], date=new_appt['date'])))
    if length >= 3:
        return True
    return False

def is_patient_booked_already(new_appt):
    length = len(__get_items(Appointment.objects.filter(date=new_appt['date'], first_name=new_appt['first_name'], last_name=new_appt['last_name'])))
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
