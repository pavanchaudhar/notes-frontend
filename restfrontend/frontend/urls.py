from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('notes/', views.notes_view, name='notes'),
    path('', views.notes_view),  # redirect root to notes
]