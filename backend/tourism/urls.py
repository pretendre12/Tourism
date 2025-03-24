from django.urls import path
from .views import signup
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import destination_list, TouristSpotViewSet, ThrillingAdventureViewSet, CultureViewSet, DelicaciesViewSet, StayViewSet, DiningViewSet, NatureViewSet  # ✅ Import the correct function

router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet)
router.register(r'thrilling-adventures', ThrillingAdventureViewSet, basename='thrillingadventure')
router.register(r'culture', CultureViewSet, basename='culture')
router.register(r'delicacies', DelicaciesViewSet, basename='delicacies')
router.register(r'stay', StayViewSet, basename='stay')
router.register(r'dining', DiningViewSet, basename='dining')
router.register(r'nature', NatureViewSet, basename='Nature')

urlpatterns = [
    path('', include(router.urls)),
    path('destinations/', destination_list, name='destination-list'),
    path("signup/", signup, name="signup"),
]
