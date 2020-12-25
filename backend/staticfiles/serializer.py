from rest_framework import serializers
from .models import Politician, Organization

class PoliticianSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Politician
        fields = ('__all__')


class OrganizationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Organization
        fields = ('__all__')