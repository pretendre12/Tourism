from django.http import JsonResponse
from django.views import View
from rest_framework import viewsets  # ✅ Import viewsets for DRF
from tourism.serializers import TouristSpotSerializer, ThrillingAdventureSerializer, CultureSerializer, DelicaciesSerializer, StaySerializer, DiningSerializer # ✅ Correct
from tourism.models import Destination, TouristSpot, ThrillingAdventure, Culture, Delicacies, Stay, Dining  # ✅ Correct



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