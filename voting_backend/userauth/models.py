from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .manager import NewUserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    dob = models.DateField(null=True)
    first_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = NewUserManager()

    def __str__(self):
        return self.email
