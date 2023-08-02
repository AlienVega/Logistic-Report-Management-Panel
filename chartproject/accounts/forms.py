from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

class LoginForm(forms.Form):
    username=forms.CharField(max_length=50)
    password=forms.CharField(max_length=15,widget=forms.PasswordInput())
    
class RegisterForm(UserCreationForm):
    pass
        