from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('Employee', 'Normal Employee'),
        ('Management', 'C-Level / Management'),
        ('Admin', 'Administrator'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')
    ic_number = models.CharField(max_length=20, blank=True)
    personal_email = models.EmailField(blank=True)
    position = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.position}"

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    preview = models.CharField(max_length=250)
    content = models.TextField()
    is_new = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class OnboardingItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    file = models.FileField(upload_to='onboarding_docs/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class RecentActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recent_activities')
    title = models.CharField(max_length=200)
    doc_type = models.CharField(max_length=50, default="DOC")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username} viewed {self.title}"

class PolicyDocument(models.Model):
    title = models.CharField(max_length=200)
    version = models.CharField(max_length=50, blank=True)
    file = models.FileField(upload_to='policies/', blank=True, null=True)
    is_new = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
