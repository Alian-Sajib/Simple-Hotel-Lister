# models.py
from django.db import models
from authentication.models import User


class SavedHotels(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel_name = models.CharField(max_length=255)
    hotel_url = models.URLField()
    rating = models.FloatField(null=True, blank=True)
    count = models.FloatField(null=True, blank=True)
    min_price = models.FloatField(null=True, blank=True)
    max_price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.hotel_name}"
