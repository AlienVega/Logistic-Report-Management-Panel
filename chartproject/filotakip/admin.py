from django.contrib import admin
from .models import FiloDataEntry
# Register your models here.


class FiloDataEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'ware_house', 'mevcut', 'sezon', 'report_year', 'report_month', 'week_select', 'created_date', 'updated_date']
    list_filter = [ 'ware_house', 'mevcut', 'sezon', 'report_year', 'report_month', 'week_select']
    search_fields = ['user__username', 'ware_house__name']  # Bu alanları gerektiğinde düzenleyin
    ordering = ['-created_date']

admin.site.register(FiloDataEntry, FiloDataEntryAdmin)





