# Generated by Django 2.2.17 on 2020-12-17 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fec', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='politician',
            name='party',
            field=models.CharField(default='none', max_length=5),
        ),
    ]