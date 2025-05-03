from django.urls import path, include
from .views import proxy_hotel_data
from rest_framework.routers import DefaultRouter
from .views import SavedHotelViewSet

router = DefaultRouter()
router.register("savedhotels", SavedHotelViewSet, basename="saved-hotel")

urlpatterns = [
    path("api/hotels/", proxy_hotel_data),
    path("api/", include(router.urls)),
]
