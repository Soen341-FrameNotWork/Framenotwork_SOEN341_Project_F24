    -- Population script
    -- Run after db is created

    -- Populate instructors
    -- password123:$2a$10$a6CydGET3rRexaVTILsJouWUAuUdeYgG4xrd2ZQ.D1U55fVzzm/8W
    -- password456:$2a$10$9PtnwLjQMz4UzsPeyOEzy.F7gZGgWzmuDCRhVAbR0Ba0VNgVKR/bq
    -- password789:$2a$10$H0IyIgoYKl8vnUM4RfQqdeffkWXCd9dbjma5xfr86scSo3UtRa0.m
-- START TRANSACTION;

-- INSERT INTO instructors (i_name, i_email, i_password) 
-- VALUES 
-- ('Joumana Dargham', 'joumana.dargham@concordia.ca', '$2a$10$a6CydGET3rRexaVTILsJouWUAuUdeYgG4xrd2ZQ.D1U55fVzzm/8W'),
-- ('David Johnson', 'david.johnson@example.com', '$2a$10$9PtnwLjQMz4UzsPeyOEzy.F7gZGgWzmuDCRhVAbR0Ba0VNgVKR/bq'),
-- ('Sophia White', 'sophia.white@example.com', '$2a$10$H0IyIgoYKl8vnUM4RfQqdeffkWXCd9dbjma5xfr86scSo3UtRa0.m');



    -- -- Populate students
    -- -- studypass1:$2a$10$PYmygRRspZwM7BIeR0ukc.WN1bMQduq9D.LWAMKgSv1kaQ63D8AF.
    -- -- studypass2:$2a$10$DvY58CCwtAWNm4zAn9alQO.bUPhJ3lF0YRpHqQomVFiDg8F23qVXi
    -- -- studypass3:$2a$10$QBjZOtNkQ.tADyMeCY5TxOMmwZtvAxl3.A2JYXOFrOsY5NfZE59n6
    -- -- studypass4:$2a$10$RCHVWmIKnvO.8PNbQ7Som.4hKR/yky5VIHORRA28D79I8CcKVjP2C
    -- -- studypass5:$2a$10$HSMfjopJIL0uAvM5q/4Ty.6oUHzDnjkq3GCEo9vUsoMQ24zU8KX2K
    -- -- studypass6:$2a$10$5hyL15y01v68S90INmkAB.6vdp/t6od/RpBmRTdXEC8IeyTrDFpte
    -- -- studypass7:$2a$10$oY58AK3qYG8AjSUea90sbO3FOFCuVTz/Xygf2oVNnowzJEFVkrVm.
    -- -- studypass8:$2a$10$P1HIsHgE3zE1sW94jBo0jeSVRwNFLNrR/NQZXifHCEdKPAWaETiCm
    -- -- studypass9:$2a$10$gAhMS7raOHRyazRuP8/wmeS4ftPg8aCaru422r5Stin3ChOfZWfz.
    -- -- studypass10:$2a$10$oOnBD7JG/9hAgfyIC2EFAOCsnfTR//EF.giGBSFY5v2nRPpkfrma6

-- INSERT INTO students (s_name, s_email, s_password) 
-- VALUES 
-- ('John Smith', 'john.smith@example.com', '$2a$10$PYmygRRspZwM7BIeR0ukc.WN1bMQduq9D.LWAMKgSv1kaQ63D8AF.'),
-- ('Emily Davis', 'emily.davis@example.com', '$2a$10$DvY58CCwtAWNm4zAn9alQO.bUPhJ3lF0YRpHqQomVFiDg8F23qVXi'),
-- ('Michael Wilson', 'michael.wilson@example.com', '$2a$10$QBjZOtNkQ.tADyMeCY5TxOMmwZtvAxl3.A2JYXOFrOsY5NfZE59n6'),
-- ('Jessica Taylor', 'jessica.taylor@example.com', '$2a$10$RCHVWmIKnvO.8PNbQ7Som.4hKR/yky5VIHORRA28D79I8CcKVjP2C'),
-- ('Daniel Harris', 'daniel.harris@example.com', '$2a$10$HSMfjopJIL0uAvM5q/4Ty.6oUHzDnjkq3GCEo9vUsoMQ24zU8KX2K'),
-- ('Olivia Martinez', 'olivia.martinez@example.com', '$2a$10$5hyL15y01v68S90INmkAB.6vdp/t6od/RpBmRTdXEC8IeyTrDFpte'),
-- ('James Lewis', 'james.lewis@example.com', '$2a$10$oY58AK3qYG8AjSUea90sbO3FOFCuVTz/Xygf2oVNnowzJEFVkrVm.'),
-- ('Grace Walker', 'grace.walker@example.com', '$2a$10$P1HIsHgE3zE1sW94jBo0jeSVRwNFLNrR/NQZXifHCEdKPAWaETiCm'),
-- ('Benjamin King', 'benjamin.king@example.com', '$2a$10$gAhMS7raOHRyazRuP8/wmeS4ftPg8aCaru422r5Stin3ChOfZWfz.'),
-- ('Ava Scott', 'ava.scott@example.com', '$2a$10$oOnBD7JG/9hAgfyIC2EFAOCsnfTR//EF.giGBSFY5v2nRPpkfrma6');

