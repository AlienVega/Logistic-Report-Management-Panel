from rest_framework import serializers
from .models import *


class UserWarehouseSerializer(serializers.Serializer):
    userwarehouse = serializers.CharField()

