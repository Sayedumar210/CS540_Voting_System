from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import status


User = get_user_model()

# Create your views here.

@api_view(['POST'])
def signup(request):
    user, created = User.objects.get_or_create(email=request.data['email'])
    if created:
        user.set_password(request.data['password'])
        user.dob = request.data['dob']
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.save()
        refresh = RefreshToken.for_user(user=user)
        access = AccessToken.for_user(user=user)
        response_data = {
            'detail': 'User Created',
            'tokens':{'access':str(access), 'refresh':str(refresh)}
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'detail':'user already exists with email'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serializer = UserSerializer(instance=user)
    return Response(serializer.data, status=status.HTTP_200_OK)

