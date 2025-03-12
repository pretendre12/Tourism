from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import destination_list, TouristSpotViewSet, ThrillingAdventureViewSet  # ✅ Import the correct function

router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet)
router.register(r'thrilling-adventures', ThrillingAdventureViewSet, basename='thrillingadventure')

urlpatterns = [
    path('', include(router.urls)),
    path('destinations/', destination_list, name='destination-list'),
]
