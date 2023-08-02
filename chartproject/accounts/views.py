from django.shortcuts import render,redirect,HttpResponse


from .forms import *
from django import views
from django.contrib.auth import authenticate,login,logout
from chart.models import *


# Create your views here.
class LoginView(views.View):
    def get(self,request, *args,**kwargs):
        form=LoginForm()
        context={
            "form":form
        }

        return render(request,"accounts/login.html",context)
    
    def post(self,request):
        form=LoginForm(request.POST)
        
        if form.is_valid():
           username=form.cleaned_data["username"]
           password=form.cleaned_data["password"]
           user = authenticate(request,username=username,password=password)
            
           
           if user is not None :
               login(request,user)
               if hasattr(request.user, 'user_warehouse'):
                    if request.user.user_warehouse.is_warehouse_admin:
                        return redirect("depolar:adminpanel")  # Replace 'adminpanel' with the actual URL name for adminpanel.html
                    else:
                        return redirect("chart:anasayfa")
               else:
                    return HttpResponse('depo atamanız yapılmadı')

           else:
                context = {
                    "form": form,
                    "error_message": "Geçersiz kullanıcı adı veya şifre."
                }
                return render(request, "accounts/login.html", context)            
        else:
            
            context = {
                    "form": form,
                    "error_message": "Lütfen geçerli bir kullanıcı adı ve şifre girin."
                }
            return render(request, "accounts/login.html", context)
    

    
def logout_view(request):
    logout(request)
    
    return redirect("accounts:login")





