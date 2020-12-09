import requests
from django.shortcuts import render
from .models import Politician
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializer import *

@api_view(['GET', 'POST'])
def politicians_list(request):
    if request.method == 'GET':
        data = Politician.objects.all()[::1]
        serializer = PoliticianSerializer(data, context={'request': request}, many=True)
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



def get_total_page_numbers():
    response = requests.get("https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
    data = response.json()
    pages = data["pagination"]["pages"]
    return pages

def get_names(request):
    Politician.objects.delete_everything()
    all_names = {}
    for i in range(1, 10):#get_total_page_numbers()): 
        response = requests.get(f"https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page={i}&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
        data = response.json()
        names = data['results']
        for i in range(len(names)):
            try: 
                Politician.objects.get(name = names[i]['name'])
                pass
            except ObjectDoesNotExist:
                name_data = Politician(name = names[i]['name'])
                name_data.save()
        all_names = Politician.objects.all()
        print(all_names)

    return render (request, 'fecapp/index.html', { "nameList": 
    all_names} )





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
#         return render(request, 'fecapp/x.html', {'embed': name_database})
#     else:
#         form = SubmitEmbed()
#     print(serializer.errors)
#     return render(request, 'fecapp/index.html', {'form': name_database})

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
#     template_name = 'fecapp/index.html'
