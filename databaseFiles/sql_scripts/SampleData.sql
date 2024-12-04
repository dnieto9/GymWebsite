-- Clear the contents of each table first
TRUNCATE TABLE Guest CASCADE;
TRUNCATE TABLE CheckIn CASCADE;
TRUNCATE TABLE Payment CASCADE;
TRUNCATE TABLE Location CASCADE;
TRUNCATE TABLE Member CASCADE;
TRUNCATE TABLE MembershipPlan CASCADE;
TRUNCATE TABLE Manager CASCADE;

Select * from manager;

INSERT INTO Manager (first_name, last_name, phone_number)
VALUES 
    ('Sarah', 'Brown', '555-235-1253'),
    ('Tom', 'White', '555-246-3452'),
    ('Emily', 'Clark', '555-457-1234'),
	('James', 'Lee', '555-458-4535'),
    ('Natalie', 'Tiglao', '555-212-4313'),
	('Antonio', 'Johnson', '555-579-1234'),
	('Dani', 'Superales', '555-342-3425'),
	('Daisy', 'Nieto', '555-342-2341'),
	('Karenna', 'Edwards', '555-342-1234'),
	('Tam', 'Phan', '555-342-3424');


INSERT INTO Location (street, city, state, zip, capacity, manager_id)
VALUES 
    ('101 Fitness Way', 'San Antonio', 'TX', '78201', 100, 2),  -- Manager ID 1
    ('202 Wellness Ave', 'Austin', 'TX', '78701', 150, 2),     -- Manager ID 2
    ('303 Strength Blvd', 'Houston', 'TX', '77001', 200, 3),  -- Manager ID 3
	('606 Vitality Rd', 'Fort Worth', 'TX', '76101', 180, 4),      -- Manager ID 4
    ('707 Wellness Park', 'Corpus Christi', 'TX', '78401', 130, 5),-- Manager ID 5
    ('808 Muscle Ave', 'Plano', 'TX', '75001', 160, 1),            -- Manager ID 6
    ('909 Endurance St', 'Lubbock', 'TX', '79401', 120, 2),        -- Manager ID 7
    ('1010 Cardio Ln', 'Arlington', 'TX', '76001', 140, 3),        -- Manager ID 8
    ('1111 Flex Blvd', 'Frisco', 'TX', '75034', 170, 4),           -- Manager ID 9
    ('1212 Balance Way', 'Irving', 'TX', '75060', 110, 5);         -- Manager ID 10

INSERT INTO MembershipPlan (plan_name, monthly_fee, hasGuest, allAmenities)
VALUES 
    ('Gold', 25.00, TRUE, TRUE),
    ('Silver', 20.00, TRUE, FALSE),
    ('Bronze', 15.00, FALSE, FALSE);

