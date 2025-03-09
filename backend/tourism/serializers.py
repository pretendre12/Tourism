from rest_framework import serializers
from .models import Destination

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'  # This includes all fields from the model
