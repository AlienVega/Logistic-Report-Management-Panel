from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import date

from django.utils import timezone
from datetime import timedelta
from datetime import datetime
from accounts.models import CustomUser 

class WareHouse(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class WareHouseUser(models.Model):
    user=models.OneToOneField(CustomUser,on_delete=models.PROTECT,related_name="user_warehouse")
    is_warehouse_admin=models.BooleanField(default=False)
    ware_house=models.ForeignKey(WareHouse,on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.user.username} - {self.ware_house.name}"

class WareHouseInputData(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.PROTECT,blank=True,related_name="user_warehouseinputdata")
    ware_house=models.ForeignKey(WareHouse,on_delete=models.PROTECT,blank=True)
    ort_rulot_dolulugu = models.DecimalField(max_digits=10, decimal_places=3,null=True, blank=True)
    ms_rulot_doluluk= models.DecimalField(max_digits=10, decimal_places=3,null=True, blank=True)
    taze_rulot_doluluk = models.DecimalField(max_digits=10, decimal_places=3,null=True, blank=True)
    koli_rulot_doluluk = models.DecimalField(max_digits=10, decimal_places=3,null=True, blank=True)
    rulot_sayisi_toplam = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_sayisi_koli = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_sayisi_taze = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_sayisi_ms = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_sayisi_sehirici = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_sayisi_sehirdisi = models.DecimalField(max_digits=10, decimal_places=3)
    sefer_sayisi_toplam = models.DecimalField(max_digits=10, decimal_places=3)
    sefer_sayisi_sehirici = models.DecimalField(max_digits=10, decimal_places=3)
    sefer_sayisi_sehirdisi = models.DecimalField(max_digits=10, decimal_places=3)
    gerceklesen_km_toplam = models.DecimalField(max_digits=10, decimal_places=3)
    gerceklesen_km_sehirici = models.DecimalField(max_digits=10, decimal_places=3)
    gerceklesen_km_sehirdisi = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_maaliyeti_ort = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_maaliyeti_sehirici = models.DecimalField(max_digits=10, decimal_places=3)
    rulot_maaliyeti_sehirdisi = models.DecimalField(max_digits=10, decimal_places=3)
    sefer_maaliyeti_ort=models.DecimalField(max_digits=10, decimal_places=3)
    sefer_maaliyeti_sehirici=models.DecimalField(max_digits=10, decimal_places=3)
    sefer_maaliyeti_sehirdisi=models.DecimalField(max_digits=10, decimal_places=3)
    mazot_litre_fiyat=models.DecimalField(max_digits=10, decimal_places=3)
    
    created_date=models.DateTimeField(auto_now_add=True)
    updated_date=models.DateTimeField(auto_now=True)
    
    YEAR_CHOICES = [(str(year), str(year)) for year in range(1900, datetime.now().year + 1)]
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

class Bildirim(models.Model):
    metin = models.TextField()
    olusturulma_tarihi = models.DateTimeField(auto_now_add=True)
    gorulme_tarihi = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)  # is_active adında yeni bir alan ekledik

    def __str__(self):
        return self.metin