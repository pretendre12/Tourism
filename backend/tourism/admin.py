from django.contrib import admin
from .models import Destination, TouristSpot, ThrillingAdventure  # Add other models if needed

admin.site.register(Destination)  # Register the model
admin.site.register(TouristSpot)
admin.site.register(ThrillingAdventure)
