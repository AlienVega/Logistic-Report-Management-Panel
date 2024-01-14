# PROJE HAKKINDA 

# Proje aktif kullanılabilecek Lojistik Operasyon Raporlama Proje Demosudur.

Birden fazla depo tanımlanabilir.Tanımlanan depoya Lojistik personelleri oluşturulabilir. Her Lojistik personellerine sadece bir Depo Müdür'ü atanabilir.
Admin paneli üzerinden yetkilendirme ayarları yapılabilir.Örneğin Ahmet isimli lojistik personeli Sayfaya giriş yaptığında sadece Nakliye maaliyet raporu'na veri işleyebilir.
Lojistik personelleri sayfaya giriş yaptığında veri giriş sayfasına yönlendirilir. Depo içerisinde tüm operasyonel verilerin girişini yapar. Alt kullanıcıların sadece veri girişi yapma yetkisi vardır.

Depo Müdürleri sayfaya giriş yaptığında Yönetim paneline yönlendirilir.Yönetim Panelinde Tüm departmanların raporlarını grafik ve tablo üzerinde analizini yapar.
Grafik bütün tarayıcılarda çalışır.Grafikler Profesyonel olarak özelleştirilmiştir.Tam ekran özelliği sayesinde okunabilirliği arttırır ve efektif bir sunum sağlar.
Tablo ve grafikler api sayesinde verileri anlık olarak panelde gösterir.Yıllık Aylık Haftalık filtreleme özelliğine ve rapor başlıklarına göre Yöneticinin istediği formatta
çapraz ve gelişmiş filtreleme özelliğine sahiptir.

# PROJEYİ ÇALIŞTIRMA HAKKINDA

ana dizinde chartproject dosyasının içerisinde manage.py dosyasını çalıştırın ve şu komut ile gerekli bağımlılıkları yükleyin 
pip install -r requirements.txt
pip install crispy_bootstrap4

şu komut ilechartproject dizinine geçin
cd chartproject
şu komut ile Veritabanı tablolarını yükleyin
python manage.py migrate
admin kullanıcısı oluşturun
python manage.py createsuperuser
ve projeyi çalıştırın 
python manage.py runserver
sunucu adresinin sonuna /admin yazarak admin paneline gidin ve kullanıcı adı şifrenizi girdikten sonra bir depo tanımlayın ve ilk önce kendinizi depoyla eşleştirin(is warehouse admin)


![](/chartproject/static/img/logisticmain1.jpg)
![](/chartproject/static/img/sev_verigiris.png)
![](/chartproject/static/img/filo_verigiris.png)

![](/chartproject/static/img/yonetimpanel_1.png)
![](/chartproject/static/img/yonetimpanel_2.png)
![](/chartproject/static/img/yonetimpanel_3.png)
![](/chartproject/static/img/yonetimpanel_4.png)
![](/chartproject/static/img/yonetimpanel_5.png)
![](/chartproject/static/img/yonetimpanel_6.png)
![](/chartproject/static/img/yonetimpanel_7.png)
![](/chartproject/static/img/yonetimpanel_filo.png)












