from django.contrib import admin

# Register your models here.
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id','address_line_1', 'address_line_2', 'city','state_province_region','zipcode', 'phone', 'country_region')
    list_per_page = 25
    
admin.site.register(UserProfile, UserProfileAdmin)