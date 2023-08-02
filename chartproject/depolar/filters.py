import django_filters
from .models import WareHouseInputData

class WareHouseInputDataFilter(django_filters.FilterSet):
    # start_date=django_filters.DateFilter(name="tarih",lookup_type=("gt",))
    # end_date=django_filters.DateFilter(name="tarih",lookup_type=("lt",))
    report_year = django_filters.CharFilter(field_name='report_year', lookup_expr='exact')
    report_month = django_filters.CharFilter(field_name='report_month', lookup_expr='exact')
    ware_house=django_filters.NumberFilter(field_name='ware_house', lookup_expr='exact')
    
    class Meta:
        model=WareHouseInputData
        # fields={
        #     "ware_house":["exact"],

        #         }
        fields = ['report_year','report_month','ware_house']