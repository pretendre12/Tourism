from django.contrib import admin
from .models import Destination, TouristSpot   # Add other models if needed

admin.site.register(Destination)  # Register the model
admin.site.register(TouristSpot)
