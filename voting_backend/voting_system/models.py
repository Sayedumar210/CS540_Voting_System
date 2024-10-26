from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Poll(models.Model):
    question = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    private = models.BooleanField()
    invited_voters = models.ManyToManyField(User, related_name='invited_polls')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class Option(models.Model):
    poll = models.ForeignKey(Poll, related_name='options', on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.option_text

class vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'poll')