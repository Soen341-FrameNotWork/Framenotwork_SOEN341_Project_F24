-- student name,s_id
-- given t_id

-- how many paper:


-- select S.id, S.s_name from students S
-- join (SELECT student_id FROM team_student WHERE team_id = 1) AS student_ids
-- on S.s_id = student_ids.student_id;




-- select S.s_name as reviewee,S2.s_name as reviewer, R.* from Students S,
-- (select * from ratings as R1
--     join (select S1.s_id, S1.s_name 
--           from students S1
--           join (SELECT student_id
--                 FROM team_student 
--                 WHERE team_student.team_id = 1) AS student_ids
--     on S1.s_id = student_ids.student_id) as student_team
-- ON R1.reviewee_id = student_team.s_id) as R, 
-- Students S2
-- where S2.s_id = R.reviewer_id;


-- SELECT 
--     S_reviewee.s_name AS reviewee_name, 
--     S_reviewer.s_name AS reviewer_name, 
--     R.cooperative_score, 
--     R.cooperative_comment, 
--     R.conceptual_score, 
--     R.conceptual_comment, 
--     R.practical_score, 
--     R.practical_comment, 
--     R.work_ethic_score, 
--     R.work_ethic_comment, 
--     R.overall_score
-- FROM ratings R
-- JOIN students S_reviewer ON R.reviewer_id = S_reviewer.s_id
-- JOIN students S_reviewee ON R.reviewee_id = S_reviewee.s_id
-- WHERE R.reviewee_id = 2;

SELECT 
    S_reviewee.s_name AS reviewee_name, 
    S_reviewer.s_name AS reviewer_name,
    T.t_name as team_name,
    T.t_id as team_id,
    R.cooperative_score, 
    R.cooperative_comment, 
    R.conceptual_score, 
    R.conceptual_comment, 
    R.practical_score, 
    R.practical_comment, 
    R.work_ethic_score, 
    R.work_ethic_comment,
    R.overall_score
FROM ratings R
JOIN students S_reviewer ON R.reviewer_id = S_reviewer.s_id
JOIN students S_reviewee ON R.reviewee_id = S_reviewee.s_id
JOIN team_student TS ON S_reviewee.s_id = TS.student_id
JOIN teams as T ON T.t_id = R.team_id
WHERE T.course_id = 1
;