from django.db import models  
from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation

class Destination(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='destinations/')
    favorites = GenericRelation('Favorite')

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
    favorites = GenericRelation('Favorite')

    def __str__(self):
        return self.title

class ThrillingAdventure(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    highlights = models.TextField()
    image1 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image2 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image3 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    favorites = GenericRelation('Favorite')

    def __str__(self):
        return self.title

class Culture(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image1 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    image2 = models.ImageField(upload_to='thrilling_adventures/', null=True, blank=True)
    highlights1 = models.TextField()
    highlights2 = models.TextField()
    favorites = GenericRelation('Favorite')

    def __str__(self):
        return self.title

class Delicacies(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image1 = models.ImageField(upload_to='delicacies/', null=True, blank=True)
    favorites = GenericRelation('Favorite')

    def __str__(self):
        return self.title

class Stay(models.Model):
    title = models.CharField(max_length=200)
    location = models.TextField()
    image1 = models.ImageField(upload_to='stay/', null=True, blank=True)
    favorites = GenericRelation('Favorite')
    
    def __str__(self):
        return self.title
    
class Dining(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.TextField(max_length=300)
    image1 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image2 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image3 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    image4 = models.ImageField(upload_to='Dining/', null=True, blank=True)
    favorites = GenericRelation('Favorite')
    
    def __str__(self):
        return self.title

class Nature(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    highlights = models.TextField()
    image1 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    image2 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    image3 = models.ImageField(upload_to='Nature/', null=True, blank=True)
    favorites = GenericRelation('Favorite')
    
    def __str__(self):
        return self.title
    
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

class Favorite(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='favorites')
    
    # For the generic relation to any content type
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.content_object}"