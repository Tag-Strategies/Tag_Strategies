from django.urls import path, include
from . import views


app_name = 'fecapp'
urlpatterns = [
    path('', views.politicians_list, name='politicianList'),
]
