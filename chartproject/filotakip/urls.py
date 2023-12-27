from django.urls import path,include
from . import views, views_API
from rest_framework.routers import DefaultRouter
app_name = 'filotakip'  # Uygulama adını belirtin

router = DefaultRouter()

urlpatterns = [

    path("filoverigiris/",views.FiloTakipVeriGiris.as_view() ,name="filoveri_giris"),

    path('userwarehouse/', views_API.UserWarehouseAPI.as_view()),
    path('totalfiloapi/',views_API.CalculateTotalsAPI.as_view(), name='filodata'),
    path('filolist/',views_API.FiloDateListAPIView.as_view(), name='filodata'),
    
]

