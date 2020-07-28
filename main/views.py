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

@api_view(["GET"])
def get_all_appts(request):
    """Get a list of all appointments for a particular doctor and particular day

    Args:
        pk (int): this will be the ID of the doctor

    Returns:
        Response: Returns the list of appointments for the specific doctor.
    """
    return Response(get_appts(), status=HTTP_200_OK)

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
    res, status = add_appt(data)
    return Response(data=res, status=status)

@api_view(["POST"])
def add_doctor(request):
    data = JSONParser().parse(request)
    return Response(status=add_doc(data))

@api_view(["POST"])
def get_avail_times(request):
    data = JSONParser().parse(request)
    res, status = get_times_available_for_date(data)
    return Response(res, status=status)

####################### DELETE REQUESTS ####################### 1
@api_view(["DELETE"])
def delete_appt_for_doc(request, pk):
    """Delete an existing appointment from a doctor's calendar

    Args:
        pk: the ID of the appointment

    Returns:
        Response 204:   if the appointment was deleted successfully
    """
    return Response(status=delete_appt(pk))
