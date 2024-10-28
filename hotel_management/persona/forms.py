# forms.py
from django import forms
from .models import Administrator, Client
from django.contrib.auth.hashers import make_password, check_password
import hashlib

class AdministratorForm(forms.ModelForm):
    class Meta:
        model = Administrator 
        fields = ['name', 'email', 'password', 'rol']
        
    def save(self, commit=True):
        hashed_password = hashlib.sha256(self.cleaned_data['password'].encode()).hexdigest()
        print(f'Contraseña hasheada en el formulario: {hashed_password}')
        usuario = super().save(commit=False)
        usuario.password = hashed_password
        print(f'Contraseña hasheada en el formulario 2: {usuario.password}')
        usuario.save()
        return usuario

class ClientForm(forms.ModelForm):
    class Meta:
        model = Client  
        fields = ['name', 'lastName', 'email', 'password', 'phone']

    def save(self, commit=True):
        hashed_password = hashlib.sha256(self.cleaned_data['password'].encode()).hexdigest()
        print(f'Contraseña hasheada en el formulario: {hashed_password}')
        usuario = super().save(commit=False)
        usuario.password = hashed_password
        print(f'Contraseña hasheada en el formulario 2: {usuario.password}')
        usuario.save()
        return usuario
