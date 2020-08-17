from django.test import TestCase
from rest_framework.test import APITestCase, URLPatternsTestCase, APIRequestFactory
from django.urls import reverse, include, path
from .models import User, Appointment
from rest_framework import status

hannah_email = 'hannah@asdasd.com'
richard_email = 'ratrevor@asdasd.com'
email_test = 'email_test'

# Create your tests here.
class UserModelTest(TestCase):

    def setUp(self):
        print('Setting up user test')
        User.objects.create_user('richard', 'trevorrow', richard_email, 'DOCTOR')
        User.objects.create_user('hannah', 'abers', hannah_email, 'PATIENT')

    def test_user_email(self):
        user_richard = User.objects.get(email=richard_email)
        user_hannah = User.objects.get(email=hannah_email)
        self.assertEqual(user_richard.get_email(), richard_email)
        self.assertEqual(user_hannah.get_email(), hannah_email)

    def tearDown(self):
        print('Tearing down user test')
        User.objects.get(email=richard_email).delete()
        User.objects.get(email=hannah_email).delete()

class UserAPITest(APITestCase):
    def setUp(self):
        print('Setting up API tests')
        self.current_user_count = User.objects.count()
        self.new_user = {
            'first_name': 'first_name_test',
            'last_name': 'last_name_test',
            'email': email_test,
            'role': 'PATIENT'
        }
        self.url = '/api/users'
    
    def test_create_user(self):
        response = self.client.post(self.url, self.new_user, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, 'User created')

        self.new_user_count = User.objects.count()
        self.assertEqual(self.current_user_count, self.new_user_count)
    
    def tearDown(self):
        print('Tearing down API tests')
        User.objects.get(email=email_test).delete()