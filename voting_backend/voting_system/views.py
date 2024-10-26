from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def getPolls(request):
    pass

@api_view(['POST'])
def castVote(request):
    pass