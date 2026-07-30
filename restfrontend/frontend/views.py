from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

def login_view(request):
    return render(request, 'frontend/login.html')

def register_view(request):
    return render(request, 'frontend/register.html')

def notes_view(request):
    # Check if token exists in localStorage? That's client-side.
    # We'll just render the page; JavaScript will handle redirection.
    return render(request, 'frontend/notes.html')

# Optional: a view to check authentication status (if needed)
def auth_status(request):
    # Not needed because frontend checks token locally.
    pass