from django.db import models

# Create your models here.

class Doctor(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.first_name + last_name

# patient first name, patient last name, date & time, and kind (New Patient or Follow-up).
class Appointment(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    date = models.DateTimeField()
    KIND = (
        ('NEW_PATIENT', 'New Patient'),
        ('FOLLOW_UP', 'Follow-up')
    )
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.first_name + last_name