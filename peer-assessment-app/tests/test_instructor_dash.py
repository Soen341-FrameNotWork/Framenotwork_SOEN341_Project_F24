import requests
import re
from tests.test_team_view import login_instructor, BASE_URL, logger


def test_dashboard(login_instructor):
    """
    Test the /dashboard endpoint for a specific class ID.
    """

    cookies = login_instructor
    url = f"{BASE_URL}/teams/ratings?courseId=1"
    response = requests.get(url, cookies=cookies)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    expected_response = [
        {
            "teamId": 1,
            "teamName": "Team 1",
            "reviewees": [
                {
                    "reviewee_name": "Emily Davis",
                    "ratings": [
                        {
                            "reviewer_name": "John Smith",
                            "cooperative_score": 5,
                            "conceptual_score": 4,
                            "practical_score": 3,
                            "work_ethic_score": 5,
                            "overall_score": "4.3",
                            "comments": {
                                "cooperative_comment": "Very cooperative",
                                "conceptual_comment": "Good understanding of concepts",
                                "practical_comment": "Needs improvement in practical tasks",
                                "work_ethic_comment": "Excellent work ethic",
                            },
                        },
                        {
                            "reviewer_name": "Michael Wilson",
                            "cooperative_score": 4,
                            "conceptual_score": 5,
                            "practical_score": 4,
                            "work_ethic_score": 4,
                            "overall_score": "4.2",
                            "comments": {
                                "cooperative_comment": "Cooperative but can improve",
                                "conceptual_comment": "Excellent conceptual understanding",
                                "practical_comment": "Good practical skills",
                                "work_ethic_comment": "Good work ethic",
                            },
                        },
                        {
                            "reviewer_name": "Jessica Taylor",
                            "cooperative_score": 3,
                            "conceptual_score": 3,
                            "practical_score": 2,
                            "work_ethic_score": 3,
                            "overall_score": "2.8",
                            "comments": {
                                "cooperative_comment": "Average cooperation",
                                "conceptual_comment": "Needs better understanding of concepts",
                                "practical_comment": "Struggles with practical tasks",
                                "work_ethic_comment": "Work ethic needs improvement",
                            },
                        },
                    ],
                },
                {
                    "reviewee_name": "John Smith",
                    "ratings": [
                        {
                            "reviewer_name": "Emily Davis",
                            "cooperative_score": 4,
                            "conceptual_score": 5,
                            "practical_score": 4,
                            "work_ethic_score": 4,
                            "overall_score": "4.2",
                            "comments": {
                                "cooperative_comment": "Cooperative but can improve",
                                "conceptual_comment": "Excellent understanding of concepts",
                                "practical_comment": "Good practical skills",
                                "work_ethic_comment": "Good work ethic",
                            },
                        }
                    ],
                },
                {
                    "reviewee_name": "Jessica Taylor",
                    "ratings": [
                        {
                            "reviewer_name": "Michael Wilson",
                            "cooperative_score": 3,
                            "conceptual_score": 3,
                            "practical_score": 2,
                            "work_ethic_score": 3,
                            "overall_score": "2.8",
                            "comments": {
                                "cooperative_comment": "Average cooperation",
                                "conceptual_comment": "Needs better understanding of concepts",
                                "practical_comment": "Struggles with practical tasks",
                                "work_ethic_comment": "Work ethic needs improvement",
                            },
                        }
                    ],
                },
            ],
        },
        {
            "teamId": 2,
            "teamName": "Team 2",
            "reviewees": [
                {
                    "reviewee_name": "Olivia Martinez",
                    "ratings": [
                        {
                            "reviewer_name": "Daniel Harris",
                            "cooperative_score": 5,
                            "conceptual_score": 5,
                            "practical_score": 5,
                            "work_ethic_score": 5,
                            "overall_score": "5.0",
                            "comments": {
                                "cooperative_comment": "Very cooperative and helpful",
                                "conceptual_comment": "Strong conceptual understanding",
                                "practical_comment": "Excellent practical skills",
                                "work_ethic_comment": "Great work ethic",
                            },
                        },
                        {
                            "reviewer_name": "Grace Walker",
                            "cooperative_score": 5,
                            "conceptual_score": 5,
                            "practical_score": 5,
                            "work_ethic_score": 5,
                            "overall_score": "4.9",
                            "comments": {
                                "cooperative_comment": "Always willing to help",
                                "conceptual_comment": "Excellent grasp of concepts",
                                "practical_comment": "Strong in practical tasks",
                                "work_ethic_comment": "Outstanding work ethic",
                            },
                        },
                    ],
                },
                {
                    "reviewee_name": "Daniel Harris",
                    "ratings": [
                        {
                            "reviewer_name": "Olivia Martinez",
                            "cooperative_score": 4,
                            "conceptual_score": 4,
                            "practical_score": 3,
                            "work_ethic_score": 4,
                            "overall_score": "3.8",
                            "comments": {
                                "cooperative_comment": "Cooperative but a bit reserved",
                                "conceptual_comment": "Good understanding of concepts",
                                "practical_comment": "Could improve practical skills",
                                "work_ethic_comment": "Solid work ethic",
                            },
                        },
                        {
                            "reviewer_name": "James Lewis",
                            "cooperative_score": 4,
                            "conceptual_score": 4,
                            "practical_score": 3,
                            "work_ethic_score": 4,
                            "overall_score": "3.8",
                            "comments": {
                                "cooperative_comment": "Cooperative but a bit reserved",
                                "conceptual_comment": "Good understanding of concepts",
                                "practical_comment": "Could improve practical skills",
                                "work_ethic_comment": "Solid work ethic",
                            },
                        },
                    ],
                },
            ],
        },
    ]

    json_response = response.json()

    assert (
        json_response == expected_response
    ), f"Expected {expected_response} but got {json_response}"


