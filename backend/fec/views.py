import requests
import json
from django.shortcuts import render
from .models import Politician, Organization
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializer import PoliticianSerializer, OrganizationSerializer
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.utils import timezone
from django.views import generic
from .fec_api import *

##########################################Test Functions########################################################

# get_candidate_totals("H8NY15148")
# get_candidate_state_totals("H8NY15148")
# get_electioneering_by_candidate("H8NY15148")
# get_candidate_committees_by_cycle("H8NY15148", 2020)
# get_committee_info("C00608398")
# get_committees("S4LA00065")
# get_committee_reports("C00608398")
# get_presidential_elections('2020')
# get_committee_totals("C00639591")
# get_upcoming_elections()
# get_committee_contributors("C00639591")
# get_candidate_summary()
# get_candidate_top_doner_industries()
# get_social_media_account()
# get_candidate_donations_by_state('H8NY15148')
# get_committee_contributions_by_zip("C00639591")
# get_representatives_by_coordinates("38.8356262" ,"-77.0528889")

##################################################################################################

@api_view(['GET'])
def representatives_by_coordinates(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    data = get_representatives_by_coordinates(lat, lon)
    return Response(data)
# 
################################################################################################
@api_view(['GET'])
def committee_list(request):
    filter = request.GET.get('filter')
    print(filter)
    data = get_candidate_committees(f"{filter}")
    return Response(data)
# 
################################################################################################

@api_view(['GET', 'POST'])
def politicians_list(request):
    filter = request.GET.get('filter')
    print(filter)
    if request.method == 'GET':
        data = Politician.objects.filter(name__icontains=f"{filter}")
        serializer = PoliticianSerializer(data, context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PoliticianSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def politicians_detail(request, pk):
    try:
        politician = Politician.objects.get(pk=pk)
    except Politician.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = PoliticianSerializer(politician, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        politician.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##################################################################################################

def view_names(request):
    return render (request, './fec/index.html', { "PoliticianList": 
    Politician.objects.all()} )

##################################################################################################

@api_view(['GET', 'POST'])
def organizations_list(request):
    # filter = request.GET.get('filter')
    # print(filter)
    if request.method == 'GET':
        data = Organization.objects.all()
        serializer = OrganizationSerializer(data, context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def organizations_detail(request, pk):
    try:
        organization = Organization.objects.get(pk=pk)
    except Organization.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = OrganizationSerializer(organization, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        organization.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##################################################################################################


