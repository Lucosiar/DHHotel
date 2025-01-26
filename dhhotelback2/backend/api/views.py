from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .models import Room, Booking, Payment, Client, User
from .serializers import RoomSerializer, BookingSerializer, PaymentSerializer, ClientSerializer, UserSerializer


################
### Personas ###
################
# /users/
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def get_all_users(self, request):
        users = User.objects.all()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    # POST users/create_user/
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def create_user(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user.rol == 'client':
                client_data = {
                    'idUserFK': user.idUser,
                    'lastName': request.data.get('lastName'),
                    'phone': request.data.get('phone'),
                    'city': request.data.get('city'),
                    'state': request.data.get('state'),
                    'country': request.data.get('country')
                }
                client_serializer = ClientSerializer(data=client_data)
                if client_serializer.is_valid():
                    client_serializer.save()
                else:
                    return Response(client_serializer.errors, status=400)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # DELETE users/<id>/
    @action(detail=True, methods=['delete'])
    def delete_user(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response(status=204)

    # PUT users/<id>/
    @action(detail=True, methods=['put'])
    def update_user(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # GET users/clients/
    @action(detail=False, methods=['get'])
    def clients(self, request):
        clients = User.objects.filter(rol='client')  # Filtrar por rol
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)

## /clients/
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    @action(detail=False, methods=['get'])
    def get_all_clients(self, request):
        clients = Client.objects.all()
        serializer = self.get_serializer(clients, many=True)
        return Response(serializer.data)

    # POST clients/create_client/
    @action(detail=True, methods=['post'])
    def create_client(self, request, pk=None):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # DELETE clients/<id>/
    @action(detail=True, methods=['delete'])
    def delete_client(self, request, pk=None):
        client = self.get_object()
        client.delete()
        return Response(status=204)

    # PUT clients/<id>/
    @action(detail=True, methods=['put'])
    def update_client(self, request, pk=None):
        client = self.get_object()
        serializer = self.get_serializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

#############
### Login ###
#############
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        print(f'Request data: {request.data}')  # Depuración
        print(f'Email: {email}, Password: {password}')  # Depuración
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                user_serializer = UserSerializer(user)
                return Response({'userRole': user.rol, 'user': user_serializer.data})
            else:
                return Response({'error': 'Credenciales inválidas'}, status=400)
        except User.DoesNotExist:
            return Response({'error': 'Credenciales inválidas'}, status=400)

####################
### Habitaciones ###
####################
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    # POST rooms/create_room/
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def create_room(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            room = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE rooms/<id>/
    @action(detail=True, methods=['delete'])
    def delete_room(self, request, pk=None):
        room = self.get_object()
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT rooms/<id>/
    @action(detail=True, methods=['put'])
    def update_room(self, request, pk=None):
        room = self.get_object()
        serializer = self.get_serializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

################
### Reservas ###
################
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=False, methods=['get'])
    def today(self, request):
        today = timezone.now().date()
        bookings = Booking.objects.filter(startDate=today)
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

    # POST bookings/create_booking/
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def create_booking(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            booking = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE bookings/<id>/
    @action(detail=True, methods=['delete'])
    def delete_booking(self, request, pk=None):
        booking = self.get_object()
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT bookings/<id>/
    @action(detail=True, methods=['put'])
    def update_booking(self, request, pk=None):
        booking = self.get_object()
        serializer = self.get_serializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#############
### Pagos ###
#############
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    # POST payments/create_payment/
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE payments/<id>/
    @action(detail=True, methods=['delete'])
    def delete_payment(self, request, pk=None):
        payment = self.get_object()
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT payments/<id>/
    @action(detail=True, methods=['put'])
    def update_payment(self, request, pk=None):
        payment = self.get_object()
        serializer = self.get_serializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





