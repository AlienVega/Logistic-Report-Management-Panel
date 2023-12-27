from django.shortcuts import render,redirect
from .models import *
from depolar.models import *
from depolar.forms import *
# Create your views here.

def index(request):
    return render(request,"main.html")




# def sevkiyat_giris(request):
#     return render(request,"sevkiyat_giris.html")