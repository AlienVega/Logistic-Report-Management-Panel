from django.shortcuts import render,redirect
from .models import *
from depolar.models import *
from depolar.forms import *
# Create your views here.

def index(request):
    return render(request,"main.html")

def tablo(request):
    # table_report=WareHouseInputData.objects.all()
    form=WareHauseDataInputForm()
    ware_house_user = request.user.user_warehouse.get()  # veya first() kullanabilirsiniz
    is_ware_house_admin = ware_house_user.is_warehouse_admin

    context={
        "is_ware_house_admin":is_ware_house_admin,
        "form":form
        }
        
    return render(request,"sevkiyat_tablo.html",context)


# def sevkiyat_giris(request):
#     return render(request,"sevkiyat_giris.html")