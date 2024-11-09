USE SOEN341;

DROP SCHEMA IF EXISTS SOEN341;
CREATE SCHEMA IF NOT EXISTS SOEN341;



CREATE TABLE IF NOT EXISTS instructors (
	i_id INT AUTO_INCREMENT PRIMARY KEY,
    i_name VARCHAR(50) NOT NULL,
    i_email VARCHAR(50) UNIQUE NOT NULL,
    i_password VARCHAR(60) NOT NULL
);



CREATE TABLE IF NOT EXISTS students (
    s_id INT AUTO_INCREMENT PRIMARY KEY,
    s_name VARCHAR(50) NOT NULL,
    s_email VARCHAR(50) UNIQUE NOT NULL,
    s_password VARCHAR(60) NOT NULL
);



CREATE TABLE IF NOT EXISTS courses (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(50) UNIQUE NOT NULL,
    instructor_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(i_id)
);


CREATE TABLE IF NOT EXISTS teams (
    t_id INT AUTO_INCREMENT PRIMARY KEY,
    t_name VARCHAR(50) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE(t_name, course_id)
);



CREATE TABLE IF NOT EXISTS team_student (
    team_id INT NOT NULL,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(t_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE(student_id, course_id)
);

CREATE TABLE IF NOT EXISTS course_student (
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    UNIQUE (course_id, student_id)
);

CREATE TABLE IF NOT EXISTS ratings (
    r_id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id INT NOT NULL, 
    reviewee_id INT NOT NULL, 
    cooperative_score INT NOT NULL CHECK (cooperative_score >=1 AND cooperative_score <= 5),
    cooperative_comment MEDIUMTEXT,
    conceptual_score INT NOT NULL CHECK (conceptual_score >=1 AND conceptual_score <= 5),
    conceptual_comment MEDIUMTEXT,
    practical_score INT NOT NULL CHECK (communication_score >=1 AND communication_score <= 5),
    practical_comment MEDIUMTEXT,
    work_ethic_score INT NOT NULL CHECK (work_ethic_score >=1 AND work_ethic_score <= 5),
    work_ethic_comment MEDIUMTEXT,
    course_id INT NOT NULL,
    overall_score Decimal(2,1) NOT NULL CHECK (score >=1 AND score <= 5),
    comment MEDIUMTEXT,
    FOREIGN KEY (reviewer_id) REFERENCES students(s_id),
    FOREIGN KEY (reviewee_id) REFERENCES students(s_id),
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE (reviewer_id, reviewee_id, course_id)
);



