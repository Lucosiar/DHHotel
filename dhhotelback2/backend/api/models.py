from django.db import models
from django.contrib.auth.hashers import make_password


# Create your models here.

class User(models.Model):
    ROLES = [
        ('admin', 'Administrador'),
        ('superadmin', 'SuperAdmin'), 
        ('client', 'Cliente'),
    ]

    idUser = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=255)
    rol = models.CharField(max_length=10, choices=ROLES)
    last_login = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Asegurarse de que la contraseña esté hasheada antes de guardar
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class Client(models.Model):
    idCliente = models.AutoField(primary_key=True)
    idUserFK = models.ForeignKey(User, on_delete=models.CASCADE, db_column='idUser', related_name='clients')
    lastName = models.CharField(max_length=50)
    phone = models.CharField(max_length=12)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.lastName    

# Habitaciones
class Room(models.Model):
    STATE = [
        ('ocupada', 'Ocupada'),
        ('disponible', 'Disponible'), 
        ('mantenimiento', 'En mantenimiento'),
    ]

    idRoom = models.AutoField(primary_key=True)
    number = models.CharField(max_length=45)
    typeRoom = models.CharField(max_length=45)
    price = models.IntegerField()
    state =  models.CharField(max_length=14, choices=STATE)
    
    class Meta:
        db_table = 'room'

# Reservas
class Booking(models.Model):
    STATE = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'), 
        ('cancelada', 'Cancelada'),
    ]
    
    idBooking = models.AutoField(primary_key=True)
    idClientFK = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='idClientFK')
    idRoomFK = models.ForeignKey(Room, on_delete=models.CASCADE, db_column='idRoomFK')
    startDate = models.DateField()
    endDate = models.DateField()
    state = models.CharField(max_length=10, choices=STATE)

    class Meta:
        db_table = 'booking'

# Pagos
class Payment(models.Model):
    METODO_PAGO = [
        ('efectivo', 'Efectivo'),
        ('tarjeta', 'Tarjeta de Crédito o Débitp'),
    ]

    STATE = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
    ]

    idPayment = models.AutoField(primary_key=True)
    idBooking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    amount = models.IntegerField()
    paymentDate = models.DateField()
    paymentMethod = models.CharField(max_length=8, choices=METODO_PAGO)
    state = models.CharField(max_length=10, choices=STATE)

    class Meta:
        db_table = 'payment'