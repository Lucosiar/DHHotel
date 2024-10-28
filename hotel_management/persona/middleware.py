# middleware.py
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.utils.deprecation import MiddlewareMixin

class LoginRequiredMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Verificar si el usuario está autenticado
        if not request.user.is_authenticated:
            # No redirigir si está en la página de login
            if request.path != reverse('login'):
                return redirect('login')  # Cambia 'login' si el nombre de tu URL es diferente
