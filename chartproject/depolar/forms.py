from django import forms
from .models import WareHouseInputData

class WareHauseDataInputForm(forms.ModelForm):
    class Meta:
        model = WareHouseInputData
        exclude = ("user", "ware_house")
        widgets = {
            'ort_rulot_dolulugu': forms.NumberInput(attrs={'class': 'form-control',}),
            'ms_rulot_doluluk': forms.NumberInput(attrs={'class': 'form-control'}),
            'taze_rulot_doluluk': forms.NumberInput(attrs={'class': 'form-control'}),
            'koli_rulot_doluluk': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_toplam': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_koli': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_taze': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_ms': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_sehirici': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_sayisi_sehirdisi': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_sayisi_toplam': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_sayisi_sehirici': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_sayisi_sehirdisi': forms.NumberInput(attrs={'class': 'form-control'}),
            'gerceklesen_km_toplam': forms.NumberInput(attrs={'class': 'form-control'}),
            'gerceklesen_km_sehirici': forms.NumberInput(attrs={'class': 'form-control'}),
            'gerceklesen_km_sehirdisi': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_maaliyeti_ort': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_maaliyeti_sehirici': forms.NumberInput(attrs={'class': 'form-control'}),
            'rulot_maaliyeti_sehirdisi': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_maaliyeti_ort': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_maaliyeti_sehirici': forms.NumberInput(attrs={'class': 'form-control'}),
            'sefer_maaliyeti_sehirdisi': forms.NumberInput(attrs={'class': 'form-control'}),
            'mazot_litre_fiyat': forms.NumberInput(attrs={'class': 'form-control'}),

            'report_year': forms.Select(choices=WareHouseInputData.YEAR_CHOICES, attrs={'class': 'form-control','type': 'date'}),
            'report_month': forms.Select(choices=WareHouseInputData.MONTH_CHOICES, attrs={'class': 'form-control','type': 'date'}),
            
        }
        

