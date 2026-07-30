from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # API URLs
   # path("api/", include("notes.urls")),

    # Frontend URLs
    path("", include("frontendapp.urls")),
]