INSERT INTO Member (First_name, Last_name, Gender, DOB, Join_date, Payment_status, Email, Phone_number, Street, City, State, Zip, password, Membership_type)
VALUES 
    ('John', 'Doe', 'Male', '1990-02-15', '2023-01-10', TRUE, 'john.doe@example.com', '555-1234', '123 Elm St', 'San Antonio', 'TX', '78201', 'password123', 1),
    ('Jane', 'Smith', 'Female', '1988-11-20', '2022-12-05', TRUE, 'jane.smith@example.com', '555-5678', '456 Oak St', 'Austin', 'TX', '78701', 'securepass456', 2),
    ('Alex', 'Johnson', 'Non-binary', '1995-07-12', '2023-03-15', FALSE, 'alex.j@example.com', '555-9101', '789 Pine St', 'Houston', 'TX', '77001', 'nonbinarypass789', 3),
    ('Michael', 'Brown', 'Male', '1991-08-09', '2023-04-11', TRUE, 'michael.b@example.com', '555-2345', '123 Maple St', 'San Antonio', 'TX', '78201', 'pass456789', 1),
    ('Emma', 'Wilson', 'Female', '1993-04-18', '2023-02-20', TRUE, 'emma.w@example.com', '555-3333', '456 Cedar St', 'Austin', 'TX', '78701', 'mysecurepass', 2),
    ('Olivia', 'Taylor', 'Female', '1992-06-13', '2023-03-30', TRUE, 'olivia.t@example.com', '555-4444', '789 Birch St', 'Houston', 'TX', '77001', 'passtree789', 1),
    ('Ethan', 'Martinez', 'Male', '1985-12-10', '2023-05-17', FALSE, 'ethan.m@example.com', '555-5555', '101 Palm St', 'Dallas', 'TX', '75201', 'pass5678abc', 3),
    ('Sophia', 'Davis', 'Female', '1994-03-02', '2023-06-10', TRUE, 'sophia.d@example.com', '555-6666', '303 Cherry St', 'El Paso', 'TX', '79901', 'pass987xyz', 2),
    ('William', 'Anderson', 'Male', '1989-07-25', '2023-07-05', TRUE, 'will.a@example.com', '555-7777', '202 Walnut St', 'San Antonio', 'TX', '78201', 'securepass123', 1),
    ('Isabella', 'Moore', 'Female', '1996-11-01', '2023-08-12', FALSE, 'isabella.m@example.com', '555-8888', '505 Magnolia St', 'Austin', 'TX', '78701', 'mypassword999', 3),
    ('James', 'White', 'Male', '1987-09-19', '2023-09-15', TRUE, 'james.w@example.com', '555-9999', '404 Aspen St', 'Houston', 'TX', '77001', 'mypwd123', 1),
    ('Charlotte', 'Thomas', 'Female', '1991-01-14', '2023-10-22', TRUE, 'charlotte.t@example.com', '555-0000', '606 Poplar St', 'Dallas', 'TX', '75201', 'pass101010', 2),
    ('Benjamin', 'Harris', 'Male', '1988-04-22', '2023-11-05', TRUE, 'ben.h@example.com', '555-1111', '707 Fir St', 'El Paso', 'TX', '79901', 'pass9870', 3),
	('Liam', 'King', 'Male', '1995-12-10', '2023-01-02', TRUE, 'liam.k@example.com', '555-2001', '808 Cedar Ave', 'San Antonio', 'TX', '78201', 'liampass123', 1),
    ('Ella', 'Scott', 'Female', '1992-06-24', '2023-02-10', FALSE, 'ella.s@example.com', '555-2002', '909 Oak Blvd', 'Austin', 'TX', '78701', 'ellapassword', 2),
    ('Lucas', 'Young', 'Male', '1989-11-15', '2023-02-22', TRUE, 'lucas.y@example.com', '555-2003', '101 Maple St', 'Houston', 'TX', '77001', 'lucaspwd789', 3),
    ('Grace', 'Hall', 'Female', '1996-02-08', '2023-03-05', TRUE, 'grace.h@example.com', '555-2004', '202 Pine St', 'Dallas', 'TX', '75201', 'grace123pwd', 1),
    ('Aiden', 'Allen', 'Male', '1993-05-20', '2023-03-18', FALSE, 'aiden.a@example.com', '555-2005', '303 Spruce St', 'El Paso', 'TX', '79901', 'aidenpass456', 2),
    ('Amelia', 'Carter', 'Female', '1991-10-29', '2023-04-01', TRUE, 'amelia.c@example.com', '555-2006', '404 Birch Rd', 'Plano', 'TX', '75001', 'secureamelia', 3),
    ('Daniel', 'Nelson', 'Male', '1987-03-11', '2023-04-25', TRUE, 'daniel.n@example.com', '555-2007', '505 Walnut Dr', 'Lubbock', 'TX', '79401', 'danielpwd123', 1),
    ('Zoe', 'Mitchell', 'Female', '1990-07-03', '2023-05-05', TRUE, 'zoe.m@example.com', '555-2008', '606 Elm St', 'Fort Worth', 'TX', '76101', 'zoepassword', 2),
    ('Nathan', 'Perez', 'Male', '1985-08-19', '2023-05-20', FALSE, 'nathan.p@example.com', '555-2009', '707 Maple Ave', 'Irving', 'TX', '75060', 'nathan123', 3),
    ('Hannah', 'Roberts', 'Female', '1988-11-30', '2023-06-01', TRUE, 'hannah.r@example.com', '555-2010', '808 Poplar Blvd', 'Frisco', 'TX', '75034', 'hannahpwd', 1),
    ('Mason', 'Lee', 'Male', '1992-01-20', '2023-06-15', TRUE, 'mason.l@example.com', '555-2011', '909 Palm St', 'San Antonio', 'TX', '78201', 'masonpass', 2),
    ('Ava', 'Walker', 'Female', '1995-04-25', '2023-07-01', FALSE, 'ava.w@example.com', '555-2012', '101 Cedar Blvd', 'Austin', 'TX', '78701', 'avapassword123', 3),
    ('Jayden', 'Rodriguez', 'Male', '1991-06-18', '2023-07-10', TRUE, 'jayden.r@example.com', '555-2013', '202 Oak St', 'Houston', 'TX', '77001', 'jaydenpwd', 1),
    ('Chloe', 'Martinez', 'Female', '1989-12-02', '2023-07-20', TRUE, 'chloe.m@example.com', '555-2014', '303 Pine Rd', 'Dallas', 'TX', '75201', 'chloepassword', 2),
    ('Samuel', 'Clark', 'Male', '1994-10-05', '2023-08-05', TRUE, 'samuel.c@example.com', '555-2015', '404 Walnut Ave', 'El Paso', 'TX', '79901', 'samuelpwd', 3),
    ('Mila', 'Lewis', 'Female', '1993-07-21', '2023-08-18', FALSE, 'mila.l@example.com', '555-2016', '505 Birch St', 'Plano', 'TX', '75001', 'milapass', 1),
    ('Henry', 'Lopez', 'Male', '1988-03-13', '2023-09-01', TRUE, 'henry.l@example.com', '555-2017', '606 Spruce Dr', 'Lubbock', 'TX', '79401', 'henrypassword', 2),
    ('Lily', 'Hill', 'Female', '1990-09-30', '2023-09-12', TRUE, 'lily.h@example.com', '555-2018', '707 Maple Blvd', 'Fort Worth', 'TX', '76101', 'lily123', 3),
    ('Jack', 'Scott', 'Male', '1991-02-10', '2023-10-01', TRUE, 'jack.s@example.com', '555-2019', '808 Oak St', 'Irving', 'TX', '75060', 'jackpassword', 1),
    ('Sophie', 'Green', 'Female', '1987-11-17', '2023-10-15', TRUE, 'sophie.g@example.com', '555-2020', '909 Maple Ave', 'Frisco', 'TX', '75034', 'sophiepass', 2),
    ('Levi', 'Adams', 'Male', '1992-08-11', '2023-10-25', FALSE, 'levi.a@example.com', '555-2021', '101 Cedar St', 'San Antonio', 'TX', '78201', 'levipassword', 3),
    ('Emily', 'Baker', 'Female', '1995-12-30', '2023-11-01', TRUE, 'emily.b@example.com', '555-2022', '202 Pine Rd', 'Austin', 'TX', '78701', 'emilypwd123', 1),
    ('Luke', 'Hernandez', 'Male', '1989-05-07', '2023-11-05', TRUE, 'luke.h@example.com', '555-2023', '303 Walnut St', 'Houston', 'TX', '77001', 'lukepass', 2),
    ('Bella', 'Campbell', 'Female', '1993-09-25', '2023-11-12', TRUE, 'bella.c@example.com', '555-2024', '404 Maple Blvd', 'Dallas', 'TX', '75201', 'bellapassword', 3),
    ('Elijah', 'Morales', 'Male', '1991-01-15', '2023-11-20', FALSE, 'elijah.m@example.com', '555-2025', '505 Birch St', 'El Paso', 'TX', '79901', 'elijah123', 1),
    ('Aria', 'Rivera', 'Female', '1990-04-19', '2023-12-01', TRUE, 'aria.r@example.com', '555-2026', '606 Cedar St', 'Plano', 'TX', '75001', 'ariapassword', 2),
    ('Matthew', 'Hughes', 'Male', '1988-10-10', '2023-12-10', TRUE, 'matthew.h@example.com', '555-2027', '707 Oak Ave', 'Lubbock', 'TX', '79401', 'matthewpass', 3),
    ('Victoria', 'Sanders', 'Female', '1994-02-02', '2023-12-15', TRUE, 'victoria.s@example.com', '555-2028', '808 Maple Rd', 'Fort Worth', 'TX', '76101', 'victoriapwd', 1),
    ('Sebastian', 'Price', 'Male', '1996-03-14', '2023-12-20', FALSE, 'sebastian.p@example.com', '555-2029', '909 Palm St', 'Irving', 'TX', '75060', 'sebastian123', 2),
    ('Maya', 'Perry', 'Female', '1993-11-12', '2023-12-25', TRUE, 'maya.p@example.com', '555-2030', '101 Walnut Dr', 'Frisco', 'TX', '75034', 'mayapassword', 3);

