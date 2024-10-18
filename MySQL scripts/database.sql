-- Create a database in MySQL workbench (right click, create schema, double click to select the new db)
-- Drop all tables to start fresh
DROP SCHEMA IF EXISTS peer_assessment_app;
CREATE SCHEMA peer_assessment_app;
USE peer_assessment_app;

-- TABLES
-- Create instructors table
CREATE TABLE instructors (
	i_id INT AUTO_INCREMENT PRIMARY KEY,
    i_name VARCHAR(50) NOT NULL,
    i_email VARCHAR(50) UNIQUE NOT NULL,
    i_password VARCHAR(60) NOT NULL
);

-- Create students table
CREATE TABLE students (
    s_id INT AUTO_INCREMENT PRIMARY KEY,
    s_name VARCHAR(50) NOT NULL,
    s_email VARCHAR(50) UNIQUE NOT NULL,
    s_password VARCHAR(60) NOT NULL
);

-- Create courses table
CREATE TABLE courses (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    c_name VARCHAR(50) UNIQUE NOT NULL,
    instructor_id INT NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(i_id)
);

-- Create teams table
CREATE TABLE teams (
    t_id INT AUTO_INCREMENT PRIMARY KEY,
    t_name VARCHAR(50) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id)
);

-- RELATIONS
-- Create team_student relation
CREATE TABLE team_student (
    team_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(t_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    -- Make sure student is not added twice to a team
    UNIQUE(team_id, student_id)
);    

-- Create course_student relation
CREATE TABLE course_student (
    course_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    FOREIGN KEY (student_id) REFERENCES students(s_id),
    -- Make sure student is not added twice to a course
    UNIQUE(course_id, student_id)
);


-- Ratings ----------------------

-- Cooperation, Conceptual Contribution, Practical COntribution, Work Ethic
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
    -- comment VARCHAR(200), ???
    FOREIGN KEY (reviewed_id) REFERENCES students(s_id),
    FOREIGN KEY (reviewing_id) REFERENCES students(s_id),
    FOREIGN KEY (criteria_id) REFERENCES criterias(criteria_id),
    FOREIGN KEY (course_id) REFERENCES courses(c_id),
    -- Make sure student reviews another one for a course only once
    UNIQUE (reviewed_id, reviewing_id, criteria_id, course_id)
);