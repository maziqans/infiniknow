from django.contrib import admin
from .models import UserProfile, Announcement, OnboardingItem, RecentActivity, PolicyDocument, TemplateDocument, FavoriteItem

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'position', 'department', 'phone_number')
    list_filter = ('role', 'department')
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

@admin.register(PolicyDocument)
class PolicyDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'version', 'is_new', 'uploaded_at')
    list_filter = ('is_new', 'uploaded_at')

@admin.register(TemplateDocument)
class TemplateDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'template_type', 'is_new', 'uploaded_at')
    list_filter = ('template_type', 'is_new', 'uploaded_at')

@admin.register(FavoriteItem)
class FavoriteItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'item_type', 'created_at')
    list_filter = ('item_type', 'created_at')
