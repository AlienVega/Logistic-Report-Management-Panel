
from django.shortcuts import render, redirect,HttpResponse,reverse
from .forms import WareHauseDataInputForm
from django.views import View
from .models import *
from django.contrib import messages
from django.db.models import Count
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from accounts.models import CustomUser 
from django.utils.decorators import method_decorator

@login_required
def rapor1(request):
    if request.user.user_warehouse:
        if request.user.user_warehouse.is_warehouse_admin:
              return render(request,"admin/rapor1.html", )            
        else: 
            return HttpResponse("admin değilsiniz") 
    else:       
        return HttpResponse("depo atamanız yapılmadı")

@login_required
def rapor2(request):
    if request.user.user_warehouse:
        if request.user.user_warehouse.is_warehouse_admin:
              return render(request,"admin/rapor2.html", )            
        else: 
            return HttpResponse("admin değilsiniz") 
    else:       
        return HttpResponse("depo atamanız yapılmadı")
            
            
class WarehouseDataInput(View):
    @method_decorator(login_required)
    def get(self,request):
        if request.user.user_warehouse.is_warehouse_admin:
             return redirect("depolar:adminpanel")
        else:
            form = WareHauseDataInputForm()         
            if hasattr(request.user, 'user_warehouse'):
                    userwarehouse = WareHouseUser.objects.get(user=request.user).ware_house
                    context={
                        "form":form,
                        "userwarehouse":userwarehouse
                    }
                    return render(request,"sevkiyatverigiris.html",context)
            else:
                    return HttpResponse('depo atamanız yapılmadı')

    def post(self,request):
        form=WareHauseDataInputForm(request.POST)
        
        if form.is_valid():
            instance = form.save(commit=False)
            instance.user = request.user
            ware_house_user = request.user.user_warehouse  # veya first() kullanabilirsiniz
            instance.ware_house = ware_house_user.ware_house
            instance.save()
                
            messages.success(request, "Kayıt başarıyla yapıldı.")  # Başarılı kayıt uyarısı
            form = WareHauseDataInputForm()  # Tüm giriş alanlarını boşaltmak için yeni bir form oluşturun
            
        context={
            "form":form
        }
        return render(request,"sevkiyatverigiris.html",context)

@login_required
def admin_panel(request):
    if request.user.user_warehouse:
        
        if request.user.user_warehouse.is_warehouse_admin:
    
            depolar = WareHouse.objects.all()
            selected_depo = request.GET.get('depo')
            selected_tarih = request.GET.get('report_year')
            depo_sayisi = WareHouse.objects.count()
            user_model = CustomUser
            depo = WareHouseUser.objects.get(user=request.user).ware_house
            unique_users = WareHouseUser.objects.filter(ware_house=depo)
            user_count = user_model.objects.filter(id__in=unique_users).count()
            data = WareHouseInputData.objects.all()
            user = request.user

            if selected_depo:
                data = data.filter(ware_house_id=selected_depo)

            if selected_tarih:
                data = data.filter(report__year=selected_tarih)

            years = data.values('report_year').annotate(count=Count('id')).order_by('report_year')
            years = [year['report_year'] for year in years]
            exclude_fields = ['user', 'ware_house', 'report_year', 'created_date', 'updated_date',"report_month"]

            fields = WareHouseInputData._meta.get_fields()
            header_fields = [field.name for field in fields if not field.auto_created]
                
            # Bildirimleri kontrol et ve kaydet
            bildirimler = []  # Bildirimleri saklamak için bir liste oluşturun.
            for wr_user in unique_users:
                if not wr_user.user.user_warehouse.is_warehouse_admin:
                    if hasattr(wr_user.user, 'user_warehouseinputdata'):
                        last_data_date = wr_user.user.user_warehouseinputdata.last()
                        if last_data_date is not None:
                            gecen_gun = (timezone.now().date() - last_data_date.created_date.date()).days
                            if gecen_gun > 7:
                                depo_adi = wr_user.user.user_warehouse.ware_house.name
                                kullanici_adi = wr_user.user.username
                                bildirim_metni = f"{depo_adi}: {kullanici_adi} {last_data_date.created_date.strftime('%d.%m.%Y')} tarihinden itibaren veri girişi yapmıyor ({gecen_gun} gün)"
                                 
                                # if not Bildirim.objects.filter(metin=bildirim_metni, gorulme_tarihi__isnull=True).exists():
                                
                                    # Belirli bir süreden daha önce oluşturulmuş benzer bildirim yoksa, yeni bildirimi oluşturup kaydedelim.
                                from django.apps import apps
                                try:    
                                    content_object = apps.get_model(app_label="depolar",
                                    model_name="WareHouseInputData").objects.get(pk=last_data_date.pk)
                                    bildirim=Bildirim.objects.get(content_type=ContentType.objects.get_for_model(content_object))
                                    print(content_object)    

                                except:
                                    bildirim = Bildirim(metin=bildirim_metni,content_object=last_data_date)
                                    bildirim.save()
                                    bildirimler.append(bildirim)  # Kaydedilen bildirimi listeye ekle
                                    print("hata")
            # Bildirimleri en son eklenen bildirime göre sırala ve kullanıcıya göstermeden önce gorulme_tarihi'ni güncelle
            Bildirim.objects.filter(id__in=[bildirim.id for bildirim in bildirimler]).update(gorulme_tarihi=timezone.now())

            # Bildirimleri en son eklenen bildirime göre sırala
            bildirimler = Bildirim.objects.filter(is_active=True).order_by('-id')
            context = {
                'depolar': depolar,
                'selected_depo': int(selected_depo) if selected_depo else None,
                'data': data,
                # 'is_warehouse_admin': is_warehouse_admin,
                'depo_sayisi': depo_sayisi,
                'years': years,
                'selected_tarih': selected_tarih,
                'header_fields': header_fields,
                'exclude_fields': exclude_fields,
                "user_count":user_count,
                "bildirimler":bildirimler,
                "user":user,
            }
            print(request.user.user_warehouse.is_warehouse_admin)
            return render(request, 'admin/dashboard.html', context)
        else:
            return HttpResponse("admin değilsiniz ")
    else:
        return HttpResponse("depo atamanız yapılmadı")
    
@login_required
def view_notifications(request):
    # Bildirimleri kullanıcının gördüğü zamanı kaydedin
    now = timezone.now()
    Bildirim.objects.filter(gorulme_tarihi__isnull=True).update(gorulme_tarihi=now)

    # Bildirimleri sıralayın ve göstermek için kullanın
    bildirimler = Bildirim.objects.filter(is_active=True).order_by('-id')

    context = {
        "bildirimler": bildirimler
    }
    return render(request, 'admin/admin_panel.html', context)  # Şablon adını "admin_panel.html" olarak değiştirin.