INSERT INTO Payment (Member_ID, Most_recent_payment, Membership_status)
VALUES 
    (1, '2023-12-01', 'Active'),
    (2, '2023-10-15', 'Active'),
    (3, '2023-09-30', 'Inactive'),
    (4, '2023-12-01', 'Active'),
    (5, '2023-11-15', 'Active'),
    (6, '2023-10-25', 'Active'),
    (7, '2023-09-20', 'Inactive'),
    (8, '2023-08-10', 'Active'),
    (9, '2023-07-15', 'Active'),
    (10, '2023-06-30', 'Inactive'),
    (11, '2023-05-25', 'Active'),
    (12, '2023-04-15', 'Active'),
    (13, '2023-03-05', 'Active'),
    (14, '2023-02-25', 'Inactive'),
    (15, '2023-01-15', 'Active'),
    (16, '2022-12-10', 'Active'),
    (17, '2023-12-01', 'Inactive'),
    (18, '2023-11-15', 'Active'),
    (19, '2023-10-01', 'Active'),
    (20, '2023-09-05', 'Active'),
    (21, '2023-08-10', 'Inactive'),
    (22, '2023-07-20', 'Active'),
    (23, '2023-06-05', 'Active'),
    (24, '2023-05-15', 'Inactive'),
    (25, '2023-04-25', 'Active'),
    (26, '2023-03-15', 'Active'),
    (27, '2023-02-10', 'Inactive'),
    (28, '2023-01-20', 'Active'),
    (29, '2022-12-15', 'Active'),
    (30, '2023-11-25', 'Inactive'),
    (31, '2023-10-12', 'Active'),
    (32, '2023-09-18', 'Active'),
    (33, '2023-08-05', 'Active'),
    (34, '2023-07-01', 'Inactive'),
    (35, '2023-06-20', 'Active'),
    (36, '2023-05-01', 'Active'),
    (37, '2023-04-18', 'Active'),
    (38, '2023-03-25', 'Inactive'),
    (39, '2023-02-15', 'Active'),
    (40, '2023-01-01', 'Active'),
    (41, '2023-12-10', 'Inactive'),
    (42, '2023-11-15', 'Active'),
    (43, '2023-10-25', 'Active');
	
