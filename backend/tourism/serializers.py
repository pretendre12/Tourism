from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
from .models import (
    Destination, TouristSpot, ThrillingAdventure, Culture, 
    Delicacies, Stay, Dining, Nature, Favorite, CustomUser
)
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate


class FavoriteSerializer(serializers.ModelSerializer):
    content_type_str = serializers.SerializerMethodField()
    content_object_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'content_type', 'object_id', 'created_at', 
                  'content_type_str', 'content_object_title']
        read_only_fields = ['user', 'created_at']
    
    def get_content_type_str(self, obj):
        return obj.content_type.model
    
    def get_content_object_title(self, obj):
        if hasattr(obj.content_object, 'title'):
            return obj.content_object.title
        elif hasattr(obj.content_object, 'name'):
            return obj.content_object.name
        return f"Object ID: {obj.object_id}"

    def create(self, validated_data):
        # Set the user to the current authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class FavoriteToggleSerializer(serializers.Serializer):
    content_type = serializers.CharField()
    object_id = serializers.IntegerField()
    
    def validate_content_type(self, value):
        """
        Check that the content_type is valid
        """
        try:
            model_name = value.lower()
            content_type = ContentType.objects.get(model=model_name)
            return content_type
        except ContentType.DoesNotExist:
            raise serializers.ValidationError(f"Content type '{value}' is not valid")
    
    def toggle_favorite(self, user):
        """
        Toggle favorite status and return whether it was added or removed
        """
        content_type = self.validated_data['content_type']
        object_id = self.validated_data['object_id']
        
        # Check if the object exists
        model_class = content_type.model_class()
        try:
            model_class.objects.get(id=object_id)
        except model_class.DoesNotExist:
            raise serializers.ValidationError(f"{content_type.model.capitalize()} with ID {object_id} does not exist")
        
        # Try to get existing favorite
        existing_favorite = Favorite.objects.filter(
            user=user,
            content_type=content_type,
            object_id=object_id
        ).first()
        
        if existing_favorite:
            # If favorite exists, remove it
            existing_favorite.delete()
            return {'status': 'removed'}
        else:
            # If favorite doesn't exist, add it
            new_favorite = Favorite.objects.create(
                user=user,
                content_type=content_type,
                object_id=object_id
            )
            return {'status': 'added', 'id': new_favorite.id}


class FavoriteStatusMixin:
    """
    Mixin to add favorite status to serialized objects
    """
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            content_type = ContentType.objects.get_for_model(obj.__class__)
            return Favorite.objects.filter(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            ).exists()
        return False


class DestinationSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Destination
        fields = '__all__'
    
    def get_image(self, obj):
        return f"{settings.MEDIA_URL}{obj.image}" if obj.image else None


class TouristSpotSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None

    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None

    def get_image3(self, obj):
        return f"{settings.MEDIA_URL}{obj.image3}" if obj.image3 else None

    class Meta:
        model = TouristSpot
        fields = "__all__"


class ThrillingAdventureSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = ThrillingAdventure
        fields = "__all__"

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


class CultureSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Culture
        fields = "__all__"

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None

    def get_image2(self, obj):
        return f"{settings.MEDIA_URL}{obj.image2}" if obj.image2 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"


class DelicaciesSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Delicacies
        fields = "__all__"

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"


class StaySerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Stay
        fields = "__all__"

    def get_image1(self, obj):
        return f"{settings.MEDIA_URL}{obj.image1}" if obj.image1 else None
        
    def get_full_image_url(self, image_path):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(image_path)
        return f"{settings.MEDIA_URL}{image_path}"


class DiningSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Dining
        fields = "__all__"

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


class NatureSerializer(FavoriteStatusMixin, serializers.ModelSerializer):
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Nature
        fields = "__all__"

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
    password = serializers.CharField(
        write_only=True, 
        min_length=8,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email', 'password']
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
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {"user": user}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name']