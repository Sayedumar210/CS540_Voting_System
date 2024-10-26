from django.urls import path
from . import views

urlpatterns = [
    path('getpolls', views.getPolls, name='getpolls'),
    path('castvote', views.castVote, name='castvote'),
]