from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .services import *

####################### GET REQUESTS ####################### 2
@api_view(["GET"])
def get_list_of_doctors(request):
    """Get a list of all doctors

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """
    res, status = get_all_doctors()
    return Response(res, status=status)

@api_view(["GET"])
def get_appointments_by_doc(request, pk):
    """Get a list of all appointments for a particular doctor and particular day

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """
    res, status = get_appts_for_doc(pk)
    return Response(res, status=status)

####################### POST REQUESTS ####################### 1
@api_view(["POST"])
def add_appt_for_doc(request):
    """Add a new appointment to a doctor's calendar

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """
    data = JSONParser().parse(request)
    return Response(status=add_appt(data['name'], data['appt']))

####################### DELETE REQUESTS ####################### 1
@api_view(["DELETE"])
def delete_appt_for_doc(request):
    """Delete an existing appointment from a doctor's calendar

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """
    data = JSONParser().parse(request)
    status = delete_appt(data['name'], data['pk'])
    return Response(status=status)

