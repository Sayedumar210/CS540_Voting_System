# Generated by Django 5.1.2 on 2024-10-31 11:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting_system', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='vote',
            old_name='user',
            new_name='voter',
        ),
        migrations.AddField(
            model_name='poll',
            name='expiry_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together={('voter', 'poll', 'option')},
        ),
    ]
