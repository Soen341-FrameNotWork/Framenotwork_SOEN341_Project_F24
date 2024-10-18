-- Population script
-- Run after db is created

-- Populate instructors
INSERT INTO instructors (i_name, i_email, i_password) 
VALUES 
('Joumana Dargham', 'joumana.dargham@concordia.ca', 'password123'),
('David Johnson', 'david.johnson@example.com', 'password456'),
('Sophia White', 'sophia.white@example.com', 'password789');

-- Populate students
INSERT INTO students (s_name, s_email, s_password) 
VALUES 
('John Smith', 'john.smith@example.com', 'studypass1'),
('Emily Davis', 'emily.davis@example.com', 'studypass2'),
('Michael Wilson', 'michael.wilson@example.com', 'studypass3'),
('Jessica Taylor', 'jessica.taylor@example.com', 'studypass4'),
('Daniel Harris', 'daniel.harris@example.com', 'studypass5'),
('Olivia Martinez', 'olivia.martinez@example.com', 'studypass6'),
('James Lewis', 'james.lewis@example.com', 'studypass7'),
('Grace Walker', 'grace.walker@example.com', 'studypass8'),
('Benjamin King', 'benjamin.king@example.com', 'studypass9'),
('Ava Scott', 'ava.scott@example.com', 'studypass10');

-- Populate courses
INSERT INTO courses (c_name, instructor_id)
VALUES
('SOEN-341', 1),
('COMP-346', 2),
('COMP-352', 3);

-- Populate course_student (each student is in each course initially)
INSERT INTO course_student (course_id, student_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(3, 2),
(1, 3),
(2, 3),
(3, 3),
(1, 4),
(2, 4),
(3, 4),
(1, 5),
(2, 5),
(3, 5),
(1, 6),
(2, 6),
(3, 6),
(1, 7),
(2, 7),
(3, 7),
(1, 8),
(2, 8),
(3, 8),
(1, 9),
(2, 9),
(3, 9),
(1, 10),
(2, 10),
(3, 10);

-- teams and team_student are populated later when instructor assigns a student to a team


-- Ratings ---------------------

INSERT INTO criterias (criteria_name)
VALUES
('Cooperation'),
('Conceptual Contribution'),
('Practical Contribution'),
('Work Ethic');