INSERT INTO CheckIn (user_id, location_id, checkin_time, status)
VALUES 
    (1, 1, '2023-11-12 08:00:00', 'checked_in'),
    (2, 2, '2023-11-12 09:00:00', 'checked_in'),
    (3, 3, '2023-11-12 10:00:00', 'checked_in'),
    (4, 1, '2023-11-12 08:15:00', 'checked_in'),
    (5, 2, '2023-11-12 09:30:00', 'checked_in'),
    (6, 3, '2023-11-12 10:45:00', 'checked_in'),
    (7, 1, '2023-11-12 08:30:00', 'checked_in'),
    (8, 2, '2023-11-12 09:45:00', 'checked_in'),
    (9, 3, '2023-11-12 11:00:00', 'checked_in'),
    (10, 1, '2023-11-12 08:45:00', 'checked_in'),
    (11, 2, '2023-11-12 10:00:00', 'checked_in'),
    (12, 3, '2023-11-12 11:15:00', 'checked_in'),
    (13, 1, '2023-11-12 09:00:00', 'checked_in'),
    (14, 2, '2023-11-12 10:15:00', 'checked_in'),
    (15, 3, '2023-11-12 11:30:00', 'checked_in'),
    (16, 1, '2023-11-12 09:15:00', 'checked_in'),
    (17, 2, '2023-11-12 10:30:00', 'checked_in'),
    (18, 3, '2023-11-12 11:45:00', 'checked_in'),
    (19, 1, '2023-11-12 09:30:00', 'checked_in'),
    (20, 2, '2023-11-12 10:45:00', 'checked_in'),
    (21, 3, '2023-11-12 12:00:00', 'checked_in'),
    (22, 1, '2023-11-12 09:45:00', 'checked_in'),
    (23, 2, '2023-11-12 11:00:00', 'checked_in'),
    (24, 3, '2023-11-12 12:15:00', 'checked_in'),
    (25, 1, '2023-11-12 10:00:00', 'checked_in'),
    (26, 2, '2023-11-12 11:15:00', 'checked_in'),
    (27, 3, '2023-11-12 12:30:00', 'checked_in'),
    (28, 1, '2023-11-12 10:15:00', 'checked_in'),
    (29, 2, '2023-11-12 11:30:00', 'checked_in'),
    (30, 3, '2023-11-12 12:45:00', 'checked_in'),
    (31, 1, '2023-11-12 10:30:00', 'checked_in'),
    (32, 2, '2023-11-12 11:45:00', 'checked_in'),
    (33, 3, '2023-11-12 13:00:00', 'checked_in'),
    (34, 1, '2023-11-12 10:45:00', 'checked_in'),
    (35, 2, '2023-11-12 12:00:00', 'checked_in'),
    (36, 3, '2023-11-12 13:15:00', 'checked_in'),
    (37, 1, '2023-11-12 11:00:00', 'checked_in'),
    (38, 2, '2023-11-12 12:15:00', 'checked_in'),
    (39, 3, '2023-11-12 13:30:00', 'checked_in'),
    (40, 1, '2023-11-12 11:15:00', 'checked_in'),
    (41, 2, '2023-11-12 12:30:00', 'checked_in'),
    (42, 3, '2023-11-12 13:45:00', 'checked_in'),
    (43, 1, '2023-11-12 11:30:00', 'checked_in');

