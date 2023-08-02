from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import  WareHouse,WareHouseUser,WareHouseInputData,Bildirim
from django.contrib.auth import get_user_model
from django.db.models import Q


@admin.register(WareHouse)
class WareHouseAdmin(admin.ModelAdmin):
    pass

@admin.register(Bildirim)
class Notification(admin.ModelAdmin):
    list_display=(
      "metin" ,"olusturulma_tarihi", 
    )

@admin.register(WareHouseUser)
class WareHouseUserAdmin(admin.ModelAdmin):
    list_display=(
        "id","user","is_warehouse_admin","ware_house",
    )
    list_filter=(
        "ware_house",
    )
    list_editable = (
        "is_warehouse_admin",
    )
    
   
    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #         if str(request).endswith("change/'>"):
    #             return super().formfield_for_foreignkey(db_field, request, **kwargs)
    #         if db_field.name == "user":
    #             kwargs["queryset"] = get_user_model().objects.filter(user_warehouse__isnull=True)
    #         return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    # def get_readonly_fields(self, request, obj=None):
    #     _fields = ('user',)
    #     readonly_list = []
    #     if obj is not None:
    #         readonly_list.extend([obj._meta.get_field(field_name).name for field_name in _fields if
    #                               getattr(obj, field_name) is not None])
    #     return readonly_list
    
    # def get_queryset(self, request):
    #     qs = super().get_queryset(request)
    #     user_ware_house=request.user.user_warehouse
    #     if request.user.is_superuser:
    #         return qs
        
    #     qs = qs.filter(ware_house=user_ware_house.ware_house)
    #     return qs
         
@admin.register(WareHouseInputData)
class WareHouseInputDataAdmin(admin.ModelAdmin):
    list_display=(
        "id","ware_house","user","created_date",
    )
    list_filter=(
        "ware_house",
    )  
