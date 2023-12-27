from rest_framework import serializers
from .models import *



class WareHouseSerializer(serializers.ModelSerializer):
    
    
    warehouse_fleets = serializers.SerializerMethodField()
    
    class Meta:
        model = WareHouse
        fields = '__all__'
        

class WareHouseInputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=WareHouseInputData
        fields="__all__"


