from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from .models import *
import datetime
data_arr = []
data_obj = {}
# obj = Object.objects.get(pk=pk) 
# obj = MainFile.objects.get(file_id='e3e978a3-0375-4bb9-85a2-5175e2ec097d')

# Doctors should
# have a unique ID, a first name, and a last name
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
    'date_time': datetime.datetime.now(),
    'kind': 'NP'
}
appointments = {
    'Andy': [appointment],
    'Michelle': [appointment]
}

####################### GET REQUESTS ####################### 2
def get_all_doctors():
    return doctors, HTTP_200_OK
    # return Doctor.objects.all(), HTTP_200_OK

def get_appts_for_doc(pk):
    for doc in doctors:
        if pk == doc['id']:
            return appointments[doc['first_name']], HTTP_200_OK
    return [], HTTP_404_NOT_FOUND


####################### POST REQUESTS ####################### 1
def add_appt(name, appt):
    date_time = appt['date_time'].split(' ')
    date = date_time[0]
    time = date_time[1]
    # check to see if the time asked for is spaced 15 minutes out
    if int(time.split(':')[1]) % 15 != 0:
        return Response(data="Times have to be in 15 minute increments", status=HTTP_400_BAD_REQUEST)
    appointments[name].append(appt)
    return HTTP_201_CREATED

####################### DELETE REQUESTS ####################### 1
def delete_appt(name, pk):
    for i in range(len(appointments[name])):
        if pk == appointments[name][i]['id']:
            appointments[name].pop(i)
            return HTTP_204_NO_CONTENT
    return HTTP_404_NOT_FOUND