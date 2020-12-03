from rest_framework import serializers
from .models import Politician

class PoliticianSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Politician
        fields = ('firstName', 'lastName')