from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('calendar', views.calendar, name='calendar'),
    path('messages', views.messages, name='messages'),
    path('login', views.login_page, name='login'),
    path('register', views.register_page, name='register'),
    path('home_redirect', views.home_redirect, name='home_redirect'),
    path('edit_task/<str:task_id>', views.edit_task, name='edit_task'),
    path('logout', views.logout_page, name='logout'),
    path('userProfile', views.user_profile, name='userProfile'),
    path('userProfileRedirect', views.user_profile_redirect, name='userProfileRedirect'),
]
