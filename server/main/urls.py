from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    ####################### GET REQUESTS #######################
    path('doctors', views.doctors, name='get_doctors'),
    path('patients', views.patients, name='get_patients'),
    path('appointments', views.all_appointments, name='all_appointments'),
    path('doctors/<int:pk>/appointments', views.doctors_appointments, name='appointments'),
    path('doctors/<int:pk>/times/<str:selected_date>', views.available_times_for_day, name='available_times'),
    path('logout', views.logout, name='logout'),
    ####################### POST REQUESTS #######################
    path('doctors/<int:pk>/appointment', views.appointment, name='add_appointment'),
    path('doctors', views.doctors, name='add_doctor'),
    path('login', views.login, name='login'),
    path('createuser', views.create_user, name='createuser'),
    ####################### DELETE REQUESTS #######################
    path('doctors/<int:pk>/appointment', views.appointment, name='delete_appointment'),
]