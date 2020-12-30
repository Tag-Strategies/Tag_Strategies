import requests
import re
import json
from django.core.exceptions import ObjectDoesNotExist
from .models import Politician, Organization
from .serializer import PoliticianSerializer, OrganizationSerializer
from django.shortcuts import get_object_or_404, render


################## Populates our name database ##########################

def get_names(request):
    Politician.objects.delete_everything()
    response = requests.get(f"https://api.open.fec.gov/v1/candidates/?api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page={i}&sort=name&per_page=100&sort_nulls_last=false&sort_null_only=false&sort_hide_null=false")
    for i in range(1, get_total_page_numbers(response)): 
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


################## FEC.gov API #############################

def get_total_page_numbers(response):
    data = response.json()
    pages = data["pagination"]["pages"]
    return pages


def format(results, pages):
    for i in range(len(results)):
        print(f"\n################# Item:{i+1} of {len(results)} on page x of {pages} ##################\n") 
        for key, value in results[i].items():
            if type(value) == type(1) or type(value) == type(1.1):
                if value == 0.0:
                    print(key, ' : ', "\x1b[91m" + str(value) + "\x1b[0m")
                else:
                    print(key, ' : ', "\x1b[92m" + str(value) + "\x1b[0m")
            elif key == 'candidate_name' or key == 'committee_name':
                print(key, ' : ', "\x1b[31m" + str(value) + "\x1b[0m")
            elif key == 'candidate_id' or key == 'committee_id':
                print(key, ' : ', "\x1b[95m" + str(value) + "\x1b[0m")
            elif key == 'coverage_end_date':
                print(key, ' : ', "\x1b[44;96m" + str(value) + "\x1b[0m")
            else:
                print(key, ' : ', value)        


def get_candidate_totals(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/candidate/{candidate_id}/totals/?sort_nulls_last=false&sort_null_only=false&sort=-cycle&sort_hide_null=false&page=1&per_page=100&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_candidate_state_totals(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/schedules/schedule_a/by_state/by_candidate/?sort_nulls_last=false&candidate_id={candidate_id}&cycle=2020&sort_null_only=false&election_full=true&sort_hide_null=false&page=1&per_page=100&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_electioneering_by_candidate(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/electioneering/totals/by_candidate/?sort_nulls_last=false&candidate_id={candidate_id}&sort_null_only=false&election_full=true&sort_hide_null=false&page=1&per_page=100&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_candidate_committees(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/candidate/{candidate_id}/committees/?sort_nulls_last=false&sort_null_only=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&sort=name&sort_hide_null=false&page=1&per_page=100")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages) 
    return results       


def get_candidate_committees_by_cycle(candidate_id, cycle):
    response = requests.get(f"https://api.open.fec.gov/v1/candidate/{candidate_id}/committees/history/{cycle}/?sort_nulls_last=false&sort_null_only=false&election_full=true&sort=-cycle&sort_hide_null=false&page=1&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&per_page=100")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        

            
def get_committee_info(committee_id):
    response = requests.get(f"https://api.open.fec.gov/v1/committee/{committee_id}/?sort_nulls_last=false&sort_null_only=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&sort=-coverage_end_date&sort_hide_null=false&page=1&per_page=100")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_committees(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/committees/?sort_null_only=false&sort=last_file_date&sort_hide_null=false&page=1&per_page=100&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&sort_nulls_last=false&candidate_id={candidate_id}")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_committee_reports(committee_id):
    response = requests.get(f"https://api.open.fec.gov/v1/committee/{committee_id}/reports/?sort_null_only=false&sort=coverage_end_date&sort_hide_null=false&page=1&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&sort_nulls_last=false&per_page=100")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)    

def get_committee_totals(committee_id):
    response = requests.get(f"https://api.open.fec.gov/v1/committee/{committee_id}/totals/?sort_hide_null=false&sort=-cycle&per_page=100&sort_null_only=false&page=1&sort_nulls_last=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)        


def get_presidential_elections(year):
    response = requests.get(f"https://api.open.fec.gov/v1/elections/?sort_nulls_last=false&office=president&cycle={year}&sort_null_only=false&election_full=true&sort=-total_receipts&sort_hide_null=false&page=1&per_page=100&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages)  

def get_committee_contributors(committee_id):
    response = requests.get(f"https://api.open.fec.gov/v1/schedules/schedule_a/?sort_hide_null=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&per_page=100&committee_id={committee_id}&sort_null_only=false&sort=-contribution_receipt_date")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages) 

def get_committee_contributions_by_zip(committee_id):
    response = requests.get(f"https://api.open.fec.gov/v1/schedules/schedule_a/by_zip/?per_page=100&sort_null_only=false&cycle=2020&sort_nulls_last=false&sort_hide_null=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&committee_id={committee_id}")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages) 

def get_candidate_donations_by_state(candidate_id):
    response = requests.get(f"https://api.open.fec.gov/v1/schedules/schedule_a/by_state/by_candidate/?per_page=100&sort_null_only=false&sort_nulls_last=false&cycle=2020&candidate_id={candidate_id}&sort_hide_null=false&api_key=2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K&page=1&election_full=true")
    data = response.json()
    results = data["results"]
    pages = get_total_page_numbers(response)
    format(results, pages) 

################## Google Civics API #############################

def get_upcoming_elections():
    response = requests.get(f"https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyCDwFDZA_9OmHMfdPotbpccgxlXbu7e1fY")
    data = response.json()
    results = data['elections']
    format(results,1)        

################## open secrets API #############################

def get_candidate_summary():
    response = requests.get(f"http://www.opensecrets.org/api/?method=candSummary&cid=N00007360&cycle=2020&output=json&apikey=6399fd652fa8df140c54b474640bf612")
    data = response.json()
    # print(data)
    results = data['response']['summary']#['@attributes']
    # print(results)
    for key, value in results.items():
        print(key, ' : ', value) 

def get_candidate_top_doner_industries():
    response = requests.get(f"https://www.opensecrets.org/api/?method=candIndustry&cid=N00007360&cycle=2020&output=json&apikey=6399fd652fa8df140c54b474640bf612")
    data = response.json()
    industry_list = [{}]
    results = data['response']['industries']['industry']
    for i in range(len(results)):
        industry_list[0][results[i]['@attributes']["industry_name"]] = results[i]['@attributes']["total"]
    format(industry_list, 1)

################## GSA API #############################

def get_social_media_account():
    response = requests.get(f"https://api.gsa.gov/technology/digital-registry/v1/social_media?q=trump&api_key=6XG5Ljq3F7tw8CYcm00NA6av5d3ekXx1P0QMxsyK")
    data = response.json()
    # print(data)
    results = data['results']
    format(results, 1)




# open secrets     6399fd652fa8df140c54b474640bf612
# fec              2c0rL4Z709iNErb0gLygJu3UhNjSi7VGPdIWoe1K
# google civics    AIzaSyCDwFDZA_9OmHMfdPotbpccgxlXbu7e1fY
# gsa.gov          6XG5Ljq3F7tw8CYcm00NA6av5d3ekXx1P0QMxsyK