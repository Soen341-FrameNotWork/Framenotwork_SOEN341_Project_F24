import requests
import random
import pytest
import logging

BASE_URL = "http://localhost:3000/api"

logging.basicConfig(
    filename="test_log.log",
    filemode="w",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


RANDOM_EMAIL = f"test{random.randint(1, 1000)}@example.com"
PASSWORD = "securepassword123"


@pytest.fixture(scope="module")
def register_user():
    response = requests.post(
        f"{BASE_URL}/register",
        json={
            "firstName": "Jane",
            "lastName": "Doe",
            "email": RANDOM_EMAIL,
            "password": PASSWORD,
            "userType": "student",
        },
    )
    assert response.status_code == 201
    assert response.json() == {"message": "User registered successfully"}
    logger.debug("Sign-in response: %s", response.json())

    print(response.json())

    return response.json()


def get_csrf_token():
    # Initiate a new session to ensure fresh cookies and CSRF token
    session = requests.Session()
    try:
        response = session.get(f"{BASE_URL}/auth/csrf")
        response.raise_for_status()

        csrf_token = response.json().get("csrfToken")
        if csrf_token:
            logger.debug("Fetched CSRF token: %s", csrf_token)
            return csrf_token, session.cookies.get_dict()
        else:
            logger.error("CSRF token not found in response")
            return None, None
    except requests.RequestException as e:
        logger.error("Error fetching CSRF token: %s", e)
        return None, None


def test_signin_success(register_user):

    csrf_token, cookies = get_csrf_token()

    if csrf_token is None:
        pytest.fail("CSRF token not found")

    response = requests.post(
        f"{BASE_URL}/auth/callback/credentials",
        data={
            "email": RANDOM_EMAIL,
            "password": PASSWORD,
            "userType": "student",
            "csrfToken": csrf_token,
            "callbackUrl": "http://localhost:3000/signin",
            "json": "true",
        },
        cookies=cookies,
    )

    logger.debug("Response status: %s", response.status_code)
    logger.debug("Response text: %s", response.text)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert response.text in [
        '{"url":"http://localhost:3000/api/auth/signin?csrf=true"}',
        '{"url":"http://localhost:3000/signin"}',
    ]


def test_signin_failure():
    csrf_token, cookies = get_csrf_token()

    if csrf_token is None:
        pytest.fail("CSRF token not found")

    random_password = f"wrongpassword{random.randint(1, 1000)}"

    response = requests.post(
        f"{BASE_URL}/auth/callback/credentials",
        data={
            "email": "teh@etisha.com",
            "password": random_password,
            "userType": "student",
            "csrfToken": csrf_token,
            "callbackUrl": "http://localhost:3000/signin",
            "json": "true",
        },
        cookies=cookies,
    )

    logger.debug("Response status: %s", response.status_code)
    logger.debug("Response text: %s", response.text)

    assert response.status_code == 401, f"Expected 401 but got {response.status_code}"
    assert (
        response.text
        == '{"url":"http://localhost:3000/api/auth/error?error=CredentialsSignin&provider=credentials"}'
    )
