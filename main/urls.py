from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    ####################### GET REQUESTS #######################
    path('doctors', views.doctors, name='get_doctors'),
    path('appointments', views.all_appointments, name='all_appointments'),
    path('doctors/<int:pk>/appointments', views.doctors_appointments, name='appointments'),
    path('doctors/<int:pk>/times/available/<str:selected_date>', views.available_times_for_day, name='available_times'),
    ####################### POST REQUESTS #######################
    path('doctors/<int:pk>/appointment', views.appointment, name='add_appointment'),
    path('doctors', views.doctors, name='add_doctor'),
    ####################### DELETE REQUESTS #######################
    path('doctors/<int:pk>/appointment', views.appointment, name='delete_appointment'),
]