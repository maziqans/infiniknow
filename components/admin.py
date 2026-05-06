from django.contrib import admin
from .models import UserProfile, Announcement, OnboardingItem, RecentActivity

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'position', 'department', 'phone_number')
    search_fields = ('user__email', 'user__first_name', 'position', 'department')

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_new', 'created_at')
    list_filter = ('is_new', 'created_at')

@admin.register(OnboardingItem)
class OnboardingItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')

@admin.register(RecentActivity)
class RecentActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'doc_type', 'timestamp')
    list_filter = ('doc_type', 'timestamp')