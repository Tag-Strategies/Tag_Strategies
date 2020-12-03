from django.urls import path, include
from . import views


app_name = 'fecapp'
urlpatterns = [
    path('', views.politician_list, name='politicianList'),
]
