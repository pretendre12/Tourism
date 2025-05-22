from django.http import JsonResponse
from django.views import View
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError
from django.contrib.contenttypes.models import ContentType

from tourism.serializers import (
    TouristSpotSerializer, ThrillingAdventureSerializer, CultureSerializer, 
    DelicaciesSerializer, StaySerializer, DiningSerializer, NatureSerializer,
    SignupSerializer, FavoriteSerializer, FavoriteToggleSerializer
)
from tourism.models import (
    Destination, TouristSpot, ThrillingAdventure, Culture, Delicacies, 
    Stay, Dining, Nature, Favorite, CustomUser as User
)

# ✅ Class-based view for fetching Destination list
class DestinationListView(View):
    def get(self, request):
        destinations = list(Destination.objects.values())
        return JsonResponse(destinations, safe=False)

# ✅ Function-based view for fetching Destination list
def destination_list(request):
    destinations = list(Destination.objects.values())
    return JsonResponse(destinations, safe=False)

# ✅ API ViewSet for TouristSpot using Django REST Framework
class TouristSpotViewSet(viewsets.ModelViewSet):
    queryset = TouristSpot.objects.all()
    serializer_class = TouristSpotSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        """
        Return all TouristSpot objects favorited by the current user
        """
        content_type = ContentType.objects.get_for_model(TouristSpot)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        """
        Toggle favorite status for a specific TouristSpot object
        """
        tourist_spot = self.get_object()
        content_type = ContentType.objects.get_for_model(TouristSpot)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=tourist_spot.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=tourist_spot.id
            )
            return Response({'status': 'added to favorites'})

class ThrillingAdventureViewSet(viewsets.ModelViewSet):
    queryset = ThrillingAdventure.objects.all()
    serializer_class = ThrillingAdventureSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(ThrillingAdventure)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(ThrillingAdventure)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class CultureViewSet(viewsets.ModelViewSet):
    queryset = Culture.objects.all()
    serializer_class = CultureSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(Culture)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(Culture)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        print(favorite)
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class DelicaciesViewSet(viewsets.ModelViewSet):
    queryset = Delicacies.objects.all()
    serializer_class = DelicaciesSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(Delicacies)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(Delicacies)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class StayViewSet(viewsets.ModelViewSet):
    queryset = Stay.objects.all()
    serializer_class = StaySerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(Stay)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(Stay)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class DiningViewSet(viewsets.ModelViewSet):
    queryset = Dining.objects.all()
    serializer_class = DiningSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(Dining)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(Dining)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class NatureViewSet(viewsets.ModelViewSet):
    queryset = Nature.objects.all()
    serializer_class = NatureSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def favorites(self, request):
        content_type = ContentType.objects.get_for_model(Nature)
        favorite_ids = Favorite.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)
        
        queryset = self.queryset.filter(id__in=favorite_ids)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def toggle_favorite(self, request, pk=None):
        obj = self.get_object()
        content_type = ContentType.objects.get_for_model(Nature)
        
        favorite = Favorite.objects.filter(
            user=request.user,
            content_type=content_type,
            object_id=obj.id
        ).first()
        
        if favorite:
            favorite.delete()
            return Response({'status': 'removed from favorites'})
        else:
            Favorite.objects.create(
                user=request.user,
                content_type=content_type,
                object_id=obj.id
            )
            return Response({'status': 'added to favorites'})

class FavoriteViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing user favorites
    """
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        This view returns a list of all favorites for the currently authenticated user
        """
        user = self.request.user
        return Favorite.objects.filter(user=user)
    
    @action(detail=False, methods=['post'])
    def toggle(self, request):
        """
        Toggle favorite status of an item
        """
        serializer = FavoriteToggleSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.toggle_favorite(request.user)
            return Response(result)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False)
    def by_type(self, request):
        """
        Get favorites filtered by content type
        """
        content_type = request.query_params.get('type', None)
        if content_type:
            try:
                content_type_obj = ContentType.objects.get(model=content_type.lower())
                queryset = self.get_queryset().filter(content_type=content_type_obj)
                serializer = self.get_serializer(queryset, many=True)
                return Response(serializer.data)
            except ContentType.DoesNotExist:
                return Response(
                    {"error": f"Content type '{content_type}' does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"error": "Please provide a 'type' parameter"},
            status=status.HTTP_400_BAD_REQUEST
        )

User = get_user_model()  # Ensures Django uses your custom user model

@api_view(['POST'])
def signup(request):
    try:
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED
        )
    except IntegrityError:
        return Response(
            {"error": "Email or username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        
@api_view(['POST'])
def login_view(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username if hasattr(user, 'username') else None
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_user_favorites(request):
    """
    Get all favorites for the current user, optionally filtered by content type
    """
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
    
    content_type_name = request.query_params.get('type', None)
    favorites_query = Favorite.objects.filter(user=request.user)
    
    if content_type_name:
        try:
            content_type = ContentType.objects.get(model=content_type_name.lower())
            favorites_query = favorites_query.filter(content_type=content_type)
        except ContentType.DoesNotExist:
            return Response(
                {"error": f"Content type '{content_type_name}' does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    favorites = favorites_query.all()
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)