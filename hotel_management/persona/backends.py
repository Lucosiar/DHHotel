#backends.py
from django.contrib.auth.backends import ModelBackend
from .models import Administrator, Client

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        # Intentar autenticar como Administrador
        try:
            admin = Administrator.objects.get(email=email)
            if admin.verificar_contrasena(password):
                return admin
        except Administrator.DoesNotExist:
            pass  # Si no es administrador, continuar con la búsqueda de cliente

        # Intentar autenticar como Cliente
        try:
            client = Client.objects.get(email=email)
            if client.verificar_contrasena(password):
                return client
        except Client.DoesNotExist:
            return None  # Si no se encuentra ni un Administrador ni un Cliente

    def get_user(self, user_id):
        try:
            return Administrator.objects.get(pk=user_id)
        except Administrator.DoesNotExist:
            try:
                return Client.objects.get(pk=user_id)
            except Client.DoesNotExist:
                return None
