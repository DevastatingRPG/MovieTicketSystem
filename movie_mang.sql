CREATE DATABASE MOVIE_MAN_SYS;
-- drop DATABASE MOVIE_MAN_SYS;

USE MOVIE_MAN_SYS;

CREATE TABLE venue(VID INT PRIMARY KEY,
				   city varchar (25),
                   pincode INT,
                   location VARCHAR(30),
                   seat_type VARCHAR(10) CHECK (seat_type IN ('Standard', 'VIP', 'Premium')),
                   seat_avail varchar(1));

                   
CREATE TABLE shows(SID INT PRIMARY KEY,
				   name varchar (50) NOT NULL,
                   producer VARCHAR(30),
                   s_type varchar(20) CHECK (s_type IN ('Action', 'Drama', 'Comedy', 'Thriller', 'Other')),
                   s_timing DATETIME, 
                   lead_actor VARCHAR(30));
                   
                   
CREATE TABLE event_location(SID INT,
							FOREIGN KEY(SID) REFERENCES shows(SID) ON DELETE CASCADE,
                            VID INT,
							FOREIGN KEY(VID) REFERENCES venue(VID) ON DELETE CASCADE);
                            
-- uid is automatically given and incremented to users in later procedure
                            
CREATE TABLE user(UID INT AUTO_INCREMENT PRIMARY KEY,
				   name varchar (50) NOT NULL,
                   email VARCHAR(30),
                   age INT CHECK (age > 18),
                   gender VARCHAR(1),
                   mobile INT,
                   username VARCHAR(225) UNIQUE NOT NULL,
                   password_salt VARCHAR(255) NOT NULL,
				   password_hash VARCHAR(255) NOT NULL);   
                   

CREATE TABLE bookings(BID INT AUTO_INCREMENT PRIMARY KEY,
					  UID INT,
                      FOREIGN KEY(UID) REFERENCES user(UID) ON DELETE CASCADE,
                      SID INT,
                      FOREIGN KEY(SID) REFERENCES shows(SID) ON DELETE CASCADE,
                      payment_method VARCHAR(20),
                      b_date DATETIME,
                      b_amount float,
                      b_status VARCHAR(1));  
                      
                     
                      
CREATE TABLE tickets(SID INT,
					FOREIGN KEY(SID) REFERENCES shows(SID) ON DELETE CASCADE,
					BID INT,
					FOREIGN KEY(BID) REFERENCES bookings(BID) ON DELETE CASCADE,
                    VID INT,
					FOREIGN KEY(VID) REFERENCES venue(VID) ON DELETE CASCADE,
                    seat_no INT,
                    show_time DATETIME);
                    
                    
                    
-- trigger to check if UID alr exists in user
DELIMITER //
CREATE TRIGGER UID
BEFORE INSERT ON user
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT UID FROM user WHERE UID = NEW.UID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'USER already exists in USER table';
    END IF;
END//
DELIMITER ;



-- trigger to check if SID alr exists in shows
DELIMITER //
CREATE TRIGGER SID
BEFORE INSERT ON shows
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT SID FROM shows WHERE SID = NEW.SID) THEN
        SIGNAL SQLSTATE '45001'
        SET MESSAGE_TEXT = 'SHOW already exists in shows table';
    END IF;
END//
DELIMITER ;



-- trigger to check if VID alr exists in venue
DELIMITER //
CREATE TRIGGER VID
BEFORE INSERT ON venue
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT VID FROM venue WHERE VID = NEW.VID) THEN
        SIGNAL SQLSTATE '45002'
        SET MESSAGE_TEXT = 'VENUE already exists in venue table';
    END IF;
END//
DELIMITER ;



-- procedure to get show availibility
DELIMITER //
CREATE PROCEDURE Show_Availability(IN S_ID INT, IN V_ID INT, OUT Availability VARCHAR(1), OUT ErrorMessage VARCHAR(20))
BEGIN
    DECLARE showid INT DEFAULT 0;
    DECLARE venueid INT DEFAULT 0;

    -- Declare an exit handler for NOT FOUND
    DECLARE CONTINUE HANDLER FOR NOT FOUND
    BEGIN
        SET ErrorMessage = 'Show not found';
    END;

    -- Get show ID
    SELECT SID INTO showid
    FROM shows
    WHERE SID = S_ID;

    -- Check if the show is not found
    IF showid = 0 THEN
        SET ErrorMessage = 'Show not found';
    ELSE
        -- Get venue ID for the show
        SELECT VID INTO venueid
        FROM event_location
        WHERE SID = S_ID AND VID = V_ID;

        -- Check if the venue is not found for the show
        IF venueid = 0 THEN
            SET ErrorMessage = 'Venue not found for the show';
        ELSE
            -- Get seat availability
            SELECT seat_avail INTO Availability
            FROM venue, event_location
            WHERE SID = S_ID AND VID = V_ID;
        END IF;
    END IF;
