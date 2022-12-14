# Generated by Django 4.0.5 on 2022-10-16 09:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('task_organiser', '0008_alter_appuser_friends_alter_task_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=1000, null=True)),
                ('date_sent', models.DateTimeField(auto_now_add=True, null=True)),
                ('type', models.CharField(choices=[('fr', 'friend_request'), ('reg', 'regular'), ('gr', 'group_request')], default='regular', max_length=20, null=True)),
                ('reciever', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reciever', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FriendsGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=40, null=True)),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
