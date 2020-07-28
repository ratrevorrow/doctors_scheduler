from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('get_list_of_doctors', views.get_list_of_doctors, name='get_list_of_doctors'),
    path('get_appointments_by_doc/<int:pk>', views.get_appointments_by_doc, name='get_appointments_by_doc'),
    path('add_appt_for_doc', views.add_appt_for_doc, name='add_appt_for_doc'),
    path('delete_appt_for_doc/<int:pk>', views.delete_appt_for_doc, name='delete_appt_for_doc'),
    path('add_doctor', views.add_doctor, name='add_doctor'),
    path('get_all_appts', views.get_all_appts, name='get_all_appts'),
    path('get_avail_times', views.get_avail_times, name='get_avail_times')
]