from django.urls import path
from rest_framework import routers
from .views import UserViewSet, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

# Initialize the router
router = routers.SimpleRouter()
router.register(r"users", UserViewSet)

# Define URL patterns
urlpatterns = [
    # JWT authentication endpoints
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# Add router-generated URLs to the urlpatterns
urlpatterns += router.urls
