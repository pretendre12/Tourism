from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from tourism.views import TouristSpotViewSet, login_view, signup  # Ensure correct imports

router = DefaultRouter()
router.register(r'tourist-spots', TouristSpotViewSet, basename='touristspot')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tourism.urls')),  # Use router.urls
    path("api/signup/", signup, name="signup"),
    path("api/login/", login_view, name="login"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
