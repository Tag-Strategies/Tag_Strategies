import requests
import json
from django.core.exceptions import ObjectDoesNotExist
from .models import Politician, Organization
from .serializer import PoliticianSerializer, OrganizationSerializer
from django.shortcuts import get_object_or_404, render


def get_total_page_numbers():
    response = requests.get("https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
    data = response.json()
    pages = data["pagination"]["pages"]
    return pages

def get_names(request):
    Politician.objects.delete_everything()
    for i in range(1, 10): #get_total_page_numbers()): 
        response = requests.get(f"https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page={i}&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
        data = response.json()
        list_of_politicians = data['results']
        for i in range(len(list_of_politicians)):
            # json_formatted_str = json.dumps(data['results'][i]['party'], indent=2)
            # print(json_formatted_str)
            try: 
                Politician.objects.get(name = list_of_politicians[i]['name'])
                pass
            except ObjectDoesNotExist:
                Politician(
                    name = list_of_politicians[i]['name'],
                    party = list_of_politicians[i]['party'],
                    candidate_id = list_of_politicians[i]['candidate_id'],
                    state = list_of_politicians[i]['state'],
                    ).save()
    return render (request, './fec/index.html', { "PoliticianList": 
    Politician.objects.all()} )