from django.contrib import admin
from .models import Destination, TouristSpot, ThrillingAdventure, Culture, Delicacies, Stay, Dining, Nature, CustomUser # Add other models if needed

admin.site.register(Destination)  # Register the model
admin.site.register(TouristSpot)
admin.site.register(ThrillingAdventure)
admin.site.register(Culture)
admin.site.register(Delicacies)
admin.site.register(Stay)
admin.site.register(Dining)
admin.site.register(Nature)
admin.site.register(CustomUser)