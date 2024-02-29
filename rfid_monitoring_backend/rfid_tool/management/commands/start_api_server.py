import os
import sys
import signal
import logging
from django.core.management.base import BaseCommand
from uvicorn import Config, Server

# logger = logging.getLogger(__name__)
API_PORT = 8000
API_IP = '127.0.0.1'


class Command(BaseCommand):
    help = 'Starts the ASGI server.'

    def add_arguments(self, parser):
        parser.add_argument('--addr', default=API_IP, type=str, help='IP address to bind to')
        parser.add_argument('--port', default=API_PORT, type=int, help='Port number to listen on')

    def handle(self, *args, **kwargs):
        addr = kwargs['addr']
        port = kwargs['port']
        self.start_asgi_server(addr, port)

    def start_asgi_server(self, addr, port):
        config = Config("rfid_monitoring_backend.asgi:application", host=addr, port=port, log_level="info")
        server = Server(config)
        server.run()
