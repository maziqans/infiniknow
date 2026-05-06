from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portal.models import UserProfile

class Command(BaseCommand):
    help = 'Creates the initial users for the InfiniKnow portal'

    def handle(self, *args, **kwargs):
        # 1. Admin User
        admin_user, created = User.objects.get_or_create(username='admin@infinicore.com.my', email='admin@infinicore.com.my')
        if created:
            admin_user.set_password('adminpass')
            admin_user.is_superuser = True
            admin_user.is_staff = True
            admin_user.first_name = 'System'
            admin_user.last_name = 'Admin'
            admin_user.save()
            UserProfile.objects.create(user=admin_user, position='System Administrator', department='Admin', phone_number='000-0000000')

        # 2. Ammar (C-Level)
        ammar_user, created = User.objects.get_or_create(username='ammar@infinicore.com.my', email='ammar@infinicore.com.my')
        if created:
            ammar_user.set_password('123pass')
            ammar_user.first_name = 'Ammar Haziq'
            ammar_user.last_name = 'Bin Annas'
            ammar_user.save()
            UserProfile.objects.create(
                user=ammar_user,
                ic_number='012345-67-8910',
                personal_email='ammar@gmail.com',
                position='Chief Technology Officer',
                department='Technical',
                address='No. 1 Jalan kampung, sekyen 67, Shah Alam, 40000, Selangor, Malaysia',
                phone_number='0123456789'
            )

        # 3. user1 (Normal Employee)
        user1, created = User.objects.get_or_create(username='user1@infinicore.com.my', email='user1@infinicore.com.my')
        if created:
            user1.set_password('123pass')
            user1.first_name = 'Adam'
            user1.last_name = 'Najmi'
            user1.save()
            UserProfile.objects.create(
                user=user1,
                ic_number='980101-14-5555',
                personal_email='adam.najmi.design@gmail.com',
                position='Graphic Designer',
                department='Marketing',
                address='B-12-04, Residensi Wangsa, Wangsa Maju, 53300 Kuala Lumpur',
                phone_number='011-2345678'
            )

        self.stdout.write(self.style.SUCCESS('Successfully created Admin, Ammar (C-Level), and user1 (Normal User)!'))