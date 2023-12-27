from django import forms
from .models import FiloDataEntry
from django.contrib import messages
class VeriGirisiForm(forms.ModelForm):
    HAFTA_CHOICES = [
        ('1', '1. Hafta'),
        ('2', '2. Hafta'),
        ('3', '3. Hafta'),
        ('4', '4. Hafta'),
    ]
    
    mevcut = forms.ChoiceField(choices=FiloDataEntry.MEVCUT_CHOICES, widget=forms.RadioSelect, required=True)
    buyuk = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)
    kucuk = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)
    orta = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'orta form-control'}), initial=0)
    tir = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)

    
    # sezon_check = forms.BooleanField(widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}), required=False)
    sezon = forms.ChoiceField(choices=FiloDataEntry.MEVCUT_CHOICES, widget=forms.RadioSelect,required=False)
    sezon_buyuk = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)
    sezon_kucuk = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)
    sezon_orta = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'orta form-control'}), initial=0)
    sezon_tir = forms.IntegerField(min_value=0, widget=forms.NumberInput(attrs={'class': 'form-control'}), initial=0)
    
    week_select = forms.ChoiceField(choices=HAFTA_CHOICES, widget=forms.Select(attrs={'class': 'form-select mb-3'}), initial=0)
    report_year = forms.ChoiceField(choices=FiloDataEntry.YEAR_CHOICES, widget=forms.Select(attrs={'class': 'form-control'}), initial=0)
    report_month = forms.ChoiceField(choices=FiloDataEntry.MONTH_CHOICES, widget=forms.Select(attrs={'class': 'form-control'}), initial=0)

    
    class Meta:
        model = FiloDataEntry
        exclude = ("user", "ware_house",)

    def clean_mevcut(self):
        mevcut = self.cleaned_data.get('mevcut')
        if not mevcut:
            raise forms.ValidationError("Mevcut alanı gereklidir. Lütfen bir seçenek seçin.")
        return mevcut


