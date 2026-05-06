from rest_framework import viewsets
from .models import UserProfile, Announcement, OnboardingItem, RecentActivity
from .serializers import UserProfileSerializer, AnnouncementSerializer, OnboardingItemSerializer, RecentActivitySerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().order_by('-created_at')
    serializer_class = AnnouncementSerializer

class OnboardingItemViewSet(viewsets.ModelViewSet):
    queryset = OnboardingItem.objects.all().order_by('-uploaded_at')
    serializer_class = OnboardingItemSerializer

class RecentActivityViewSet(viewsets.ModelViewSet):
    queryset = RecentActivity.objects.all().order_by('-timestamp')
    serializer_class = RecentActivitySerializer
