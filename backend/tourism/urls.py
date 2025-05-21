from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    signup,
    login_view,
    destination_list,
    DestinationListView,
    TouristSpotViewSet,
    ThrillingAdventureViewSet,
    CultureViewSet,
    DelicaciesViewSet,
    StayViewSet,
    DiningViewSet,
    NatureViewSet,
    FavoriteViewSet,
    get_user_favorites
)

router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet)
router.register(r'thrilling-adventures', ThrillingAdventureViewSet, basename='thrillingadventure')
router.register(r'culture', CultureViewSet, basename='culture')
router.register(r'delicacies', DelicaciesViewSet, basename='delicacies')
router.register(r'stay', StayViewSet, basename='stay')
router.register(r'dining', DiningViewSet, basename='dining')
router.register(r'nature', NatureViewSet, basename='nature')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
    path('destinations/', destination_list, name='destination-list'),
    path('destinations/list/', DestinationListView.as_view(), name='destination-list-class'),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('user/favorites/', get_user_favorites, name='user-favorites'),
]