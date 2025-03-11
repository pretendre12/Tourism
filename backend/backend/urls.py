from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from tourism.views import TouristSpotViewSet


router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet, basename='touristspot')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tourism.urls')),  # This should be correct
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)