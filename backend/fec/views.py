from django.shortcuts import render
from django.views.generic import ListView
from .models import Politician
from rest_framework import viewsets
from .serializer import PoliticianSerializer
from .models import Politician


class PoliticianViewSet(viewsets.ModelViewSet):
    queryset = Politician.objects.all().order_by('name')
    serializer_class = PoliticianSerializer

class PoliticianListView(ListView):
    model = Politician
    template_name = 'fecapp/index.html'

def politician_list(request):
    politicians = Politician.objects.all()
    return render(request, 'fecapp/index.html', {'politicians': politicians})