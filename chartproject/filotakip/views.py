from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.decorators import login_required
# Create your views here.
from depolar.models import *
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib import messages
from .forms import *
# class FiloDataEntryView(View):
    
#     def get(self, request):
#         if request.user.user_warehouse.is_warehouse_admin:
#             return redirect("depolar:adminpanel")
#         else:         
#             if hasattr(request.user, 'user_warehouse'):
#                 userwarehouse = WareHouseUser.objects.get(user=request.user).ware_house
#                 context={
#                         "userwarehouse":userwarehouse,
#                     }  
#                 return render(request,"filotakip/filotakipverigiris.html", context)
#             else:
#                     return HttpResponse('depo atamanız yapılmadı')
    
#     def post(self, request):
#         print(request.POST)
#         depo = request.user.user_warehouse.ware_house
#         filolar = depo.warehouse_fleets.all()
#         filo_data = []

#         print(filolar)
#         return HttpResponse(status=200)


class FiloTakipVeriGiris(View):   
    @method_decorator(login_required)
    def get(self,request):
            if request.user.user_warehouse.is_warehouse_admin:
                return redirect("depolar:adminpanel")
            else:         
                if hasattr(request.user, 'user_warehouse'):
                    userwarehouse = WareHouseUser.objects.get(user=request.user).ware_house
                    form = VeriGirisiForm() 
                    context={
                        "form":form,
                        "userwarehouse":userwarehouse,
                    }  
                    return render(request,"filotakip/filotakipverigiris.html", context)
                else:
                    return HttpResponse('depo atamanız yapılmadı')
    
    @method_decorator(login_required)  # Post fonksiyonu için de login kontrolü
    def post(self, request):
        
        form=VeriGirisiForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.user = request.user
            ware_house_user = request.user.user_warehouse
            instance.ware_house = ware_house_user.ware_house
            # instance.sezon = form.cleaned_data['mevcut'] 
            instance.save()
                
            messages.success(request, "Kayıt başarıyla yapıldı.")  # Başarılı kayıt uyarısı
            form = VeriGirisiForm()  # Tüm giriş alanlarını boşaltmak için yeni bir form oluşturun
        else:
            messages.error(request, "Kayıt başarısız.")   
        context={
            "form":form
        }
        
        return render(request,"filotakip/filotakipverigiris.html",context)
    
