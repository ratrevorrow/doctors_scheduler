################### IMPORTS #######################
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from .services import *
from .serializers import LoginSerializer, UserSerializer
from .models import User
################### REQUESTS #######################


@api_view(["GET"])
def doctors(request):
    """Get a list of all doctors
        - endpoint: /doctors

    Returns:
        Response: Returns the list of doctors
    """
    if request.method == 'GET':
        return Response(get_all_doctors(), status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def patients(request):
    """Get a list of all doctors
        - endpoint: /patients

    Returns:
        Response GET: Returns the list of patients
    """
    if request.method == 'GET':
        return Response(get_all_patients(), status=HTTP_200_OK)
    return Response(status=HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def all_users(request):
    """Get a list of all the users or create a new user
        - endpoint: /users

    Returns:
        Response GET: Returns the list of users
        Response POST: Return a success or failure message for user creation
    """
    if request.method == 'GET':
        return Response(get_all_users(), HTTP_200_OK)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        if add_user(data):
            return Response('User created', HTTP_201_CREATED)
    return Response('Cannot create user', HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def reset_password(request):
    """Reset password for the user
        - endpoint: /resetPassword

    Returns:
        Response POST: Return a success or failure message for user creation
    """
    data = JSONParser().parse(request)
    if alter_user(data):
        return Response('User altered', HTTP_200_OK)
    return Response('Cannot alter user', HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    """By logging in, this request will return the token required to make requests
        - endpoint: /login

    Returns:
        Response POST:  Return a success or failure message for logging in.
                        Return token and/or user object.
    """
    data = JSONParser().parse(request)
    try:
        user = User.objects.get(email=data['email'])
    except:
        return Response("You haven't been added to the system yet. Call the office to get started.", HTTP_404_NOT_FOUND)
    load_user = User.objects.filter(email=data['email']).values(
        'id', 'email', 'role', 'first_name', 'last_name', 'has_set_password')[0]
    if not load_user['has_set_password']:
        return Response({'user': load_user}, HTTP_200_OK)

    serialize_login_user = LoginSerializer(data=data)
    if serialize_login_user.is_valid():
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': load_user}, HTTP_200_OK)
    else:
        print(serialize_login_user.errors)
        return Response('Incorrect Credentials', HTTP_404_NOT_FOUND)


@api_view(["GET"])
def all_appointments(request):
    """Get a list of all appointments
        - endpoint: /appointments

    Returns:
        Response: Returns a list of appointments.
    """
    return Response(get_appts(), HTTP_200_OK)


@api_view(["GET"])
def doctors_appointments(request, pk):
    """Get a list of all appointments for a particular doctor and particular day
        - endpoint: /doctors/<int:pk>/appointments

    Args:
        pk (int): this will be the ID of the doctor

    Returns:
        Response: Returns the list of appointments for the specific doctor.
    """
    return Response(get_appts_for_doc(pk), HTTP_200_OK)


@api_view(["GET"])
def available_times_for_day(request, pk, selected_date):
    """Get the times and slot count available for a given day for doctor
        - endpoint: /doctors/<int:pk>/times/<str:selected_date>

    Args:
        pk (int): primary key for doctor
        selected_date (str) - YYYY-MM-DD

    Returns:
        Response: Object with key, vals of times, available count
    """
    return Response(get_times_available_for_date(pk, selected_date), HTTP_200_OK)


@api_view(["GET", "POST", "DELETE"])
def appointments(request, pk = None):
    """Add/Delete a new appointment to a doctor's calendar
        - endpoint: /doctors/<int:pk>/appointment

    Args:
        pk: primary key of the doctor

    Returns:
        Response 400:   if the time slot is not in 15 minute increments or
                        if there are already 3 appointments for a given time selected
                        if the patient has already booked an appointment at the specified time
        Response 201:   if the appointment was added to the doctor successfully
        Response 204:   if the appointment was deleted successfully
    """
    if request.method == 'GET':
        return Response(get_appts(), HTTP_200_OK)

    if request.method == 'POST':
        data = JSONParser().parse(request)
        if is_fully_booked(data):
            return Response(f"There are 3 appointments for this time slot already", HTTP_400_BAD_REQUEST)
        elif is_patient_booked_already(data):
            return Response("Patient is already booked for that time", HTTP_400_BAD_REQUEST)
        elif not is_increment_of_fifteen(data):
            return Response("Times have to be in 15 minute increments", HTTP_400_BAD_REQUEST)

        if add_appt(data):
            return Response(status=HTTP_201_CREATED)
        return Response("Failed to add appointment", HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if delete_appt(pk):
            return Response(status=HTTP_204_NO_CONTENT)
        return Response("Unable to find the appointment with that ID.", HTTP_400_BAD_REQUEST)

    return Response("Something went wrong while adding/deleting/getting appointment(s)", HTTP_400_BAD_REQUEST)
