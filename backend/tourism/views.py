from django.http import JsonResponse
from django.views import View
from rest_framework import viewsets  # ✅ Import viewsets for DRF
from tourism.serializers import TouristSpotSerializer, ThrillingAdventureSerializer  # ✅ Correct
from tourism.models import Destination, TouristSpot, ThrillingAdventure  # ✅ Correct



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
