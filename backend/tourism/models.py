from django.db import models  
from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager

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
    
    
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None  # Remove username
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email
