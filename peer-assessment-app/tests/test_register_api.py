import requests
import random

BASE_URL = "http://localhost:3000/api"


random_email = f"test{random.randint(1, 1000)}@example.com"


def test_register_success():
    response = requests.post(
        f"{BASE_URL}/register",
        json={
            "firstName": "Jane",
            "lastName": "Doe",
            "email": random_email,
            "password": "securepassword123",
            "userType": "student",
        },
    )
    assert response.status_code == 201
    assert response.json() == {"message": "User registered successfully"}


def test_register_missing_fields():
    response = requests.post(
        f"{BASE_URL}/register",
        json={
            "firstName": "Jane",
            "email": random_email,
            "password": "securepassword123",
            "userType": "student",
        },
    )
    assert response.status_code == 400
    assert response.json() == {"error": "Missing required fields"}


def test_register_duplicate_user():
    response = requests.post(
        f"{BASE_URL}/register",
        json={
            "firstName": "Jane",
            "lastName": "Doe",
            "email": random_email,
            "password": "securepassword123",
            "userType": "student",
        },
    )
    assert response.status_code == 400
    assert response.json() == {"error": "User already exists"}


def test_register_invalid_user_type():
    response = requests.post(
        f"{BASE_URL}/register",
        json={
            "firstName": "Jane",
            "lastName": "Doe",
            "email": random_email,
            "password": "securepassword123",
            "userType": "admin",  # NOTE Invalid user type
        },
    )
    assert response.status_code == 400
    assert response.json() == {"error": "Invalid user type"}
