from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rfid_tool.models import ArduinoData


def get_arduino_data_by_id(request, id):
    # Fetch the ArduinoData instance by ID or return a 404 error if not found
    arduino_data = get_object_or_404(ArduinoData, id=id)

    # Prepare the data to be returned
    data = {
        'id': arduino_data.id,
        'rfid_uid': arduino_data.rfid_uid,
        'model': arduino_data.model,
        'created_at': arduino_data.created_at.isoformat(),
    }

    # Return the data as JSON
    return JsonResponse(data)