--     -- -- Populate courses
--     -- -- Changing all values to 1 here just to test database connection.

-- INSERT INTO courses (c_name, instructor_id)
-- VALUES
-- ('SOEN-341', 1),
-- ('COMP-346', 1),
-- ('COMP-352', 1);



-- INSERT INTO course_student (course_id, student_id)
-- VALUES
-- (1, 1),
-- (2, 1),
-- (3, 1),
-- (1, 2),
-- (2, 2),
-- (3, 2),
-- (1, 3),
-- (2, 3),
-- (3, 3),
-- (1, 4),
-- (2, 4),
-- (3, 4),
-- (1, 5),
-- (2, 5),
-- (3, 5),
-- (1, 6),
-- (2, 6),
-- (3, 6),
-- (1, 7),
-- (2, 7),
-- (3, 7),
-- (1, 8),
-- (2, 8),
-- (3, 8),
-- (1, 9),
-- (2, 9),
-- (3, 9),
-- (1, 10),
-- (2, 10),
-- (3, 10);

-- -- select * from students;

--     -- -- teams and team_student are populated later when instructor assigns a student to a team

-- INSERT INTO teams (t_name, course_id)
-- VALUES ('Team 1', 1), ('Team 2', 1), ('Team 3', 1),
--     ('Team 1', 2), ('Team 2', 2), ('Team 3', 2),
--     ('Team 1', 3), ('Team 2', 3), ('Team 3', 3);

-- INSERT INTO team_student (team_id, student_id, course_id)
-- VALUES (1,1,1), (1,2,1), (1,3,1), (1,4,1),
--     (2,5,1), (2,6,1), (2,7,1), (2,8,1);


--     -- -- Ratings ---------------------

    -- INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score)
    -- VALUES
    -- (1, 2, 5, 'Very cooperative', 4, 'Good understanding of concepts', 3, 'Needs improvement in practical tasks', 5, 'Excellent work ethic', 1, 4.3),
    -- (2, 1, 4, 'Cooperative but can improve', 5, 'Excellent understanding of concepts', 4, 'Good practical skills', 4, 'Good work ethic', 1, 4.2),
    -- (3, 4, 3, 'Average cooperation', 3, 'Needs better understanding of concepts', 2, 'Struggles with practical tasks', 3, 'Work ethic needs improvement', 1, 2.8),
    -- (5, 6, 5, 'Very cooperative and helpful', 5, 'Strong conceptual understanding', 5, 'Excellent practical skills', 5, 'Great work ethic', 2, 5.0),
    -- (6, 5, 4, 'Cooperative but a bit reserved', 4, 'Good understanding of concepts', 3, 'Could improve practical skills', 4, 'Solid work ethic', 2, 3.8);

--     -- -- Inserting additional reviews for the same reviewees by different reviewers

--     -- -- Reviewee: Student 2 (Emily Davis), Reviewed by Students 1, 3, and 4

-- INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score)
-- VALUES
-- (3, 2, 4, 'Cooperative but can improve', 5, 'Excellent conceptual understanding', 4, 'Good practical skills', 4, 'Good work ethic', 1, 4.2),
-- (4, 2, 3, 'Average cooperation', 3, 'Needs better understanding of concepts', 2, 'Struggles with practical tasks', 3, 'Work ethic needs improvement', 1, 2.8);

--     -- -- Reviewee: Student 5 (Daniel Harris), Reviewed by Students 6 and 7

-- INSERT INTO ratings (reviewer_id, reviewee_id, cooperative_score, cooperative_comment, conceptual_score, conceptual_comment, practical_score, practical_comment, work_ethic_score, work_ethic_comment, team_id, overall_score)
-- VALUES
-- (7, 5, 4, 'Cooperative but a bit reserved', 4, 'Good understanding of concepts', 3, 'Could improve practical skills', 4, 'Solid work ethic', 2, 3.8);

--     -- -- Reviewee: Student 6 (Olivia Martinez), Reviewed by Students 5 and 8

-- INSERT INTO ratings (reviewer_id, reviewee_id ,cooperative_score ,cooperative_comment ,conceptual_score ,conceptual_comment ,practical_score ,practical_comment ,work_ethic_score ,work_ethic_comment ,team_id ,overall_score)
-- VALUES
-- (8 ,6 ,5 ,'Always willing to help' ,5 ,'Excellent grasp of concepts' ,5 ,'Strong in practical tasks' ,5 ,'Outstanding work ethic' ,2 ,4.9);

-- COMMIT;