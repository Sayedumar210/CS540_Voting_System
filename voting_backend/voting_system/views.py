from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import *
from django.contrib.auth import get_user_model
from django.db.models import Q
from .serializers import *
from django.utils import timezone

User = get_user_model()

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPolls(request):
    user = request.user
    print(timezone.localtime())
    polls = Poll.objects.filter( ~Q(creator=user) & (Q(private=False) | Q(invited_voters=user) | Q(expiry_time__gt=timezone.localtime())))
    serializer = PollSerializer(polls, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPoll(request):
    question = request.data['poll']['question']
    creator = request.user
    private = request.data['poll']['private']
    expiry_time = request.data['poll']['expiry_time']
    poll = Poll( question=question, creator=creator, expiry_time=expiry_time, private=private)
    poll.save()
    email_not_found = []
    if private:
        for email in request.data['poll']['invited_users']:
            try:
                user = User.objects.filter(email=email).first()
            except:
                email_not_found.append(email)
                continue
            poll.invited_voters.add(user)
    response = {
        'detail':'poll created'
    }
    if len(email_not_found):
        response['users_not_found'] = email_not_found
    
    for op_text in request.data['poll']['options']:
        option = Option.objects.create(option_text=op_text, poll = poll)
        option.save()
    
    return Response(response, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def castVote(request):
    poll_id = request.data['poll_id']
    poll = Poll.objects.get(id=poll_id)
    user = request.user
    print('poll', poll.expiry_time)
    print('timezone', timezone.localtime())
    if ( poll.invited_voters.filter(id=user.id).exists() or not poll.private) and poll.expiry_time > timezone.localtime():
        option_id = request.data['option_id']
        option = Option.objects.get(id=option_id)
        vote, created = Vote.objects.get_or_create(poll = poll, option = option, voter = user)
        if created:
            option.votes+=1
            option.save()
            vote.save()
            return Response({'detail':'Vote Casted'}, status=status.HTTP_202_ACCEPTED)
        return Response({'detail':'Already Voted'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    return Response({'detail':'Cannot cast vote'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def polldetail(request, poll_id):
    poll = Poll.objects.get(id=poll_id)
    user = request.user
    if (poll.creator == user or poll.invited_voters.filter(id=user.id).exists() or not poll.private) and poll.expiry_time > timezone.localtime():
        options = Option.objects.filter(poll=poll)
        serializer1 = OptionSerializer(options, many=True)
        serializer2 = PollSerializer(poll)
        return Response({"poll":serializer2.data, "options":serializer1.data}, status=status.HTTP_200_OK)


    return Response({'detail':"Cannot access the poll"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mypolls(request):
    polls = Poll.objects.filter(Q(creator=request.user))
    serializer = PollSerializer(polls, many=True)
    serializer = PollSerializer(polls, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)