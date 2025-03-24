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


@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()  # Ensures Django uses your custom user model

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

    # 🛠 Authenticate with email instead of username
    user = authenticate(request, email=email, password=password)  # Pass email, not username!

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "message": "Login successful!"}, status=status.HTTP_200_OK)

    return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)