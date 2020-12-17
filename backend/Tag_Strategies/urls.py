from django.conf.urls import include, url  # noqa
from django.urls import path, re_path
from django.contrib import admin
from django.shortcuts import redirect
from fec import views
import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/exampleapp/")),
    path("admin/", admin.site.urls, name="admin"),
    # path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
    path("politicians/", include("fec.urls"), name="fecapp"),
    path("populate_database_with_names/", views.get_names),
    re_path(r'^api/politicians/$', views.politicians_list),
    # re_path(r'^api/politicians/([0-9])$', views.politicians_detail),
]
