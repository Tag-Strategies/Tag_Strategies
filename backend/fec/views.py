import requests
from django.shortcuts import render
from .models import Politician
from django.core.exceptions import ObjectDoesNotExist

def politician_list(request):
    politicians = Politician.objects.all()
    return render(request, 'fecapp/index.html', {'x': politicians})

def get_total_page_numbers():
    response = requests.get("https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
    data = response.json()
    pages = data["pagination"]["pages"]
    return pages

def get_names(request):
    all_names = {}
    for i in range(1, get_total_page_numbers()): 
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

    return render (request, 'fecapp/index.html', { "form": 
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
