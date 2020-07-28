from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.core import serializers

from .models import *
from .serializers import AppointmentSerializer, DoctorSerializer
import datetime

DATE_FORMAT = '%Y-%m-%dT%H:%M:%SZ'

time_slots = {}

def init_time_slots():
    for i in range(8, 17):
        print(datetime.datetime.strptime('8:00:00', DATE_FORMAT))
        time_slots[f'{i}:00:00'] = 3
        time_slots[f'{i}:15:00'] = 3
        time_slots[f'{i}:30:00'] = 3
        time_slots[f'{i}:45:00'] = 3

    time_slots['17:00:00'] = 3

####################### GET REQUESTS ####################### 2
def get_all_doctors():
    return __get_items(Doctor.objects.all()), HTTP_200_OK

def get_appts_for_doc(pk):
    return __get_items(Appointment.objects.filter(doctor=pk)), HTTP_200_OK

def get_appts():
    return __get_items(Appointment.objects.all())

def get_times_available_for_date(data):
    # init_time_slots()
    # date = datetime.datetime.strptime(data['date'], '%Y-%m-%d')
    # items = __get_items(Appointment.objects.filter(date__date=date))
    # print(time_slots)
    # for item in items:
    #     datetime_appt = datetime.datetime.strptime(item['fields']['date'], DATE_FORMAT)
    #     print(time_slots[datetime_appt.time()])
    #     # time_slots[datetime_appt.time()] -= 1
    # return time_slots, HTTP_200_OK
    return None, HTTP_200_OK

def __get_items(queryset):
    return json.loads(serializers.serialize("json", queryset))

####################### POST REQUESTS ####################### 1
def add_appt(new_appt):
    length = len(__get_items(Appointment.objects.filter(doctor=new_appt['doctor'], date=new_appt['date'])))
    if length >= 3:
        return f"There are {length} appointments for this time slot already", HTTP_400_BAD_REQUEST
    length = len(__get_items(Appointment.objects.filter(date=new_appt['date'], first_name=new_appt['first_name'], last_name=new_appt['last_name'])))
    if length > 0:
        return f"{new_appt['first_name']} {new_appt['last_name']} already has an appointment booked for {new_appt['date']}", HTTP_400_BAD_REQUEST
    date_time = new_appt['date'].split(' ')
    date = date_time[0]
    time = date_time[1]
    # check to see if the time asked for is spaced 15 minutes out
    if int(time.split(':')[1]) % 15 != 0:
        return "Times have to be in 15 minute increments", HTTP_400_BAD_REQUEST

    serializer = AppointmentSerializer(data=new_appt)
    return None, __create_or_fail(serializer)

def add_doc(doctor):
    serializer = DoctorSerializer(data=doctor)
    return __create_or_fail(serializer)
    
def __create_or_fail(s):
    if s.is_valid():
        s.save()
        return HTTP_201_CREATED
    return HTTP_400_BAD_REQUEST

####################### DELETE REQUESTS ####################### 1
def delete_appt(pk):
    Appointment.objects.filter(id=pk).delete()
    return HTTP_204_NO_CONTENT