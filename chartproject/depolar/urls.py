from django.urls import path
from depolar import views,views_API
from rest_framework import routers
from django.urls import reverse

router=routers.DefaultRouter()
router.register("inputdata",views_API.WareHouseInputDataViewset)


app_name = 'depolar'  # Uygulama adını belirtin

urlpatterns = [
    # path('giris/', views.sevkiyat_giris_view, name='sevkiyat_giris'),
    path("verigiris/",views.WarehouseDataInput.as_view(),name="sevkiyatveri_giris"),
    path("adminpanel/",views.admin_panel,name="adminpanel"),
    path("adminpanel/rapor1/",views.rapor1,name="rapor1"),
    path('bla/', views_API.Bla.as_view()),
    path('list/', views_API.WareHouseListAPIView.as_view()),
    path("depolartotal/" , views_API.depolartotal.as_view()),
    path('warehouse_totals/', views_API.WareHouseInputDataTotals.as_view(), name='warehouse_totals_api'),
    
    # Giriş işlemi için yol ekle
    # Diğer URL tanımlamalarını buraya ekleyebilirsiniz
]

urlpatterns +=router.urls