END //
DELIMITER ;

-- Call the stored procedure
-- CALL Show_Availability(1, 2, @availability_result, @error_message_result);

-- Access the output values
-- SELECT @availability_result AS Availability, @error_message_result AS ErrorMessage;




-- to add data into tickets table
DELIMITER //
CREATE PROCEDURE InsertTicket(IN booking_id INT)
BEGIN
    DECLARE show_id INT;
    DECLARE show_time DATETIME;

    -- Get show ID based on booking ID
    SELECT SID INTO show_id FROM bookings WHERE BID = booking_id;

    -- Get show timing based on show ID
    SELECT s_timing INTO show_time FROM shows WHERE SID = show_id;

    -- Insert into tickets table
    INSERT INTO tickets (SID, BID, show_time)
    VALUES (show_id, booking_id, show_time);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER AfterInsert_Bookings
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    CALL InsertTicket(NEW.BID);
END //
DELIMITER ;





DELIMITER //
CREATE PROCEDURE InsertSeatNo (IN seatnum INT, IN bookid INT)
BEGIN
    DECLARE bookingExists INT;

    -- Check if the booking ID exists
    SELECT COUNT(*) INTO bookingExists
    FROM bookings
    WHERE BID = bookid;

    IF bookingExists > 0 THEN
        -- Update seat number in the tickets table
        UPDATE tickets
        SET seat_no = seatnum
        WHERE BID = bookid;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking ID does not exist';
    END IF;
END//
DELIMITER ;





-- procedure to insert login, password into user table
DELIMITER //
CREATE PROCEDURE InsertUser(
    IN new_name VARCHAR(50),
    IN new_email VARCHAR(30),
    IN new_age INT,
    IN new_gender VARCHAR(1),
    IN new_mobile INT,
    IN new_username VARCHAR(255),
    IN new_password VARCHAR(255) )
BEGIN
    DECLARE new_salt VARCHAR(255);
    DECLARE new_hash VARCHAR(255);

    -- Generate a random salt
    SET new_salt = UUID();

    -- Hash the password with the salt
    SET new_hash = SHA2(CONCAT(new_salt, new_password), 512);

    -- Insert into the user table with auto-incrementing UID
    INSERT INTO user (name, email, age, gender, mobile, username, password_salt, password_hash)
    VALUES (new_name, new_email, new_age, new_gender, new_mobile, new_username, new_salt, new_hash);
END //
DELIMITER ;





-- log table for user info changes
CREATE TABLE user_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action_type VARCHAR(10),
    action_description VARCHAR(25),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- log table to keep record of user info added/ updated
DELIMITER //
CREATE TRIGGER AfterInsert_UserLog
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    -- Insert a log record for user creation
    INSERT INTO user_log (user_id, action_type, action_description)
    VALUES (NEW.UID, 'CREATE', 'User created');
END //

CREATE TRIGGER AfterUpdate_UserLog
AFTER UPDATE ON user
FOR EACH ROW
BEGIN
    -- Insert a log record for user update
    INSERT INTO user_log (user_id, action_type, action_description)
    VALUES (NEW.UID, 'UPDATE', 'User details updated');
END //
DELIMITER ;





-- to verify username and password
DELIMITER //
CREATE PROCEDURE VerifyUserCredentials(
    IN in_username VARCHAR(255),
    IN in_password VARCHAR(255),
    OUT is_verified BOOLEAN,
    OUT error_message VARCHAR(255) )
BEGIN
    DECLARE stored_hash VARCHAR(255);
    DECLARE stored_salt VARCHAR(255);
	DECLARE input_hash VARCHAR(255);

    -- Check if the username exists
    SELECT password_hash, password_salt INTO stored_hash, stored_salt
    FROM user
    WHERE username = in_username;

    IF stored_hash IS NOT NULL THEN
        -- Hash the input password with the stored salt
       
        SET input_hash = SHA2(CONCAT(stored_salt, in_password), 512);

        -- Check if the hashed passwords match
        IF stored_hash = input_hash THEN
            SET is_verified = TRUE;
            SET error_message = 'Credentials verified';
        ELSE
            SET is_verified = FALSE;
            SET error_message = 'Incorrect password';
        END IF;
    ELSE
        SET is_verified = FALSE;
        SET error_message = 'Username not found';
    END IF;
END //
DELIMITER ;

-- DROP PROCEDURE VerifyUserCredentials;

-- DELIMITER //
-- Example usage
-- SET @is_verified_result = FALSE;
-- SET @error_message_result = '';

-- CALL VerifyUserCredentials('john_doe', 'password123', @is_verified_result, @error_message_result);

