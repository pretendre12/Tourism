from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    signup,
    login_view,  # ✅ Correct function name (was 'login' in your import)
    destination_list,
    TouristSpotViewSet,
    ThrillingAdventureViewSet,
    CultureViewSet,
    DelicaciesViewSet,
    StayViewSet,
    DiningViewSet,
    NatureViewSet
)

router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet)
router.register(r'thrilling-adventures', ThrillingAdventureViewSet, basename='thrillingadventure')
router.register(r'culture', CultureViewSet, basename='culture')
router.register(r'delicacies', DelicaciesViewSet, basename='delicacies')
router.register(r'stay', StayViewSet, basename='stay')
router.register(r'dining', DiningViewSet, basename='dining')
router.register(r'nature', NatureViewSet, basename='nature')  # ✅ Fixed basename to lowercase

urlpatterns = [
    path('', include(router.urls)),
    path('destinations/', destination_list, name='destination-list'),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),  # ✅ Use direct imported function
]
