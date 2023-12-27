from django.db import models
from depolar.models import CustomUser,WareHouse
from datetime import datetime
    
class FiloDataEntry(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.PROTECT,blank=True,related_name="user_filodataentry")
    ware_house=models.ForeignKey(WareHouse,on_delete=models.PROTECT,blank=True)
    
    MEVCUT_CHOICES = [
        ('MarnaK', 'MARNAK'),
        ('Murat', 'MURAT'),
        ('Bir', 'BİR'),
        ('Ceva', 'CEVA'),
        ('Netlog', 'NETLOG')
    ]

    mevcut = models.CharField(max_length=10, choices=MEVCUT_CHOICES)
    buyuk = models.IntegerField(default=0)
    kucuk = models.IntegerField(default=0)
    orta = models.IntegerField(default=0)
    tir = models.IntegerField(default=0)

    sezon = models.CharField(max_length=10, choices=MEVCUT_CHOICES)
    sezon_buyuk = models.IntegerField(default=0)
    sezon_kucuk = models.IntegerField(default=0)
    sezon_orta = models.IntegerField(default=0)
    sezon_tir = models.IntegerField(default=0)

    YEAR_CHOICES = [(str(year), str(year)) for year in range(2020, 2051)]
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

    report_year = models.CharField(max_length=4, choices=YEAR_CHOICES, default=datetime.now().year)
    report_month = models.CharField(max_length=2, choices=MONTH_CHOICES, default=datetime.now().month)
    week_select = models.CharField(max_length=1)
    
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

      

