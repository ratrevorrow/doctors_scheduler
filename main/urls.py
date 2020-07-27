from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('get_list_of_doctors', views.get_list_of_doctors, name='get_list_of_doctors'),
    path('get_appointments_by_doc/<int:pk>', views.get_appointments_by_doc, name='get_appointments_by_doc'),
    path('add_appt_for_doc', views.add_appt_for_doc, name='add_appt_for_doc'),
    path('delete_appt_for_doc', views.delete_appt_for_doc, name='delete_appt_for_doc')
]