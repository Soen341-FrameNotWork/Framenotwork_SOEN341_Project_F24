import requests
import pprint
import random
import pytest
import logging
import mysql.connector
from mysql.connector import Error
import bcrypt

from tests.test_signin_api import get_csrf_token
from tests.test_team_view import login_instructor, INSTRUCTOR_EMAIL, INSTRUCTOR_PASSWORD

BASE_URL = "http://localhost:3000/api"

logging.basicConfig(
    filename="test_log.log",
    filemode="w",
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

DB_HOST = "127.0.0.1"
DB_PORT = "3306"
DB_USER = "root"
DB_PASSWORD = "password123"
DB_DATABASE = "SOEN341"


def print_all_students(cursor):
    get_all_students_query = "SELECT s_email FROM students"
    cursor.execute(get_all_students_query)
    all_students = cursor.fetchall()
    for student in all_students:
        print(student)


def add_students_to_course() -> list:
    """ """
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            database=DB_DATABASE,
            user=DB_USER,
            password=DB_PASSWORD,
        )

        if connection.is_connected():
            cursor = connection.cursor()

            student_data = []
            for i in range(1, 20):
                s_name = f"Student {i}"
                s_email = f"student{i}@example.com"
                plain_password = f"studentpass{i}"

                hashed_password = bcrypt.hashpw(
                    plain_password.encode("utf-8"), bcrypt.gensalt()
                )
                student_data.append((s_name, s_email, hashed_password.decode("utf-8")))

            check_if_student_exists_query = (
                "SELECT s_email FROM students WHERE s_email = %s"
            )

            for student in student_data:
                cursor.execute(check_if_student_exists_query, (student[1],))
                if cursor.fetchone():
                    print(f"{student[1]} already exists --- Skipping insertion.")
                    continue
                cursor.execute(
                    "INSERT INTO students (s_name, s_email, s_password) VALUES (%s, %s, %s)",
                    student,
                )
                connection.commit()

            get_new_student_ids_query = "SELECT s_id FROM students WHERE s_email = %s"

            new_student_ids = []

            for student in student_data:
                cursor.execute(get_new_student_ids_query, (student[1],))
                result = cursor.fetchone()
                if result:
                    new_student_ids.append(result[0])

            course_id = 1
            # course_student_data = [(course_id, s_id) for s_id in new_student_ids]

            check_enrollment_query = """
            SELECT COUNT(*) FROM course_student WHERE course_id = %s AND student_id = %s
            """

            insert_course_student_query = """
            INSERT INTO course_student (course_id, student_id)
            VALUES (%s, %s)
            """

            course_student_data = []

            for s_id in new_student_ids:

                print(f"Checking {s_id} enrollment in course {course_id}")
                cursor.execute(check_enrollment_query, (course_id, s_id))
                count = cursor.fetchone()

                if count[0] == 0:
                    course_student_data.append((course_id, s_id))

            if course_student_data:

                cursor.executemany(insert_course_student_query, course_student_data)
                connection.commit()
                print(f"Enrolled {cursor.rowcount} students in course {course_id}.")
            else:
                print("No new students to enroll.")
            return new_student_ids

    except Error as e:
        print("Error while connecting to MySQL:", e)

    finally:
        if "connection" in locals() and connection.is_connected():
            if "cursor" in locals():
                cursor.close()
            connection.close()
            print("MySQL connection is closed.")


def test_team_creation(login_instructor):
    new_student_ids = add_students_to_course()

    cookies = login_instructor
    response = requests.get(f"{BASE_URL}/students?courseId=1", cookies=cookies)

    logger.info("GET Response status: %s", response.status_code)
    logger.info("GET Response text: %s", response.text)
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    response_json = response.json()
    cookies = response.cookies

    team_name = "Team test"

    post_data = {}

    """
    {
        "students":[
            {"id":27,"s_id":27,"lastName":"17","firstName":"Student","email":"student17@example.com","s_name":"Student 17"},
            {"id":26,"s_id":26,"lastName":"16","firstName":"Student","email":"student16@example.com","s_name":"Student 16"},
            {"id":28,"s_id":28,"lastName":"18","firstName":"Student","email":"student18@example.com","s_name":"Student 18"}
        ],
        "course_id":"1",
        "team_name":"testhhst"
        }
    """

    post_data["students"] = []

    for student in response_json:
        if student["s_id"] in new_student_ids[:5]:
            name_parts = student["s_name"].split(" ", 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ""

            post_data["students"].append(
                {
                    "id": student["s_id"],
                    "s_id": student["s_id"],
                    "lastName": last_name,
                    "firstName": first_name,
                    "email": student["s_email"],
                    "name": student["s_name"],
                }
            )

    post_data["course_id"] = "1"

    post_data["team_name"] = team_name

    pprint.pprint(post_data)

    response = requests.post(f"{BASE_URL}/create-team", json=post_data, cookies=cookies)

    pprint.pprint(response.json())

    logger.info("POST Response status: %s", response.status_code)
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"
    assert response.json() == {"message": "Team created successfully"}


def test_fail_create_duplicate_team(login_instructor):
    new_student_ids = add_students_to_course()

    cookies = login_instructor
    response = requests.get(f"{BASE_URL}/students?courseId=1", cookies=cookies)

    logger.info("GET Response status: %s", response.status_code)
    logger.info("GET Response text: %s", response.text)
    assert response.status_code == 200, f"Expected 200 but got {response.status_code}"

    response_json = response.json()
    cookies = response.cookies

    team_name = "Team test"

    post_data = {}

    """
    {
        "students":[
            {"id":27,"s_id":27,"lastName":"17","firstName":"Student","email":"student17@example.com","s_name":"Student 17"},
            {"id":26,"s_id":26,"lastName":"16","firstName":"Student","email":"student16@example.com","s_name":"Student 16"},
            {"id":28,"s_id":28,"lastName":"18","firstName":"Student","email":"student18@example.com","s_name":"Student 18"}
        ],
        "course_id":"1",
        "team_name":"testhhst"
        }
    """

    post_data["students"] = []

    for student in response_json:
        if student["s_id"] in new_student_ids[5:10]:
            name_parts = student["s_name"].split(" ", 1)
            first_name = name_parts[0]
            last_name = name_parts[1] if len(name_parts) > 1 else ""

            post_data["students"].append(
                {
                    "id": student["s_id"],
                    "s_id": student["s_id"],
                    "lastName": last_name,
                    "firstName": first_name,
                    "email": student["s_email"],
                    "name": student["s_name"],
                }
            )

    post_data["course_id"] = "1"

    post_data["team_name"] = team_name

    pprint.pprint(post_data)

    response = requests.post(f"{BASE_URL}/create-team", json=post_data, cookies=cookies)
    response = requests.post(f"{BASE_URL}/create-team", json=post_data, cookies=cookies)

    pprint.pprint(response.json())

    logger.info("POST Response status: %s", response.status_code)
    assert response.status_code == 500, f"Expected 500 but got {response.status_code}"
    assert response.json() == {"error": "Error inserting data"}
