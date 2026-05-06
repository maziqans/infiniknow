from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, Announcement, OnboardingItem, RecentActivity
from .serializers import UserProfileSerializer, AnnouncementSerializer, OnboardingItemSerializer, RecentActivitySerializer

class CurrentUserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

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
    serializer_class = RecentActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecentActivity.objects.filter(user=self.request.user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
