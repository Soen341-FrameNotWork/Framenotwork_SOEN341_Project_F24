import requests
from tests.test_team_view import login_student, BASE_URL


def test_submit_rating(login_student):
    """
    Test the /ratings endpoint for submitting a rating.
    This is the team proposed feature.
    """

    cookies = login_student

    url = f"{BASE_URL}/teams/ratings"

    data = {
        "id": 3,
        "teamId": 1,
        "cooperation": 2,
        "conceptual": 3,
        "practical": 5,
        "workEthic": 5,
        "cooperationComment": "Comment1",
        "conceptualComment": "Comment2",
        "practicalComment": "Comment3",
        "workEthicComment": "Comment4",
        "overallScore": "3.8",
    }

    response = requests.post(url, json=data, cookies=cookies)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    assert response.json() == {"message":"Rating added successfully"}


def test_sumbit_rating_non_existent_student(login_student):
    """
    Test the /ratings endpoint for submitting a rating for a non-existent student.
    """

    cookies = login_student

    url = f"{BASE_URL}/teams/ratings"

    data = {
        "id": 666,
        "teamId": 1,
        "cooperation": 2,
        "conceptual": 3,
        "practical": 5,
        "workEthic": 5,
        "cooperationComment": "Comment1",
        "conceptualComment": "Comment2",
        "practicalComment": "Comment3",
        "workEthicComment": "Comment4",
        "overallScore": "3.8",
    }

    response = requests.post(url, json=data, cookies=cookies)

    assert response.status_code == 500, f"Expected 500 but got {response.status_code}"

    assert response.json() == {'error': 'Failed to add rating'}


def test_submit_rating_no_data(login_student):
    """
    Test the /ratings endpoint for submitting a rating with no data.
    """

    cookies = login_student

    url = f"{BASE_URL}/teams/ratings"

    data = {}

    response = requests.post(url, json=data, cookies=cookies)

    assert response.status_code == 500, f"Expected 500 but got {response.status_code}"

    assert response.json() == {'error': 'Failed to add rating'}


def test_submit_rating_wrong_team_id(login_student):
    """
    Test the /ratings endpoint for submitting a rating for a non-existent team.
    """

    cookies = login_student

    url = f"{BASE_URL}/teams/ratings"

    data = {
        "id": 666,
        "teamId": 1,
        "cooperation": 2,
        "conceptual": 3,
        "practical": 5,
        "workEthic": 5,
        "cooperationComment": "Comment1",
        "conceptualComment": "Comment2",
        "practicalComment": "Comment3",
        "workEthicComment": "Comment4",
        "overallScore": "3.8",
    }

    response = requests.post(url, json=data, cookies=cookies)

    assert response.status_code == 500, f"Expected 500 but got {response.status_code}"

    assert response.json() == {'error': 'Failed to add rating'}
