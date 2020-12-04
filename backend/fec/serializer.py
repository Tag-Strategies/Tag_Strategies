from rest_framework import serializers
from .models import Politician

class PoliticianSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Politician
        fields = '__all__'