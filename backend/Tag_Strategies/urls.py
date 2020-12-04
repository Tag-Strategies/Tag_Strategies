from django.conf.urls import include, url  # noqa
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect
from fec.views import get_names
import django_js_reverse.views


urlpatterns = [
    path("", lambda request : redirect("/exampleapp/")),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path("exampleapp/", include("exampleapp.urls"), name="exampleapp"),
    path("politicians/", include("fec.urls"), name="fecapp"),
    path("p/", get_names),
]
