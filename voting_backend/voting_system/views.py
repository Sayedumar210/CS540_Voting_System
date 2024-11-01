from django.shortcuts import render
from rest_framework.decorators import api_view
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
def getPolls(request):
    user = request.user
    polls = Poll.objects.filter(Q(creator=user) | Q(private=False) | Q(invited_voters = user) | Q(expiry_time__gt = timezone.now()))
    serializer = PollSerializer(data = polls, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def createPoll(request):
    question = request.data['poll']['question']
    creator = request.user
    private = request.data['poll']['private']
    expiry_time = request.data['poll']['expiry_time']
    poll = Poll.objects.create(question=question)
    poll.creator = creator
    poll.expiry_time = expiry_time
    poll.private = private
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
        option = Option.objects.create(option_text=op_text)
        option.poll = poll
    
    return Response(response, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def castVote(request):
    poll_id = request.data['poll_id']
    poll = Poll.objects.get(id=poll_id)
    user = request.user
    if user and (poll.creator == user or poll.invited_voters.filter(id=user.id).exists() or not poll.private) and poll.expiry_time < timezone.now():
        option_id = request.data['opyion_id']
        option = Option.objects.get(id=option_id)
        vote, created = Vote.objects.get_or_create(poll = poll, option = option, voter = user)
        if created:
            option.votes+=1
            option.save()
            vote.save()
            return Response({'detail':'Vote Casted'}, status=status.HTTP_202_ACCEPTED)
        return Response({'detail':'already voted'},status=status.HTTP_304_NOT_MODIFIED)
    return Response({'detail':'Cannot cast vote'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def polldetail(request, poll_id):
    poll = Poll.objects.get(id=poll_id)
    user = request.user
    if user and (poll.creator == user or poll.invited_voters.filter(id=user.id).exists() or not poll.private) and poll.expiry_time < timezone.now():
        options = Option.objects.filter(poll=poll)
        serializer1 = OptionSerializer(options, many=True)
        serializer2 = PollSerializer(poll)
        return Response({"poll":serializer1.data, "options":serializer2.data}, status=status.HTTP_200_OK)


    return Response({'detail':"Cannot access the poll"}, status=status.HTTP_401_UNAUTHORIZED)