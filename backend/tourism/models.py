from django.db import models  
from django.contrib.auth.models import AbstractUser, Group, Permission

class Destination(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='destinations/')

    def __str__(self):
        return self.name

class TouristSpot(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image1 = models.ImageField(upload_to='tourist_spots/')
    image2 = models.ImageField(upload_to='tourist_spots/', blank=True, null=True)
    image3 = models.ImageField(upload_to='tourist_spots/', blank=True, null=True)
    activities = models.TextField()  # Store as a list separated by commas
    cultural_significance = models.TextField()
    travel_tips = models.TextField()

    def __str__(self):
        return self.title

class ThrillingAdventure(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    highlights = models.TextField()
    image1 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image2 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image3 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)

class Culture(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image1 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image2 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    highlights1 = models.TextField()
    highlights2 = models.TextField()

class Delicacies(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image1 = models.ImageField(upload_to='delicacies/', null=True, blank=True)

class Stay(models.Model):
    title = models.CharField(max_length=200)
    location = models.TextField()
    image1 = models.ImageField(upload_to='stay/', null=True, blank=True)
    
class Dining(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.TextField(max_length=300)
    image1 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image2 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image3 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image4 = models.ImageField(upload_to='Dining/', null=True, blank=True)

class Nature(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    highlights = models.TextField()
    image1 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    image2 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    image3 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    
    
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Force Django to use email instead of username for authentication
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # username is no longer required

    groups = models.ManyToManyField(Group, related_name="customuser_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_set", blank=True)

    def __str__(self):
        return self.email  # Return email instead of username
