# views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import ClientForm, AdministratorForm
from django.utils import timezone
from .models import Administrator, Client
from django.contrib.auth.hashers import make_password
import hashlib

def login_view(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        print(f"Email: {email}, Contraseña: {password}")

        print(f'Contraseña sin hashear: {password}')  
        print(f'Contraseña hasheada: {hashlib.sha256(password.encode()).hexdigest()}') 

        try:
            admin = Administrator.objects.get(email=email)
            print(f"Contraseña hasheada en la base de datos: {admin.password}")  # Depuración

            # Comprobación directa
            if admin.verificar_contrasena(password):
                print("Contraseña correcta")
                admin.last_login = timezone.now()
                admin.save(update_fields=['last_login'])
                return redirect('homeAdmin')
            else:
                print("Contraseña incorrecta")
                error_message = "Credenciales inválidas."
        except Administrator.DoesNotExist:
            try:
                client = Client.objects.get(email=email)
                print(f"Contraseña hasheada en la base de datos: {client.password}")

                if client.verificar_contrasena(password):
                    print("Contraseña correcta")
                    client.last_login = timezone.now()
                    client.save(update_fields=['last_login'])
                    return redirect('homeCliente')
                else:
                    print("Contraseña incorrecta")
                    error_message = "Credenciales inválidas para cliente."
            except Client.DoesNotExist:
                error_message = "Credenciales inválidas para cliente."
                print("Credenciales inválidas para cliente.")

        return render(request, 'registration/login.html', {'error': error_message})

    return render(request, 'registration/login.html')


def signup_administrator(request):
    if request.method == 'POST':
        print("Accediendo al formulario de registro")
        form = AdministratorForm(request.POST)
        if form.is_valid():
            administrator = form.save()  # Llama a save() sin commit=False, ya que el método ya lo maneja
            print(f"Registro exitoso para {administrator.email}")
            return redirect('login')  # Redirige tras el registro exitoso
        else:
            print(form.errors)  # Imprime errores para depuración
    else:
        form = AdministratorForm()
    return render(request, 'registration/signupAdministrator.html', {'form': form})


def signup_client(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirige a la página de inicio de sesión
    else:
        form = ClientForm()
    return render(request, 'registration/signupClient.html', {'form': form})

    
def home_admin(request):
    return render(request, 'homeAdmin.html')

def home_cliente(request):
    return render(request, 'homeCliente.html')

def home_principal(request):
    return render(request, 'homePrincipal.html')