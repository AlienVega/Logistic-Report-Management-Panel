# Generated by Django 4.2 on 2023-08-25 12:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('depolar', '0013_bildirim_content_type_bildirim_object_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FiloDataEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mevcut', models.CharField(choices=[('MarnaK', 'MARNAK'), ('Murat', 'MURAT'), ('Bir', 'BİR'), ('Ceva', 'CEVA'), ('Netlog', 'NETLOG')], max_length=10)),
                ('buyuk', models.IntegerField(default=0)),
                ('kucuk', models.IntegerField(default=0)),
                ('orta', models.IntegerField(default=0)),
                ('tir', models.IntegerField(default=0)),
                ('sezon', models.CharField(choices=[('MarnaK', 'MARNAK'), ('Murat', 'MURAT'), ('Bir', 'BİR'), ('Ceva', 'CEVA'), ('Netlog', 'NETLOG')], max_length=10)),
                ('sezon_buyuk', models.IntegerField(default=0)),
                ('sezon_kucuk', models.IntegerField(default=0)),
                ('sezon_orta', models.IntegerField(default=0)),
                ('sezon_tir', models.IntegerField(default=0)),
                ('year_select', models.CharField(max_length=4)),
                ('month_select', models.PositiveIntegerField()),
                ('week_select', models.CharField(max_length=1)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='user_filodataentry', to=settings.AUTH_USER_MODEL)),
                ('ware_house', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to='depolar.warehouse')),
            ],
            options={
                'ordering': ['-created_date'],
            },
        ),
    ]
