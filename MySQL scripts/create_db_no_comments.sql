DROP SCHEMA IF EXISTS SOEN341;
CREATE SCHEMA SOEN341;
USE SOEN341;


CREATE TABLE instructors (
	i_id INT AUTO_INCREMENT PRIMARY KEY,
    i_name VARCHAR(50) NOT NULL,
    i_email VARCHAR(50) UNIQUE NOT NULL,
    i_password VARCHAR(60) NOT NULL
);



CREATE TABLE students (
    s_id INT AUTO_INCREMENT PRIMARY KEY,
    s_name VARCHAR(50) NOT NULL,
    s_email VARCHAR(50) UNIQUE NOT NULL,
    s_password VARCHAR(60) NOT NULL
);



CREATE TABLE courses (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(50) UNIQUE NOT NULL,
    instructor_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(i_id)
);


CREATE TABLE teams (
    t_id INT AUTO_INCREMENT PRIMARY KEY,
    t_name VARCHAR(50) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE(t_name, course_id)
);



CREATE TABLE team_student (
    team_id INT NOT NULL,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(t_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE(student_id, course_id)
);    



CREATE TABLE course_student (
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    UNIQUE (course_id, student_id)
);


CREATE TABLE criterias (             
    criteria_id INT AUTO_INCREMENT PRIMARY KEY,
    criteria_name VARCHAR(50) NOT NULL
);

CREATE TABLE ratings (
    r_id INT AUTO_INCREMENT PRIMARY KEY,
    reviewed_id INT NOT NULL, -- Who is being reviewed
    reviewing_id INT NOT NULL, -- Who is reviewing
    criteria_id INT NOT NULL,
    course_id INT NOT NULL,
    score INT NOT NULL CHECK (score >=1 AND score <= 7),

    FOREIGN KEY (reviewed_id) REFERENCES students(s_id),
    FOREIGN KEY (reviewing_id) REFERENCES students(s_id),
    FOREIGN KEY (criteria_id) REFERENCES criterias(criteria_id),
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    UNIQUE (reviewed_id, reviewing_id, criteria_id, course_id)
);