from rest_framework import serializers
from .models import User, Client, Room, Booking, Payment

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("El email ya está en uso.")
        return value

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

    def validate_number(self, value):
        if Room.objects.filter(number=value).exists():
            raise serializers.ValidationError("El número ya está en uso.")
        return value

class PaymentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='idBooking.idClientFK.idUserFK.name', read_only=True)
    client_lastname = serializers.CharField(source='idBooking.idClientFK.lastName', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    idUser = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')
    idRoomFK = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), source='room')
    payment = PaymentSerializer(required=False)

    class Meta:
        model = Booking
        fields = [
            'id', 'startDate', 'endDate', 'state',
            'idUser', 'idRoomFK', 'payment'
        ]
