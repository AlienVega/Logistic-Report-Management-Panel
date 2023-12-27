from django.contrib import admin
from django.contrib.auth import get_user_model
from depolar.models import *
from django.contrib.auth.admin import UserAdmin


# Diğer admin sınıfları...

class WarehouseInline(admin.TabularInline):
    model = WareHouseUser
    fields = (
        "ware_house",
        "is_warehouse_admin"
    )


# Diğer admin sınıfları...

# CustomUserAdmin sınıfını diğer admin sınıflarının ardından tanımlayın
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    ordering = ('username',)
    list_display_links = ('username',)
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        
        if request.user.is_superuser:
            return qs
        depo = WareHouseUser.objects.get(user=request.user).ware_house
        users = WareHouseUser.objects.filter(ware_house=depo).values_list('user', flat=True)
        qs = qs.filter(pk__in=users)
        return qs
    
    def get_readonly_fields(self, request, obj=None):
        _fields = ('is_superuser',"user_permissions","groups")
        readonly_list = []
        if not request.user.is_superuser :
            readonly_list.extend([obj._meta.get_field(field_name).name for field_name in _fields if
                            getattr(obj, field_name) is not None])
        return readonly_list

# Diğer admin sınıfları...

# CustomUserAdmin'ı register etmeyin, bu satırı kaldırın
# admin.site.unregister(get_user_model())
admin.site.register(get_user_model(), CustomUserAdmin)
