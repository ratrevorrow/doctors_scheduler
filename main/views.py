from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from .services import *                                   

####################### GET REQUESTS ####################### 2
@api_view(["GET"])
def get_list_of_doctors(request):
    """Get a list of all doctors

    Returns:
        Response: Returns the list of doctors at Notable
    """
    res, status = get_all_doctors()
    return Response(res, status=status)

@api_view(["GET"])
def get_appointments_by_doc(request, pk):
    """Get a list of all appointments for a particular doctor and particular day

    Args:
        pk (int): this will be the ID of the doctor

    Returns:
        Response: Returns the list of appointments for the specific doctor.
    """
    res, status = get_appts_for_doc(pk)
    return Response(res, status=status)

####################### POST REQUESTS ####################### 1
@api_view(["POST"])
def add_appt_for_doc(request):
    """Add a new appointment to a doctor's calendar

    Args:
        request: post request header and body

    Returns:
        Response 400:   if the time slot is not in 15 minute increments or
                        if there are already 3 appointments for a given time selected
        Response 201:   if the appointment was added to the doctor successfully
    """
    data = JSONParser().parse(request)
    date_time = data['appt']['date_time'].split(' ')
    date = date_time[0]
    time = date_time[1]
    # check to see if the time asked for is spaced 15 minutes out
    if int(time.split(':')[1]) % 15 != 0:
        return Response(data="Times have to be in 15 minute increments", status=HTTP_400_BAD_REQUEST)
    status = add_appt(data['name'], data['appt'])
    if status == HTTP_400_BAD_REQUEST:
        return Response(data="There are 3 appointments for this time slot already", status=status)
    return Response(status=status)

####################### DELETE REQUESTS ####################### 1
@api_view(["DELETE"])
def delete_appt_for_doc(request):
    """Delete an existing appointment from a doctor's calendar

    Args:
        request will be parsed using JSONParser. 
        It should contain keys: name, pk (the ID of the appointment)

    Returns:
        Response 404:   if the appointment was not found
        Response 204:   if the appointment was deleted successfully
    """
    data = JSONParser().parse(request)
    status = delete_appt(data['name'], data['pk'])
    return Response(status=status)

