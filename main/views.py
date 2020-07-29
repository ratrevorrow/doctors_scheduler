from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from .services import *                                   

####################### GET REQUESTS ####################### 2
@api_view(["GET", "POST"])
def doctors(request):
    """Add/Get a list of all doctors
        - endpoint: /doctors

    Returns:
        Response: Returns the list of doctors
    """
    if request.method == 'GET':
        return Response(get_all_doctors(), status=HTTP_200_OK)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        if add_doc(data):
            return Response(status=HTTP_201_CREATED)
    return Response(status=HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def all_appointments(request):
    """Get a list of all appointments for a particular doctor and particular day
        - endpoint: /appointments

    Returns:
        Response: Returns the list of appointments for the specific doctor.
    """
    return Response(get_appts(), status=HTTP_200_OK)

@api_view(["GET"])
def doctors_appointments(request, pk):
    """Get a list of all appointments for a particular doctor and particular day
        - endpoint: /doctors/<int:pk>/appointments

    Args:
        pk (int): this will be the ID of the doctor

    Returns:
        Response: Returns the list of appointments for the specific doctor.
    """
    return Response(get_appts_for_doc(pk), status=HTTP_200_OK)

@api_view(["GET"])
def available_times_for_day(request, pk, selected_date):
    """Get the times and slot count available for a given day for doctor
        - endpoint: /doctors/<int:pk>/times/available

    Args:
        pk (int): primary key for doctor
        selected_date (str) - YYYY-MM-DD

    Returns:
        Response: Object with key, vals of times, available count
    """
    return Response(get_times_available_for_date(pk, selected_date), status=HTTP_200_OK)

@api_view(["POST", "DELETE"])
def appointment(request, pk):
    """Add/Delete a new appointment to a doctor's calendar
        - endpoint: /doctors/<int:pk>/appointment

    Args:
        pk: primary key of the doctor

    Returns:
        Response 400:   if the time slot is not in 15 minute increments or
                        if there are already 3 appointments for a given time selected
        Response 201:   if the appointment was added to the doctor successfully
        Response 204:   if the appointment was deleted successfully
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        if is_fully_booked(data):
            return Response(f"There are {length} appointments for this time slot already", status=HTTP_400_BAD_REQUEST)
        elif is_patient_booked_already(data):
            return Response(f"{data['first_name']} {data['last_name']} already has an appointment booked for {data['date']}", status=HTTP_400_BAD_REQUEST)
        elif not is_increment_of_fifteen(data):
            return Response("Times have to be in 15 minute increments", status=HTTP_400_BAD_REQUEST)
        
        if add_appt(data):
            return Response(status=HTTP_201_CREATED)

    elif request.method == 'DELETE':
        delete_appt(pk)
        return Response(status=HTTP_204_NO_CONTENT)

    return Response("Unable to add appointment. Check date format.", status=HTTP_400_BAD_REQUEST)
