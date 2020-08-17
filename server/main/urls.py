from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    ####################### GET REQUESTS #######################
    path('doctors', views.doctors, name='get_doctors'),
    path('patients', views.patients, name='get_patients'),
    path('users', views.all_users, name='all_users'),
    path('appointments', views.appointments, name='all_appointments'),
    path('doctors/<int:pk>/appointments',
         views.doctors_appointments, name='appointments'),
    path('doctors/<int:pk>/times/<str:selected_date>',
         views.available_times_for_day, name='available_times'),
    ####################### POST REQUESTS #######################
    path('doctors/<int:pk>/appointment',
         views.appointments, name='add_appointment'),
    path('doctors', views.doctors, name='add_doctor'),
    path('login', views.login, name='login'),
    path('resetPassword', views.reset_password, name='reset_password'),
    ####################### DELETE REQUESTS #######################
    path('doctors/<int:pk>/appointment',
         views.appointments, name='delete_appointment'),
]