-- SELECT @is_verified_result AS is_verified, @error_message_result AS error_message;
-- DELIMITER ;





-- procedure for inserting values into venue
DELIMITER //
CREATE PROCEDURE InsertVenue(
	IN new_VID INT,
    IN new_city VARCHAR(25),
    IN new_pincode INT,
    IN new_location VARCHAR(30),
    IN new_seat_type VARCHAR(10),
    IN new_seat_avail VARCHAR(1) )
BEGIN
    INSERT INTO venue (VID, city, pincode, location, seat_type, seat_avail)
    VALUES (new_VID, new_city, new_pincode, new_location, new_seat_type, new_seat_avail);
END //
DELIMITER ;




DELIMITER //
CREATE PROCEDURE InsertShow(
	IN new_SID INT,
    IN new_name VARCHAR(50),
    IN new_producer VARCHAR(30),
    IN new_s_type VARCHAR(20),
    IN new_s_timing DATETIME,
    IN new_lead_actor VARCHAR(30) )
BEGIN
    INSERT INTO shows (SID, name, producer, s_type, s_timing, lead_actor)
    VALUES (new_SID, new_name, new_producer, new_s_type, new_s_timing, new_lead_actor);
END //
DELIMITER ;




DELIMITER //
CREATE PROCEDURE InsertBooking(
    IN new_UID INT,
    IN new_SID INT,
    IN new_payment_method VARCHAR(20),
    IN new_b_date DATETIME,
    IN new_b_amount FLOAT,
    IN new_b_status VARCHAR(1)
)
BEGIN
    INSERT INTO bookings (UID, SID, payment_method, b_date, b_amount, b_status)
    VALUES (new_UID, new_SID,  new_payment_method, new_b_date, new_b_amount, new_b_status);
END //
DELIMITER ;

-- drop PROCEDURE InsertBooking;






CREATE USER 'admin'@'localhost' IDENTIFIED BY 'beans1234';
GRANT ALL ON *.* TO 'admin'@'localhost';

CREATE USER 'user'@'localhost' IDENTIFIED BY 'newbie1234';
GRANT SELECT ON movie_mang.* TO 'user'@'localhost';





-- ***************test*************************

-- Check the availability of seats for a specific show and venue.
CALL Show_Availability(1, 2, @availability_result, @error_message_result);
SELECT @availability_result AS Availability, @error_message_result AS ErrorMessage;

CALL Show_Availability(10, 2, @availability_result, @error_message_result);
SELECT @availability_result AS Availability, @error_message_result AS ErrorMessage;
-- Expect ErrorMessage: Show not found

CALL InsertUser ('Alice', 'alice@example.com', 16, 'F', 98765, 'alice_wonder', 'password456');
-- Expect error due to age check constraint

CALL InsertUser ('John', 'john@example.com', 25, 'M', 12345, 'john_doe', 'password123');
CALL VerifyUserCredentials('john_doe', 'password123', @is_verified_result, @error_message_result);
SELECT @is_verified_result AS is_verified, @error_message_result AS error_message;

CALL VerifyUserCredentials('john_doe', 'wrong_password', @is_verified_result, @error_message_result);
SELECT @is_verified_result AS is_verified, @error_message_result AS error_message;
-- Expect is_verified: FALSE, error_message: Incorrect password


CALL InsertVenue(1, 'City', 12345, 101, 'Standard', 'Y');

CALL InsertVenue(1, 'City2', 54321, 202, 'VIP', 'N');
-- Expect error due to trigger (VENUE already exists in venue table)


CALL InsertShow(1, 'Movie Title', 'Producer Name', 'Action', '2023-12-01 18:00:00', 'Lead Actor');

CALL InsertShow(1, 'Another Movie', 'Another Producer', 'Drama', '2023-12-02 14:00:00', 'Actor XYZ');
-- Expect error due to trigger (SHOW already exists in shows table)

CALL InsertBooking(1, 1, 'Credit Card', '2023-12-01 17:30:00', 50.00, 'P');
-- Assuming BID 1 is the recently inserted booking
CALL InsertTicket(1);
CALL InsertSeatNo(101, 1);

INSERT INTO bookings (UID, payment_method, b_date, b_amount, b_status)
VALUES (1, 'Credit Card', '2023-12-01 17:30:00', 50.00, 'P');

CALL InsertBooking(100, 'Debit Card', '2023-12-03 10:30:00', 30.00, 'A');
-- Expect error due to foreign key constraint

SELECT * FROM user_log;

CALL InsertTicket(100);
-- Expect error due to foreign key constraint

CALL InsertSeatNo(102, 3);
-- Expect error due to Booking ID does not exist

CALL VerifyUserCredentials('nonexistent_user', 'some_password', @is_verified_result, @error_message_result);
-- Expect is_verified: FALSE, error_message: 'Username not found'
