from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Destination, TouristSpot, ThrillingAdventure, Culture, Delicacies, Stay, Dining, Nature
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate


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

class DelicaciesSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    
    class Meta:
        model = Delicacies
        fields = "__all__"  # Includes all model fields

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None

        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"

class StaySerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    
    class Meta:
        model = Stay
        fields = "__all__"  # Includes all model fields

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None

        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"

class DiningSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()

    class Meta:
        model = Dining
        fields = "__all__"  # Includes all model fields

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None


    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None

    def get_image3(self, obj):
        return f"{settings.MEDIA_URL}{obj.image3}" if obj.image3 else None

    def get_image4(self, obj):
        return f"{settings.MEDIA_URL}{obj.image4}" if obj.image4 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"

class NatureSerializer(serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()

    class Meta:
        model = Nature
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

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email', 'password']  # Removed username
        extra_kwargs = {
            'email': {'required': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  # Changed from username to email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
=======
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']  # Removed username
        extra_kwargs = {
            'email': {'required': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  # Changed from username to email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])
>>>>>>> 1b419335 (Pending changes exported from your codespace)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {"user": user}