from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "password",
        ]

    def create(self, validated_data):
        # Extract necessary fields from validated data
        email = validated_data["email"]
        password = validated_data["password"]

        # Use the custom manager's create_user method to handle user creation and password hashing
        user = User.objects.create_user(email=email, password=password)
        # user.save()
        return user
