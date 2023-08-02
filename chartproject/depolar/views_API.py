from rest_framework import viewsets, response
from .models import WareHouseInputData, WareHouse
from .serializers import *
from .filters import *
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, generics


class WareHouseInputDataViewset(viewsets.ModelViewSet):
    queryset=WareHouseInputData.objects.all()
    serializer_class=WareHouseInputDataSerializer
    #filter_backends=(DjangoFilterBackend,)
    #filter_fields=("report_year",)
    #filterset_class=WareHouseInputDataFilter            
        
    def list(self, request, *args, **kwargs):
        params = self.request.GET.dict()
        # Filtreleme işlemi
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.queryset.filter(**params)
        aggregate_data = queryset.aggregate(
            ort_rulot_dolulugu=Sum("ort_rulot_dolulugu"),
            ms_rulot_doluluk = Sum('ms_rulot_doluluk'),
            taze_rulot_doluluk=Sum("taze_rulot_doluluk"),
            koli_rulot_doluluk=Sum("koli_rulot_doluluk"),
            rulot_sayisi_toplam=Sum("rulot_sayisi_toplam"),
            rulot_sayisi_koli=Sum("rulot_sayisi_koli"),
            rulot_sayisi_taze=Sum("rulot_sayisi_taze"),
            rulot_sayisi_ms=Sum("rulot_sayisi_ms"),
            rulot_sayisi_sehirici=Sum("rulot_sayisi_sehirici"),
            rulot_sayisi_sehirdisi=Sum("rulot_sayisi_sehirdisi"),
            sefer_sayisi_toplam=Sum("sefer_sayisi_toplam"),
            sefer_sayisi_sehirici=Sum("sefer_sayisi_sehirici"),
            sefer_sayisi_sehirdisi=Sum("sefer_sayisi_sehirdisi"),
            gerceklesen_km_toplam=Sum("gerceklesen_km_toplam"),
            gerceklesen_km_sehirici=Sum("gerceklesen_km_sehirici"),
            gerceklesen_km_sehirdisi=Sum("gerceklesen_km_sehirdisi"),
            rulot_maaliyeti_ort=Sum("rulot_maaliyeti_ort"),
            rulot_maaliyeti_sehirici=Sum("rulot_maaliyeti_sehirici"),
            rulot_maaliyeti_sehirdisi=Sum("rulot_maaliyeti_sehirdisi"),
            sefer_maaliyeti_ort=Sum("sefer_maaliyeti_ort"),
            sefer_maaliyeti_sehirici=Sum("sefer_maaliyeti_sehirici"),
            sefer_maaliyeti_sehirdisi=Sum("sefer_maaliyeti_sehirdisi"),
            mazot_litre_fiyat=Sum("mazot_litre_fiyat"), 
            ),
         
        
        return response.Response(aggregate_data)

class Bla(APIView):
    def get(self, request):
        ware_house_count = WareHouse.objects.count()
        user_count = get_user_model().objects.count()
        context = {
            'ware_house_count': ware_house_count,
            'user_count':user_count
            }
        return Response(context)
    

class WareHouseListAPIView(APIView):
    def get(self, request):
        depolar = WareHouseInputData.objects.values('ware_house__id', 'ware_house__name').distinct()
        years = WareHouseInputData.objects.values_list('report_year', flat=True).distinct().order_by('-report_year')
        months = WareHouseInputData.objects.values_list('report_month', flat=True).distinct().order_by('report_month') # Sıralama burada yapılıyor

        data = {
            'depolar': depolar,
            'years': years,
            'months': months
        }
        return Response(data)

