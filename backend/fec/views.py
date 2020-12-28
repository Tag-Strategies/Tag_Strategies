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

##################################################################################################
# get_candidate_totals("H8NY15148")
# get_candidate_state_totals("H8NY15148")
# get_electioneering_by_candidate("H8NY15148")
# get_candidate_committees("H8NY15148")
# get_candidate_committees_by_cycle("H8NY15148", 2020)
# get_committee_info("C00608398")
# get_committees("S4LA00065")
get_committee_reports("C00608398")
# get_presidential_elections('2020')
# get_committee_totals("C00639591")
# get_upcoming_elections()
# get_committee_contributors("C00639591")
# get_candidate_summary()
# get_candidate_top_doner_industries()
get_social_media_account()

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

# def get_total_page_numbers():
#     response = requests.get("https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
#     data = response.json()
#     pages = data["pagination"]["pages"]
#     return pages

# def get_names(request):
#     Politician.objects.delete_everything()
#     for i in range(1, get_total_page_numbers()): 
#         response = requests.get(f"https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page={i}&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
#         data = response.json()
#         list_of_politicians = data['results']
#         for i in range(len(list_of_politicians)):
#             json_formatted_str = json.dumps(data['results'][i]['party'], indent=2)
#             print(json_formatted_str)
#             try: 
#                 Politician.objects.get(name = list_of_politicians[i]['name'])
#                 pass
#             except ObjectDoesNotExist:
#                 Politician(name = list_of_politicians[i]['name'], party = list_of_politicians[i]['party']).save()
#     return render (request, './fec/index.html', { "PoliticianList": 
#     Politician.objects.all()} )

# def view_names(request):
#     return render (request, './fec/index.html', { "PoliticianList": 
#     Politician.objects.all()} )






######################### CODE SCRAPS ####################################
# from django.views.generic import ListView
# from rest_framework import viewsets
# from .serializer import PoliticianSerializer
# from .models import Politician
# from django.conf import settings
# from .forms import SubmitEmbed
# def save_embed(request):
#     name_database={}
#     if True:
#         form = SubmitEmbed(request.POST)
#         if True:
#             #url = form.cleaned_data['url']
#             r = requests.get("https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
#             json = r.json()
#             #print(json["pagination"]["pages"])
#     for j in range(1, 5, json["pagination"]["pages"]):
#         d = requests.get(f"https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page={j}&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
#         other_json = d.json()
#         for i in range(1, len(other_json['results'])):
#             #print(other_json['results'][i]['name'])
#             name_database.append(other_json['results'][i]['name'])
#     print(name_database)
#     serializer = PoliticianSerializer(data=name_database)
#     if serializer.is_valid():
#         print("here")
#         embed = serializer.save()
#         #print(embed)
#         return render(request, '../fec/x.html', {'embed': name_database})
#     else:
#         form = SubmitEmbed()
#     print(serializer.errors)
#     return render(request, './fec/index.html', {'form': name_database})

    #     for i in meals:
    #         meal_data = Meal(
    #             name = i['strMeal'],
    #             category = i['strCategory'],
    #             instructions = i['strInstructions'],
    #             region = i['strArea'],
    #             slug = i['idMeal'],
    #             image_url = i['strMealThumb']
    #         )
    #         meal_data.save()
    #         all_meals = Meal.objects.all().order_by('-id')

# class PoliticianViewSet(viewsets.ModelViewSet):
#     queryset = Politician.objects.all().order_by('name')
#     serializer_class = PoliticianSerializer

# class PoliticianListView(ListView):
#     model = Politician
#     template_name = './fec/index.html'
