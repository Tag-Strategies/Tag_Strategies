# Generated by Django 2.2.17 on 2020-12-04 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fec', '0003_auto_20201204_0515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='politician',
            name='name',
            field=models.CharField(default='XXXXX XXXXXX', max_length=200, unique=True),
        ),
    ]
