import requests
import random
import pytest
import logging

from tests.test_signin_api import get_csrf_token

BASE_URL = "http://localhost:3000/api"

logging.basicConfig(
    filename="test_log.log",
    filemode="w",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


INSTRUCTOR_EMAIL = "joumana.dargham@concordia.ca"
INSTRUCTOR_PASSWORD = "password123"

@pytest.fixture
def login_instructor():
    """
    Fixture to log in as an instructor and return the authenticated session cookies.
    """
    csrf_token, cookies = get_csrf_token()

    if csrf_token is None:
        pytest.fail("CSRF token not found")

    response = requests.post(
        f"{BASE_URL}/auth/callback/credentials",
        data={
            "email": INSTRUCTOR_EMAIL,
            "password": INSTRUCTOR_PASSWORD,
            "userType": "instructor",
            "csrfToken": csrf_token,
            "callbackUrl": "http://localhost:3000/signin",
            "json": "true",
        },
        cookies=cookies,
    )

    logger.debug("Login Response status: %s", response.status_code)
    logger.debug("Login Response text: %s", response.text)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert response.json().get("url") in [
        "http://localhost:3000/api/auth/signin?csrf=true",
        "http://localhost:3000/signin",
    ], "Unexpected callback URL"

    # Return authenticated cookies
    return response.cookies


def test_get_class_id_1(login_instructor):
    """
    Test the /students endpoint for a specific class ID.

    Expected response:
    [
        {"s_id":1,"s_name":"John Smith","s_email":"john.smith@example.com"},
        {"s_id":2,"s_name":"Emily Davis","s_email":"emily.davis@example.com"},
        {"s_id":3,"s_name":"Michael Wilson","s_email":"michael.wilson@example.com"},
        {"s_id":4,"s_name":"Jessica Taylor","s_email":"jessica.taylor@example.com"},
        {"s_id":5,"s_name":"Daniel Harris","s_email":"daniel.harris@example.com"},
        {"s_id":6,"s_name":"Olivia Martinez","s_email":"olivia.martinez@example.com"},
        {"s_id":7,"s_name":"James Lewis","s_email":"james.lewis@example.com"},
        {"s_id":8,"s_name":"Grace Walker","s_email":"grace.walker@example.com"},
        {"s_id":9,"s_name":"Benjamin King","s_email":"benjamin.king@example.com"},
        {"s_id":10,"s_name":"Ava Scott","s_email":"ava.scott@example.com"}
    ]
    """
    cookies = login_instructor
    response = requests.get(f"{BASE_URL}/students?courseId=1", cookies=cookies)

    logger.info("GET Response status: %s", response.status_code)
    logger.info("GET Response text: %s", response.text)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    response_json = response.json()

    for student in response_json:
        assert "s_id" in student
        assert "s_name" in student
        assert "s_email" in student

        assert student["s_id"] > 0
        assert student["s_name"]
        assert student["s_email"]

def test_get_class_wrong_id(login_instructor):
    cookies = login_instructor
    response = requests.get(f"{BASE_URL}/students?courseId=9999999", cookies=cookies)

    logger.info("GET Response status: %s", response.status_code)
    logger.info("GET Response text: %s", response.text)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    response_json = response.json()

    assert response_json == []




