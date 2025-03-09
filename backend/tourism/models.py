from django.db import models

class Destination(models.Model):
    name = models.CharField(max_length=255)
    image = models.URLField()  # Store image URLs
    description = models.TextField()

    def __str__(self):
        return self.name
