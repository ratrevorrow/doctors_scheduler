from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)
from .services import (
    add_appt,
    get_all_doctors,
    get_appts,
    get_appts_for_doc,
    get_times_available_for_date,
    is_fully_booked,
    is_patient_booked_already,
    is_increment_of_fifteen,
    delete_appt,
    add_user,
    get_all_patients,
    get_items,
    alter_user,
    get_all_users
)
from django.views.decorators.csrf import csrf_exempt
from .serializers import LoginSerializer, UserSerializer
from .models import User

# GET REQUESTS ####################### 2


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
        if add_user(data):
            return Response('User created', status=HTTP_201_CREATED)
    return Response(status=HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["GET", "POST"])
def patients(request):
    """Add/Get a list of all doctors
        - endpoint: /patients

    Returns:
        Response: Returns the list of patients
    """
    if request.method == 'GET':
        return Response(get_all_patients(), status=HTTP_200_OK)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        if alter_user(data):
            return Response('User altered', status=HTTP_201_CREATED)
    return Response('Cannot alter user', status=HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def all_users(request):
    users = get_all_users()
    # users['first_name'] = users.pop('firstName')
    # users['last_name'] = users.pop('lastName')
    return Response(users, status=HTTP_200_OK)

@api_view(["POST"])
def create_user(request):
    data = JSONParser().parse(request)
    data['first_name'] = data.pop('firstName')
    data['last_name'] = data.pop('lastName')
    if add_user(data):
        return Response('User created', status=HTTP_201_CREATED)
    return Response('Cannot create user', status=HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    data = JSONParser().parse(request)
    try:
        load_user = User.objects.filter(email=data['email']).values(
            'id', 'email', 'role', 'first_name', 'last_name', 'has_set_password')[0]
    except:
        return Response("You haven't been added to the system yet. Call the office to get started.", status=HTTP_404_NOT_FOUND)
    load_user['firstName'] = load_user.pop('first_name')
    load_user['lastName'] = load_user.pop('last_name')
    load_user['hasSetPassword'] = load_user.pop('has_set_password')
    if not load_user['hasSetPassword']:
        return Response({'user': load_user}, status=HTTP_200_OK)

    serialize_user = LoginSerializer(data=data)
    if serialize_user.is_valid():
        user = User.objects.get(email=data['email'])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': load_user}, status=HTTP_200_OK)
    else:
        print(serialize_user.errors)
        return Response('Incorrect Credentials', status=HTTP_404_NOT_FOUND)


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
            return Response(f"There are 3 appointments for this time slot already", status=HTTP_400_BAD_REQUEST)
        elif is_patient_booked_already(data):
            return Response("Patient is already booked for that time", status=HTTP_400_BAD_REQUEST)
        elif not is_increment_of_fifteen(data):
            return Response("Times have to be in 15 minute increments", status=HTTP_400_BAD_REQUEST)

        if add_appt(data):
            return Response(status=HTTP_201_CREATED)

    elif request.method == 'DELETE':
        if delete_appt(pk):
            return Response(status=HTTP_204_NO_CONTENT)
        return Response("Unable to delete appointment. The ID may not exist", status=HTTP_400_BAD_REQUEST)

    return Response("Unable to add appointment. Check date format.", status=HTTP_400_BAD_REQUEST)
