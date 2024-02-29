import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods

from .models import Tag, UserProfile
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

# Assuming API_VERSION is defined in your views or settings
API_VERSION = 'v1'


def tag_list(request):
    tags = Tag.objects.all()
    # For API, you might want to return a JsonResponse. Example:
    tags_data = [{"target_id": tag.target_id, "created_at": tag.created_at} for tag in tags]
    return JsonResponse({"tags": tags_data})


@csrf_exempt
@require_http_methods(["POST"])  # Only allow POST requests
def tag_create(request):
    try:
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        target_id = data.get("target_id")
        username = data.get("username")  # Assuming username is passed in the request

        # Get the user object. Adjust or add error handling as necessary.
        user = User.objects.get(username=username)

        # Create and save the new Tag instance
        tag = Tag(target_id=target_id, user=user)
        tag.save()

        # Return a JSON response indicating success
        return JsonResponse(
            {"message": "Tag created successfully", "tag": {"target_id": tag.target_id, "user": tag.user.username}},
            status=201)
    except Exception as e:
        # Return an error message and status code 400 (Bad Request) if something goes wrong
        return JsonResponse({"error": str(e)}, status=400)


def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = UserProfile.objects.get(user=user)
    # For API, you might want to return JsonResponse. Example:
    profile_data = {"username": user.username, "arduino_model": profile.arduino_model, "rfid_model": profile.rfid_model}
    return JsonResponse({"profile": profile_data})
