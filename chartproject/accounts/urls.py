from django.urls import path
from accounts import views 
app_name="accounts"

urlpatterns = [
    path("login",views.LoginView.as_view(),name="login"),
    path("login/<str:next>",views.LoginView.as_view(),name="login"),

    path("logout",views.logout_view,name="logout"),

    ]