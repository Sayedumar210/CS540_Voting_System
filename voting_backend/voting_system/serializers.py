from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ['id', 'question', 'creator', 'private', 'invited_voters', 'created_at','expiry_time']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['option_text', 'id']