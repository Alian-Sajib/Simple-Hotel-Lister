# serializers.py
from rest_framework import serializers
from .models import SavedHotels


class SavedHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedHotels
        fields = "__all__"