class depolartotal(APIView):
    def get(self, request):
        depolar = WareHouseInputData.objects.values('ware_house__id','ware_house__name').distinct()
        ware_housedata = []
        year = request.GET.get('report_year')
        month = request.GET.get('report_month')
        
        for depo in depolar:
            ware_house_id = depo["ware_house__id"]
            queryset = WareHouseInputData.objects.filter(ware_house__id=ware_house_id)
            
            if year:
                queryset = queryset.filter(report_year=year)
            
            if month:
                queryset = queryset.filter(report_month=month)
            
            aggregate_data = queryset.aggregate(
                ort_rulot_dolulugu=Sum("ort_rulot_dolulugu"),
                ms_rulot_doluluk=Sum('ms_rulot_doluluk'),
                taze_rulot_doluluk=Sum("taze_rulot_doluluk"),
                koli_rulot_doluluk=Sum("koli_rulot_doluluk"),
                rulot_sayisi_toplam=Sum("rulot_sayisi_toplam"),
                rulot_sayisi_koli=Sum("rulot_sayisi_koli"),
                rulot_sayisi_taze=Sum("rulot_sayisi_taze"),
                rulot_sayisi_ms=Sum("rulot_sayisi_ms"),
                rulot_sayisi_sehirici=Sum("rulot_sayisi_sehirici"),
                rulot_sayisi_sehirdisi=Sum("rulot_sayisi_sehirdisi"),
                sefer_sayisi_toplam=Sum("sefer_sayisi_toplam"),
                sefer_sayisi_sehirici=Sum("sefer_sayisi_sehirici"),
                sefer_sayisi_sehirdisi=Sum("sefer_sayisi_sehirdisi"),
                gerceklesen_km_toplam=Sum("gerceklesen_km_toplam"),
                gerceklesen_km_sehirici=Sum("gerceklesen_km_sehirici"),
                gerceklesen_km_sehirdisi=Sum("gerceklesen_km_sehirdisi"),
                rulot_maaliyeti_ort=Sum("rulot_maaliyeti_ort"),
                rulot_maaliyeti_sehirici=Sum("rulot_maaliyeti_sehirici"),
                rulot_maaliyeti_sehirdisi=Sum("rulot_maaliyeti_sehirdisi"),
                sefer_maaliyeti_ort=Sum("sefer_maaliyeti_ort"),
                sefer_maaliyeti_sehirici=Sum("sefer_maaliyeti_sehirici"),
                sefer_maaliyeti_sehirdisi=Sum("sefer_maaliyeti_sehirdisi"),
                mazot_litre_fiyat=Sum("mazot_litre_fiyat"),
            )
            
            ware_housedata.append({
                "label": depo["ware_house__name"],
                "data": aggregate_data
            })
        
        context = {
            "aggregate_data": ware_housedata
        }
        
        return Response(context)


class WareHouseInputDataTotals(APIView):
    def get(self, request):
        year = request.query_params.get('report_year', None)
        data = []

        # Eğer yıl belirtilmişse, sadece o yıl için filtre yapalım
        warehouses = WareHouse.objects.all()
        if year:
            warehouses_input_data = WareHouseInputData.objects.filter(report_year=year)
        else:
            warehouses_input_data = WareHouseInputData.objects.all()

        headers = [
            ('ort_rulot_dolulugu', 'Ort Rulot Doluluğu'),
            ('ms_rulot_doluluk', 'MS Rulot Doluluğu'),
            ('taze_rulot_doluluk', 'Taze Rulot Doluluğu'),
            ('koli_rulot_doluluk', 'Koli Rulot Doluluğu'),
            ('rulot_sayisi_toplam', 'Toplam Rulot Sayısı'),
            ('rulot_sayisi_koli', 'Koli Rulot Sayısı'),
            ('rulot_sayisi_taze', 'Taze Rulot Sayısı'),
            ('rulot_sayisi_ms', 'MS Rulot Sayısı'),
            ('rulot_sayisi_sehirici', 'Şehir İçi Rulot Sayısı'),
            ('rulot_sayisi_sehirdisi', 'Şehir Dışı Rulot Sayısı'),
            ('sefer_sayisi_toplam', 'Toplam Sefer Sayısı'),
            ('sefer_sayisi_sehirici', 'Şehir İçi Sefer Sayısı'),
            ('sefer_sayisi_sehirdisi', 'Şehir Dışı Sefer Sayısı'),
            ('gerceklesen_km_toplam', 'Toplam Gerçekleşen Km'),
            ('gerceklesen_km_sehirici', 'Şehir İçi Gerçekleşen Km'),
            ('gerceklesen_km_sehirdisi', 'Şehir Dışı Gerçekleşen Km'),
            ('rulot_maaliyeti_ort', 'Ortalama Rulot Maliyeti'),
            ('rulot_maaliyeti_sehirici', 'Şehir İçi Rulot Maliyeti'),
            ('rulot_maaliyeti_sehirdisi', 'Şehir Dışı Rulot Maliyeti'),
            ('sefer_maaliyeti_ort', 'Ortalama Sefer Maliyeti'),
            ('sefer_maaliyeti_sehirici', 'Şehir İçi Sefer Maliyeti'),
            ('sefer_maaliyeti_sehirdisi', 'Şehir Dışı Sefer Maliyeti'),
            ('mazot_litre_fiyat', 'Mazot Litre Fiyatı'),
        ]

        MONTH_CHOICES = [
            ('1', 'Ocak'),
            ('2', 'Şubat'),
            ('3', 'Mart'),
            ('4', 'Nisan'),
            ('5', 'Mayıs'),
            ('6', 'Haziran'),
            ('7', 'Temmuz'),
            ('8', 'Ağustos'),
            ('9', 'Eylül'),
            ('10', 'Ekim'),
            ('11', 'Kasım'),
            ('12', 'Aralık')
        ]

        for month, month_name in MONTH_CHOICES:
            for header, header_name in headers:
                warehouse_data = {
                    'header': header_name,
                    'month': month_name,
                    'depolar': {}
                }

                for warehouse in warehouses:
                    total_value = warehouses_input_data.filter(ware_house=warehouse, report_month=month).aggregate(Sum(header))[f'{header}__sum'] or 0
                    warehouse_data['depolar'][warehouse.name] = total_value

                data.append(warehouse_data)

        return Response(data)