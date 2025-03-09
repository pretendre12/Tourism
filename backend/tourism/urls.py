from django.urls import path
from .views import destination_list  # ✅ Import the correct function

urlpatterns = [
    path('destinations/', destination_list, name='destination-list'),
]
