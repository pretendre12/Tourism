from rest_framework import serializers
from .models import Destination, TouristSpot, ThrillingAdventure, Culture
from django.conf import settings


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'  # This includes all fields from the model

class TouristSpotSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None

    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None

    def get_image3(self, obj):
        return f"{settings.MEDIA_URL}{obj.image3}" if obj.image3 else None

    class Meta:
        model = TouristSpot
        fields = "__all__"

from rest_framework import serializers
from django.conf import settings
from .models import ThrillingAdventure  # Import the correct model

class ThrillingAdventureSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()

    class Meta:
        model = ThrillingAdventure
        fields = "__all__"  # Includes all model fields

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None


    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None

    def get_image3(self, obj):
        return f"{settings.MEDIA_URL}{obj.image3}" if obj.image3 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"

class CultureSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    
    class Meta:
        model = Culture
        fields = "__all__"  # Includes all model fields

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None


    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"
