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
-- Changing all values to 1 here just to test database connection.
INSERT INTO courses (c_name, instructor_id)
VALUES
('SOEN-341', 1),
('COMP-346', 1),
('COMP-352', 1);

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

INSERT INTO teams (t_name, course_id)
VALUES ('Team 1', 1), ('Team 2', 1), ('Team 3', 1),
       ('Team 1', 2), ('Team 2', 2), ('Team 3', 2),
       ('Team 1', 3), ('Team 2', 3), ('Team 3', 3);

INSERT INTO team_student (team_id, student_id, course_id)
VALUES (1,1,1), (1,2,1), (1,3,1), (1,4,1),
       (2,5,1), (2,6,1), (2,7,1), (2,8,1);


-- Ratings ---------------------

INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score, comment)
VALUES
(1, 2, 5, 'Very cooperative', 4, 'Good understanding of concepts', 3, 'Needs improvement in practical tasks', 5, 'Excellent work ethic', 1, 4.3, 'Overall a great teammate'),
(2, 1, 4, 'Cooperative but can improve', 5, 'Excellent understanding of concepts', 4, 'Good practical skills', 4, 'Good work ethic', 1, 4.2, 'Good teammate overall'),
(3, 4, 3, 'Average cooperation', 3, 'Needs better understanding of concepts', 2, 'Struggles with practical tasks', 3, 'Work ethic needs improvement', 1, 2.8, 'Needs to improve in several areas'),
(5, 6, 5, 'Very cooperative and helpful', 5, 'Strong conceptual understanding', 5, 'Excellent practical skills', 5, 'Great work ethic', 2, 5.0, 'An outstanding teammate'),
(6, 5, 4, 'Cooperative but a bit reserved', 4, 'Good understanding of concepts', 3, 'Could improve practical skills', 4, 'Solid work ethic', 2, 3.8, 'A reliable teammate');

-- Inserting additional reviews for the same reviewees by different reviewers

-- Reviewee: Student 2 (Emily Davis), Reviewed by Students 1, 3, and 4
INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score, comment)
VALUES
(1, 2, 5, 'Very cooperative', 4, 'Good understanding of concepts', 3, 'Needs improvement in practical tasks', 5, 'Excellent work ethic', 1, 4.3, 'Overall a great teammate'),
(3, 2, 4, 'Cooperative but can improve', 5, 'Excellent conceptual understanding', 4, 'Good practical skills', 4, 'Good work ethic', 1, 4.2, 'Good teammate overall'),
(4, 2, 3, 'Average cooperation', 3, 'Needs better understanding of concepts', 2, 'Struggles with practical tasks', 3, 'Work ethic needs improvement', 1, 2.8, 'Needs to improve in several areas');

-- Reviewee: Student 5 (Daniel Harris), Reviewed by Students 6 and 7
INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score, comment)
VALUES
(6, 5, 5, 'Very cooperative and helpful', 5, 'Strong conceptual understanding', 5, 'Excellent practical skills', 5, 'Great work ethic', 2, 5.0, 'An outstanding teammate'),
(7, 5, 4, 'Cooperative but a bit reserved', 4, 'Good understanding of concepts', 3, 'Could improve practical skills', 4, 'Solid work ethic', 2, 3.8, 'A reliable teammate');

-- Reviewee: Student 6 (Olivia Martinez), Reviewed by Students 5 and 8
INSERT INTO ratings (reviewer_id, reviewee_id ,cooperative_score ,cooperative_comment ,conceptual_score ,conceptual_comment ,practical_score ,practical_comment ,work_ethic_score ,work_ethic_comment ,team_id ,overall_score ,comment)
VALUES
(5 ,6 ,4 ,'Helpful but needs more initiative' ,4 ,'Good conceptual understanding' ,3 ,'Practical skills need improvement' ,4 ,'Work ethic is solid' ,2 ,3.9 ,'A good teammate with room for growth'),
(8 ,6 ,5 ,'Always willing to help' ,5 ,'Excellent grasp of concepts' ,5 ,'Strong in practical tasks' ,5 ,'Outstanding work ethic' ,2 ,4.9 ,'An excellent team member');