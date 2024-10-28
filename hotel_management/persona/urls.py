#urls.py

from django.urls import path
from .views import home_admin, home_cliente, login_view, signup_administrator, signup_client, home_principal

urlpatterns = [
    path('', home_principal, name='homePrincipal'),
    path('signup_administrator/', signup_administrator, name='signup_administrator'),
    path('signup_client/', signup_client, name='signup_client'),
    path('login/', login_view, name='login'),
    path('homeAdmin/', home_admin, name='homeAdmin'),
    path('homeCliente/', home_cliente, name='homeCliente'),
]
