from rest_framework import serializers
from .models import *


class WareHouseInputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=WareHouseInputData
        fields="__all__"


