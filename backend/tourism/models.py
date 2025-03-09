from django.db import models  # <-- ADD THIS LINE

class Destination(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='destinations/')

    def __str__(self):
        return self.name
