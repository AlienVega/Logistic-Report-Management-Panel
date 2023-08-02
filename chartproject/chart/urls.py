from django.urls import path,include
from . import views

app_name = 'chart'

urlpatterns = [
    
    path("",views.index,name="anasayfa"),
    path("tablo/",views.tablo,name="tablo"),
    
    # path("sevkiyatgiris/",views.sevkiyat_giris,name="sevkiyat_giris")
]