INSERT INTO Guest (member_id, guest_name, guest_age)
VALUES
    (1, 'Alice Doe', 25),    -- Gold member with id 1
    (2, 'Bob Smith', 30),    -- Silver member with id 2
    (4, 'Michael Brown', 31), -- Gold member with id 4
    (5, 'Emma Wilson', 29),  -- Silver member with id 5
    (6, 'Olivia Taylor', 32), -- Gold member with id 6
    (9, 'William Anderson', 30), -- Gold member with id 9
    (10, 'Isabella Moore', 27), -- Gold member with id 10
    (11, 'James White', 28),    -- Gold member with id 11
    (12, 'Charlotte Thomas', 29), -- Silver member with id 12
    (13, 'Benjamin Harris', 34), -- Silver member with id 13
    (15, 'Liam King', 27),    -- Gold member with id 15
    (16, 'Ella Scott', 26),   -- Silver member with id 16
    (17, 'Lucas Young', 33),  -- Silver member with id 17
    (19, 'Aiden Allen', 31),  -- Silver member with id 19
    (21, 'Daniel Nelson', 28), -- Gold member with id 21
    (22, 'Zoe Mitchell', 35),  -- Gold member with id 22
    (23, 'Nathan Perez', 32), -- Silver member with id 23
    (24, 'Hannah Roberts', 29), -- Gold member with id 24
    (25, 'Mason Lee', 31),   -- Silver member with id 25
    (27, 'Jayden Rodriguez', 29), -- Gold member with id 27
    (28, 'Chloe Martinez', 28),  -- Silver member with id 28
    (30, 'Mila Lewis', 30),    -- Gold member with id 30
    (31, 'Henry Lopez', 33),   -- Silver member with id 31
    (32, 'Lily Hill', 31),     -- Silver member with id 32
    (34, 'Jack Scott', 29),   -- Gold member with id 34
    (35, 'Sophie Green', 30),  -- Silver member with id 35
    (37, 'Emily Baker', 29),   -- Gold member with id 37
    (38, 'Luke Hernandez', 27), -- Silver member with id 38
    (40, 'Bella Campbell', 26),  -- Silver member with id 40
    (41, 'Elijah Morales', 30),  -- Gold member with id 41
    (42, 'Aria Rivera', 28),  -- Silver member with id 42
    (43, 'Matthew Hughes', 29); -- Silver member with id 43

