# Generated by Django 3.1.7 on 2022-12-24 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
    ]
