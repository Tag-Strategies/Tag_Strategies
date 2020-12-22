from rest_framework import serializers
from .models import Politician, Organization

class PoliticianSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Politician
        fields = ('pk', 'name', 'party', 'candidate_id')


class OrganizationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Organization
        fields = ('pk', 'name')