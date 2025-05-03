# views.py
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, permissions
from .models import SavedHotels
from .serializers import SavedHotelSerializer


@api_view(["GET"])
def proxy_hotel_data(request):
    location_key = request.GET.get("location_key")
    if not location_key:
        return Response(
            {"error": "Missing location_key"}, status=status.HTTP_400_BAD_REQUEST
        )

    url = f"https://data.xotelo.com/api/list?location_key={location_key}"

    try:
        external_response = requests.get(url)
        external_response.raise_for_status()
        return Response(external_response.json())
    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SavedHotelViewSet(viewsets.ModelViewSet):
    serializer_class = SavedHotelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedHotels.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
