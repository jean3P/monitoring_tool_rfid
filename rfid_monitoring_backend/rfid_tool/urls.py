from django.urls import path
from . import views

API_VERSION = '1.0'

urlpatterns = [
    path(f'{API_VERSION}/tags/', views.tag_list, name='tag_list'),
    path(f'{API_VERSION}/tags/create/', views.tag_create, name='tag_create'),
    path(f'{API_VERSION}/user/<str:username>/', views.user_profile, name='user_profile'),
]
