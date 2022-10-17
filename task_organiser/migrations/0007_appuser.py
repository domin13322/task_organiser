# Generated by Django 4.0.5 on 2022-10-14 17:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('task_organiser', '0006_alter_task_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppUser',
            fields=[
                ('username', models.CharField(max_length=100, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('friends', models.ManyToManyField(blank=True, null=True, to='task_organiser.appuser')),
            ],
        ),
    ]