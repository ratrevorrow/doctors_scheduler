from django.test import TestCase
from .models import User, Appointment

hbomb_email = 'yizzir@asdasd.com'
richard_email = 'ratrevor@asdasd.com'

# Create your tests here.
class UserTest(TestCase):

    def setUp(self):
        print('setting up user test')
        User.objects.create_user('richard', 'trevorrow', richard_email, 'DOCTOR')
        User.objects.create_user('hbomb', 'abers', hbomb_email, 'PATIENT')

    def test_user_email(self):
        user_richard = User.objects.get(email=richard_email)
        user_hbomb = User.objects.get(email=hbomb_email)
        self.assertEqual(user_richard.get_email(), richard_email)
        self.assertEqual(user_hbomb.get_email(), hbomb_email)

    def tearDown(self):
        print('tearing down user test')
        User.objects.get(email=richard_email).delete()
        User.objects.get(email=hbomb_email).delete()