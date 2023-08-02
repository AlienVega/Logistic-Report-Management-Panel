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
    def save_model(self, request, obj, form, change):
        # Kullanıcının kaydedilmeden önce depo ataması yapılmasını sağlayın
        if not change:  # Yeni kullanıcı eklenirken
            try:
                depo = WareHouseUser.objects.get(user=request.user).ware_house
            except WareHouseUser.DoesNotExist:
                # Eğer giriş yapan kullanıcının depo bilgisi yoksa, hata gönderin
                raise ValueError("Giriş yapan kullanıcının bir depo ataması yapılmamış.")

            obj.save()
            WareHouseUser.objects.create(user=obj, ware_house=depo)

        super().save_model(request, obj, form, change)
    def get_queryset(self, request):
        qs = super().get_queryset(request)

        # Eğer giriş yapan kullanıcı süper kullanıcı ise tüm kullanıcıları göster
        if request.user.is_superuser:
            return qs

        # Giriş yapan kullanıcının depo bilgisini alın
        try:
            depo = WareHouseUser.objects.get(user=request.user).ware_house
        except WareHouseUser.DoesNotExist:
            # Eğer giriş yapan kullanıcının depo bilgisi yoksa, boş bir QuerySet döndürün
            return qs.none()

        # Giriş yapan kullanıcının depo ile ilişkili olan kullanıcıları filtreleyin
        users = WareHouseUser.objects.filter(ware_house=depo).values_list('user', flat=True)
        qs = qs.filter(pk__in=users)

        return qs


# Diğer admin sınıfları...

# CustomUserAdmin'ı register etmeyin, bu satırı kaldırın
# admin.site.unregister(get_user_model())
admin.site.register(get_user_model(), CustomUserAdmin)
