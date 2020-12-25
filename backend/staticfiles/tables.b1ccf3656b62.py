import django_tables2 as tables
from .models import Politician

class PoliticianTable(tables.Table):
    class Meta:
        model = Politician
