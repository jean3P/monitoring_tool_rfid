from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    target_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tags")

    def __str__(self):
        return self.target_id


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    arduino_model = models.CharField(max_length=100)
    rfid_model = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username}'s profile"
