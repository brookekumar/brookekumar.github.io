
INSERT INTO department (name)
VALUES ("R&D"),
("Regulatory"),
("Clinical"),
("Reliability"),
("Corporate");

INSERT INTO role (title,salary,department_id)
VALUES ("Released Product Engineer",150.000,12), 
("Regulatory Affairs Specialist", 120.000, 11),
("Clinical Research Specialist", 80.000, 13),
("Reliability Engineer", 110.000, 9),
("CEO", 4.000.000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Ishrak", 2, 1), 
("Taylor", "Ryla", 3, 2),
("Liam", "Karrington", 4, 3),
("Mehn", "Dorian", 5, 4),
("Omar", "Callahan", 6, 5);
