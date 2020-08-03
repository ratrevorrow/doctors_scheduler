from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):    
    username = None
    role = models.CharField(max_length=7, choices=ROLE, blank=True, null=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    ROLE = (
        ('DOCTOR', 'Doctor'),
        ('PATIENT', 'Patient')
    )
    
    def __str__(self):
        return self.email
       
class Appointment(models.Model):
    date = models.DateTimeField()
    KIND = (
        ('N', 'New Patient'),
        ('F', 'Follow-up')
    )
    kind = models.CharField(max_length=1, choices=KIND, blank=True, null=True)
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name="doctor")
    patient = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name="patient")
    
    def __str__(self):
        return str(self.first_name) + " " + str(self.last_name)
