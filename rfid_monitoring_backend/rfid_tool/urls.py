from django.urls import path

from rfid_tool.views import get_arduino_data_by_id

API_VERSION = '1.0'

urlpatterns = [
    path(f'{API_VERSION}/arduino-data/<int:id>/', get_arduino_data_by_id, name='get_arduino_data_by_id'),
]
