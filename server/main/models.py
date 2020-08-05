from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

# Create your models here.
class User(AbstractUser):    
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    ROLE = (
        ('DOCTOR', 'Doctor'),
        ('PATIENT', 'Patient'),
        ('RECEPTIONIST', 'Receptionist'),
    )
    role = models.CharField(max_length=12, choices=ROLE, blank=True, null=True)
    objects = UserManager()
    has_set_password = models.BooleanField(default=False)
    
    def __str__(self):
        return self.email

    def set_has_changed_password(self, option):
        self.has_set_password = option
       
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
