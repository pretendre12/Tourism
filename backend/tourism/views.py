from django.http import JsonResponse
from django.views import View
from rest_framework import viewsets  # ✅ Import viewsets for DRF
from tourism.serializers import TouristSpotSerializer, ThrillingAdventureSerializer, CultureSerializer, DelicaciesSerializer, StaySerializer, DiningSerializer, NatureSerializer # ✅ Correct
from tourism.models import Destination, TouristSpot, ThrillingAdventure, Culture, Delicacies, Stay, Dining, Nature  # ✅ Correct
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import SignupSerializer
from django.contrib.auth import authenticate, get_user_model
from tourism.models import CustomUser as User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError


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

class ThrillingAdventureViewSet(viewsets.ModelViewSet):
    queryset = ThrillingAdventure.objects.all()
    serializer_class = ThrillingAdventureSerializer

class CultureViewSet(viewsets.ModelViewSet):
    queryset = Culture.objects.all()
    serializer_class = CultureSerializer

class DelicaciesViewSet(viewsets.ModelViewSet):
    queryset = Delicacies.objects.all()
    serializer_class = DelicaciesSerializer

class StayViewSet(viewsets.ModelViewSet):
    queryset = Stay.objects.all()
    serializer_class = StaySerializer

class DiningViewSet(viewsets.ModelViewSet):
    queryset = Dining.objects.all()
    serializer_class = DiningSerializer

class NatureViewSet(viewsets.ModelViewSet):
    queryset = Nature.objects.all()
    serializer_class = NatureSerializer

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
                "username": user.username
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)