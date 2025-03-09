from django.http import JsonResponse
from django.views import View
from .models import Destination

# ✅ If using a class-based view
class DestinationListView(View):
    def get(self, request):
        destinations = list(Destination.objects.values())
        return JsonResponse(destinations, safe=False)

# ✅ If using a function-based view
def destination_list(request):
    destinations = list(Destination.objects.values())
    return JsonResponse(destinations, safe=False)
