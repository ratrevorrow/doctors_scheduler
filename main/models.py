from django.db import models

# Create your models here.
class Doctor(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.first_name) + " " + str(self.last_name)

class Appointment(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    date = models.DateTimeField()
    KIND = (
        ('N', 'New Patient'),
        ('F', 'Follow-up')
    )
    kind = models.CharField(max_length=1, choices=KIND, blank=True, null=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return str(self.first_name) + " " + str(self.last_name)