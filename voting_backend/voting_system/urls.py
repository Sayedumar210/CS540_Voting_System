from django.urls import path
from . import views

urlpatterns = [
    path('getpolls/', views.getPolls, name='getpolls'),
    path('castvote/', views.castVote, name='castvote'),  # Added trailing slash
    path('createpoll/', views.createPoll, name='createpoll'),
    path('poll/<int:poll_id>/', views.polldetail, name='polldetail'),
    path('mypolls/', views.mypolls, name='mypolls'),
]
