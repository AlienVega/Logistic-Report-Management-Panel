from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserWarehouseSerializer
from depolar.models import *
from django.db.models import Sum
from .models import FiloDataEntry

class UserWarehouseAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        userwarehouse = None
        if hasattr(request.user, 'user_warehouse'):
            userwarehouse = WareHouseUser.objects.get(user=request.user).ware_house

        serializer = UserWarehouseSerializer({'userwarehouse': userwarehouse})
        return Response(serializer.data)

class CalculateTotalsAPI(APIView):
    def get(self, request):
        year = request.query_params.get('year', None)
        month = request.query_params.get('month', None)
        week = request.query_params.get('week', None)

        warehouses = WareHouse.objects.all()

        result = {}
        for warehouse in warehouses:
            filo_entries = FiloDataEntry.objects.filter(ware_house=warehouse)

            if year:
                filo_entries = filo_entries.filter(report_year=year)
            if month:
                filo_entries = filo_entries.filter(report_month=month)
            if week:
                filo_entries = filo_entries.filter(week_select=week)

            mevcut_options = filo_entries.values_list('mevcut', flat=True).distinct()

            # mevcut_all_filo = {
            #     'filo_tir': filo_entries.aggregate(total_tir=Sum('tir'))['total_tir'] or 0,
            #     'filo_büyük': filo_entries.aggregate(total_buyuk=Sum('buyuk'))['total_buyuk'] or 0,
            #     'filo_orta': filo_entries.aggregate(total_orta=Sum('orta'))['total_orta'] or 0,
            #     'filo_küçük': filo_entries.aggregate(total_kucuk=Sum('kucuk'))['total_kucuk'] or 0,
            # }

            # sezon_all_filo = {
            #     'filo_tir': filo_entries.aggregate(total_sezon_tir=Sum('sezon_tir'))['total_sezon_tir'] or 0,
            #     'filo_büyük': filo_entries.aggregate(total_sezon_buyuk=Sum('sezon_buyuk'))['total_sezon_buyuk'] or 0,
            #     'filo_orta': filo_entries.aggregate(total_sezon_orta=Sum('sezon_orta'))['total_sezon_orta'] or 0,
            #     'filo_küçük': filo_entries.aggregate(total_sezon_kucuk=Sum('sezon_kucuk'))['total_sezon_kucuk'] or 0,
            # }

            warehouse_data = {}
            for mevcut in mevcut_options:
                filtered_entries = filo_entries.filter(mevcut=mevcut)

                total_mevcut = filtered_entries.aggregate(
                    tir_total=Sum('tir'),
                    buyuk_total=Sum('buyuk'),
                    orta_total=Sum('orta'),
                    kucuk_total=Sum('kucuk')
                )
                total_sezon = filtered_entries.aggregate(
                    sezon_tir_total=Sum('sezon_tir'),
                    sezon_buyuk_total=Sum('sezon_buyuk'),
                    sezon_orta_total=Sum('sezon_orta'),
                    sezon_kucuk_total=Sum('sezon_kucuk'),
                )
                
                # all_total_mevcut = (
                #     total_mevcut['tir_total'] +
                #     total_mevcut['buyuk_total'] +
                #     total_mevcut['orta_total'] +
                #     total_mevcut['kucuk_total']
                # )

                # all_total_sezon = (
                #     total_sezon['sezon_tir_total'] +
                #     total_sezon['sezon_buyuk_total'] +
                #     total_sezon['sezon_orta_total'] +
                #     total_sezon['sezon_kucuk_total']
                # )

                warehouse_data[mevcut] = {
                    # 'all_toplam_mevcut': all_total_mevcut,
                    'toplam_mevcut': {
                        'tır': total_mevcut['tir_total'] or 0,
                        'büyük': total_mevcut['buyuk_total'] or 0,
                        'orta': total_mevcut['orta_total'] or 0,
                        'küçük': total_mevcut['kucuk_total'] or 0,
                    },
                    # 'all_toplam_sezon': all_total_sezon,
                    'toplam_sezon': {
                        'tır': total_sezon['sezon_tir_total'] or 0,
                        'büyük': total_sezon['sezon_buyuk_total'] or 0,
                        'orta': total_sezon['sezon_orta_total'] or 0,
                        'küçük': total_sezon['sezon_kucuk_total'] or 0,
                    }
                }

            result[warehouse.name] = {
                # 'mevcut_all_filo': mevcut_all_filo,
                # 'sezon_all_filo': sezon_all_filo,
                **warehouse_data
            }

        return Response(result)
    


class FiloDateListAPIView(APIView):
    def get(self, request):
        ware_houses = WareHouse.objects.all()

        data = []

        for warehouse in ware_houses:
            warehouse_data = {
                'warehouse_id': warehouse.id,
                'warehouse_name': warehouse.name,
                'data': []
            }

            warehouse_entries = FiloDataEntry.objects.filter(ware_house=warehouse)

            years = warehouse_entries.values_list('report_year', flat=True).distinct().order_by('report_year')
            months = warehouse_entries.values_list('report_month', flat=True).distinct().order_by('report_month')
            weeks = warehouse_entries.values_list('week_select', flat=True).distinct().order_by('week_select')

            if years.exists():
                warehouse_data['data'].append({'year': [str(year) for year in years]})

            if months.exists():
                warehouse_data['data'].append({'month': [str(month) for month in months]})

            if weeks.exists():
                warehouse_data['data'].append({'week': [week for week in weeks]})

            data.append(warehouse_data)

        return Response(data)
