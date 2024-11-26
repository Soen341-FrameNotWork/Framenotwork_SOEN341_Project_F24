
from tests.test_team_view import login_instructor


# TODO do the login_student fixture
def test_submit_eval(login_instructor):
    """
    Test the /evaluation endpoint for a specific class ID.
    """

    cookies = login_instructor

