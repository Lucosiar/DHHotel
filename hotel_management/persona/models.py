# models.py
from django.db import models
from django.contrib.auth.hashers import make_password, check_password
import hashlib

# Create your models here.
class Client(models.Model):
    idClient = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # Asegúrate de hashearla
    last_login = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'client'
    
    def verificar_contrasena(self, password):
        print("Verificando contraseña en models.py")
        return hashlib.sha256(password.encode()).hexdigest() == self.password


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

class Administrator(models.Model):
    idAdministrator = models.AutoField(primary_key=True) 
    name = models.CharField(max_length=20)
    email = models.EmailField(unique=True, max_length=45)
    password = models.CharField(max_length=256)  # Asegúrate de hashearla
    rol = models.CharField(max_length=20)  # admin, superadmin
    last_login = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'administrator'

    def verificar_contrasena(self, password):
        print("Verificando contraseña en models.py")
        return hashlib.sha256(password.encode()).hexdigest() == self.password


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)