def test_dashboard_invalid_course_id(login_instructor):
    """
    Test the /ratings endpoint for a specific class ID that does not exist.
    """

    cookies = login_instructor
    url = f"{BASE_URL}/teams/ratings?courseId=100"
    response = requests.get(url, cookies=cookies)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert not response.json()


def test_dashboard_no_course_id(login_instructor):
    """
    Test the /ratings endpoint without providing a course ID.
    """

    cookies = login_instructor
    url = f"{BASE_URL}/teams/ratings"
    response = requests.get(url, cookies=cookies)

    assert response.status_code == 400, f"Expected 400 but got {response.status_code}"
    assert response.json() == {"error": "Course ID is required"}


def test_dashboard_summary_result(login_instructor):
    """
    Test the /summary_result endpoint for a specific class ID.
    """

    cookies = login_instructor
    url = f"{BASE_URL}/summary_result?courseId=1"
    response = requests.get(url, cookies=cookies)

    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    json_response = response.json()

    expected_response = {
        "message": "Success",
        "data": [
            {
                "student_id": 1,
                "student_name": "John Smith",
                "team_name": "Team 1",
                "reviewee_id": 1,
                "avg_conceptual_score": "5.0000",
                "avg_cooperative_score": "4.0000",
                "avg_practical_score": "4.0000",
                "avg_work_ethic_score": "4.0000",
                "count_of_reviews": 1,
            },
            {
                "student_id": 2,
                "student_name": "Emily Davis",
                "team_name": "Team 1",
                "reviewee_id": 2,
                "avg_conceptual_score": "4.0000",
                "avg_cooperative_score": "4.0000",
                "avg_practical_score": "3.0000",
                "avg_work_ethic_score": "4.0000",
                "count_of_reviews": 3,
            },
            {
                "student_id": 3,
                "student_name": "Michael Wilson",
                "team_name": "Team 1",
                "avg_conceptual_score": 0,
                "avg_cooperative_score": 0,
                "avg_practical_score": 0,
                "avg_work_ethic_score": 0,
                "count_of_reviews": 0,
            },
            {
                "student_id": 4,
                "student_name": "Jessica Taylor",
                "team_name": "Team 1",
                "reviewee_id": 4,
                "avg_conceptual_score": "3.0000",
                "avg_cooperative_score": "3.0000",
                "avg_practical_score": "2.0000",
                "avg_work_ethic_score": "3.0000",
                "count_of_reviews": 1,
            },
            {
                "student_id": 5,
                "student_name": "Daniel Harris",
                "team_name": "Team 2",
                "reviewee_id": 5,
                "avg_conceptual_score": "4.0000",
                "avg_cooperative_score": "4.0000",
                "avg_practical_score": "3.0000",
                "avg_work_ethic_score": "4.0000",
                "count_of_reviews": 2,
            },
            {
                "student_id": 6,
                "student_name": "Olivia Martinez",
                "team_name": "Team 2",
                "reviewee_id": 6,
                "avg_conceptual_score": "5.0000",
                "avg_cooperative_score": "5.0000",
                "avg_practical_score": "5.0000",
                "avg_work_ethic_score": "5.0000",
                "count_of_reviews": 2,
            },
            {
                "student_id": 7,
                "student_name": "James Lewis",
                "team_name": "Team 2",
                "avg_conceptual_score": 0,
                "avg_cooperative_score": 0,
                "avg_practical_score": 0,
                "avg_work_ethic_score": 0,
                "count_of_reviews": 0,
            },
            {
                "student_id": 8,
                "student_name": "Grace Walker",
                "team_name": "Team 2",
                "avg_conceptual_score": 0,
                "avg_cooperative_score": 0,
                "avg_practical_score": 0,
                "avg_work_ethic_score": 0,
                "count_of_reviews": 0,
            },
            {
                "student_id": 9,
                "student_name": "Benjamin King",
                "team_name": "No team",
                "avg_conceptual_score": 0,
                "avg_cooperative_score": 0,
                "avg_practical_score": 0,
                "avg_work_ethic_score": 0,
                "count_of_reviews": 0,
            },
            {
                "student_id": 10,
                "student_name": "Ava Scott",
                "team_name": "No team",
                "avg_conceptual_score": 0,
                "avg_cooperative_score": 0,
                "avg_practical_score": 0,
                "avg_work_ethic_score": 0,
                "count_of_reviews": 0,
            },
        ],
    }

    assert (
        json_response == expected_response
    ), f"Expected {expected_response} but got {json_response}"
