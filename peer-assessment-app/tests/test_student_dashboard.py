import requests
from tests.test_team_view import login_student, BASE_URL


# TODO do the login_student fixture
def test_see_rating(login_student):
    """
    Test the /rating endpoint for a specific class ID.
    This is the team proposed feature.
    """

    cookies = login_student

    url = f"{BASE_URL}/students/rating?courseId=1"
    response = requests.get(url, cookies=cookies)
    print(response.json())

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    data = response.json()

    expected_response = {
        "message": "Success",
        "data": {
            "scores": {
                "cooperative_score": 4,
                "conceptual_score": 4,
                "practical_score": 3,
                "work_ethic_score": 4,
                "overall_score": 3.8,
            }
        },
        "raw_ratings": [
            {
                "cooperative_score": 5,
                "conceptual_score": 4,
                "practical_score": 3,
                "work_ethic_score": 5,
            },
            {
                "cooperative_score": 4,
                "conceptual_score": 5,
                "practical_score": 4,
                "work_ethic_score": 4,
            },
            {
                "cooperative_score": 3,
                "conceptual_score": 3,
                "practical_score": 2,
                "work_ethic_score": 3,
            },
        ],
    }

    assert data == expected_response, f"Unexpected response: {data}"


def test_see_teammates(login_student):
    """
    Test the /teammates endpoint for a specific class ID.
    """

    cookies = login_student

    url = f"{BASE_URL}/teams/teammates?courseId=1"
    response = requests.get(url, cookies=cookies)
    print(response.json())

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    data = response.json()

    expected_response = [{'s_id': 1, 's_name': 'John Smith', 'team_id': 1}, {'s_id': 3, 's_name': 'Michael Wilson', 'team_id': 1}, {'s_id': 4, 's_name': 'Jessica Taylor', 'team_id': 1}]

    assert data == expected_response, f"Unexpected response: {data}"
