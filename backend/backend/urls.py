from django.conf.urls import include, url  # noqa
from django.urls import path, re_path
from django.contrib import admin
from django.shortcuts import redirect
from fec import views

# import django_js_reverse.views
# from fec.resources import OrganizationResource

# organization_resource = OrganizationResource()

urlpatterns = [
    path("", lambda request : redirect("/admin/")),
    path("admin/", admin.site.urls, name="admin"),
    path("politicians/", views.view_names),
    path("populate_database_with_names/", views.get_names),
    re_path(r'^api/politicians/$', views.politicians_list),
    re_path(r'^api/politicians/committees', views.committee_list),
    re_path(r'^api/politicians/representative', views.representatives_by_coordinates),
    re_path(r'^api/organizations/$', views.organizations_list),
    # url(r'^zpi/', include(organization_resource.urls)),
    # path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    # path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
    # re_path(r'^api/politicians/([0-9])$', views.politicians_detail),
]
