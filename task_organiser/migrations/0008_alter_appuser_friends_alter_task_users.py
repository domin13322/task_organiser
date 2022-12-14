# Generated by Django 4.0.5 on 2022-10-14 17:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('task_organiser', '0007_appuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='friends',
            field=models.ManyToManyField(blank=True, to='task_organiser.appuser'),
        ),
        migrations.AlterField(
            model_name='task',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
