CREATE DATABASE  IF NOT EXISTS `movie_man_sys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movie_man_sys`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: movie_man_sys
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `BID` int NOT NULL AUTO_INCREMENT,
  `UID` int DEFAULT NULL,
  `SID` int DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `b_date` datetime DEFAULT NULL,
  `b_amount` float DEFAULT NULL,
  `b_status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`BID`),
  KEY `UID` (`UID`),
  KEY `SID` (`SID`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `user` (`UID`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `shows` (`SID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (62,6,2,'UPI','2023-11-30 16:21:41',900,'Y'),(63,6,3,'UPI','2023-11-30 16:51:59',600,'Y'),(64,6,2,'upi','2024-04-09 19:07:22',600,'Y'),(65,6,2,'upi','2024-04-09 19:11:48',600,'Y');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_location`
--

DROP TABLE IF EXISTS `event_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_location` (
  `SID` int DEFAULT NULL,
  `VID` int DEFAULT NULL,
  KEY `SID` (`SID`),
  KEY `VID` (`VID`),
  CONSTRAINT `event_location_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `shows` (`SID`) ON DELETE CASCADE,
  CONSTRAINT `event_location_ibfk_2` FOREIGN KEY (`VID`) REFERENCES `venue` (`VID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_location`
--

LOCK TABLES `event_location` WRITE;
/*!40000 ALTER TABLE `event_location` DISABLE KEYS */;
INSERT INTO `event_location` VALUES (1,2),(1,5),(2,2),(1,4),(3,5),(4,3),(2,1),(3,2);
/*!40000 ALTER TABLE `event_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!50001 DROP VIEW IF EXISTS `movies`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `movies` AS SELECT 
 1 AS `SID`,
 1 AS `name`,
 1 AS `trailer`,
 1 AS `image`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `SID` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `trailer` varchar(200) DEFAULT NULL,
  `s_type` varchar(20) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`SID`),
  CONSTRAINT `shows_chk_1` CHECK ((`s_type` in (_utf8mb4'Action',_utf8mb4'Drama',_utf8mb4'Comedy',_utf8mb4'Thriller',_utf8mb4'Other')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
INSERT INTO `shows` VALUES (1,'Shaw Shank Redemption','https://www.imdb.com/video/vi3877612057/?ref_=tt_vi_i_1','Action','https://www.ubuy.co.in/productimg/?image=aHR0cHM6Ly9pbWFnZXMtY2RuLnVidXkuY28uaW4vNjM1MTQxNjMzN2U5ZGUxNTdhMzcxODI0LXNoYXdzaGFuay1yZWRlbXB0aW9uLW1vdmllLXBvc3Rlci11cy5qcGc.jpg'),(2,'Kingdom of the Planet of the Apes','https://m.imdb.com/video/vi1698154265/?ref_=tt_vi_i_1','Action','https://m.media-amazon.com/images/M/MV5BNDcxM2RiOWMtMGEzMC00NDEyLTgzMjEtOWZjYzVhN2E2ZjcyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg'),(3,'Inside out 2','https://m.imdb.com/video/vi1914750745/?ref_=tt_vi_i_1','Comedy','https://preview.redd.it/official-poster-for-inside-out-2-v0-ivza3lu6xbzb1.jpg?width=640&crop=smart&auto=webp&s=41a22d491aa7c4458772b6bff50df5a52d8f3527'),(4,'Salaar part 1: Ceasefire','https://m.imdb.com/video/vi1554499353/?ref_=tt_vi_i_1','Thriller','https://english.mathrubhumi.com/image/contentid/policy:1.9051780:1699317979/F-PXjBVboAAGhxO.jpg?$p=12a99c9&f=1x1&w=1080&q=0.8');
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SID` BEFORE INSERT ON `shows` FOR EACH ROW BEGIN
    IF EXISTS (SELECT SID FROM shows WHERE SID = NEW.SID) THEN
        SIGNAL SQLSTATE '45001'
        SET MESSAGE_TEXT = 'SHOW already exists in shows table';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `SID` int NOT NULL,
  `BID` int NOT NULL,
  `VID` int NOT NULL,
  `seat_no` int NOT NULL DEFAULT '0',
  `show_time` datetime DEFAULT NULL,
  KEY `check_bid` (`BID`),
  KEY `check_sid` (`SID`),
  KEY `check_vid` (`VID`),
  CONSTRAINT `check_bid` FOREIGN KEY (`BID`) REFERENCES `bookings` (`BID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `check_sid` FOREIGN KEY (`SID`) REFERENCES `shows` (`SID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `check_vid` FOREIGN KEY (`VID`) REFERENCES `venue` (`VID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_chk_1` CHECK ((`seat_no` <= 60))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (2,62,1,54,'2023-12-01 12:00:00'),(2,62,1,55,'2023-12-01 12:00:00'),(2,62,1,56,'2023-12-01 12:00:00'),(3,63,5,15,'2023-12-06 14:00:00'),(3,63,5,16,'2023-12-06 14:00:00'),(2,65,1,4,'2024-04-10 14:00:00'),(2,65,1,5,'2024-04-10 14:00:00');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `mobile` bigint DEFAULT NULL,
  `username` varchar(225) NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`UID`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `user_chk_1` CHECK ((`age` > 18))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'Shubham','devastatingrpg@gmail.com',20,'M',9637374261,'mackarel','53d82ec0-8f6e-11ee-ac7c-025097ced2a1','a8cebb8e3febe1b76e11de8043c60fe6f23db7ea831234dab155ec68884fe7f0f64880fa4f1351771756ed74a48469c2dd058b4d02b9593573d4c4e8ba3599ff');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `UID` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    IF EXISTS (SELECT UID FROM user WHERE UID = NEW.UID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'USER already exists in USER table';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `AfterInsert_UserLog` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    -- Insert a log record for user creation
    INSERT INTO user_log (user_id, action_type, action_description)
    VALUES (NEW.UID, 'CREATE', 'User created');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `AfterUpdate_UserLog` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
    -- Insert a log record for user update
    INSERT INTO user_log (user_id, action_type, action_description)
    VALUES (NEW.UID, 'UPDATE', 'User details updated');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_log`
--

DROP TABLE IF EXISTS `user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action_type` varchar(10) DEFAULT NULL,
  `action_description` varchar(25) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_log`
--

LOCK TABLES `user_log` WRITE;
/*!40000 ALTER TABLE `user_log` DISABLE KEYS */;
INSERT INTO `user_log` VALUES (1,1,'CREATE','User created','2023-11-26 09:26:24'),(2,2,'CREATE','User created','2023-11-26 09:31:48'),(3,3,'CREATE','User created','2023-11-26 19:23:39'),(4,4,'CREATE','User created','2023-11-27 05:34:18'),(5,5,'CREATE','User created','2023-11-29 19:39:54'),(6,6,'CREATE','User created','2023-11-30 10:50:51');
/*!40000 ALTER TABLE `user_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue` (
  `VID` int NOT NULL,
  `city` varchar(25) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `seat_avail` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`VID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (1,'Pune',411038,'City Pride Kothrud','Y'),(2,'Pune',411037,'PVR ICON Pavilion Mall','Y'),(3,'Pune',411025,'Cinépolis Westend','Y'),(4,'Pune',411040,'INOX','Y'),(5,'Pune',411041,'City Pride Royal Cinemas','Y');
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `VID` BEFORE INSERT ON `venue` FOR EACH ROW BEGIN
    IF EXISTS (SELECT VID FROM venue WHERE VID = NEW.VID) THEN
        SIGNAL SQLSTATE '45002'
        SET MESSAGE_TEXT = 'VENUE already exists in venue table';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'movie_man_sys'
--

--
-- Dumping routines for database 'movie_man_sys'
--
/*!50003 DROP PROCEDURE IF EXISTS `DeleteBooking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteBooking`(IN bookid INT)
BEGIN 
	DECLARE bookingExists INT;
    SELECT COUNT(*) INTO bookingExists FROM bookings WHERE BID = bookid;
    
    IF bookingExists > 0 THEN
		DELETE FROM bookings WHERE BID = bookid;
		DELETE FROM tickets WHERE BID = bookid;
	ELSE 
		SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking does not exist';
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUser`(IN userid INT)
BEGIN
    DECLARE userExists INT;
    
    -- Check if the user exists
    SELECT COUNT(*) INTO userExists FROM user WHERE UID = userid;
    
    IF userExists > 0 THEN
        DELETE FROM user WHERE UID = userid;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User does not exist';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetOccupiedSeats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetOccupiedSeats`(IN show_id INT, IN venue_id INT, OUT occupied_seats VARCHAR(255))
BEGIN
    -- Declare variables
    DECLARE seat_list VARCHAR(255);
    
    SET seat_list = '';
    
    -- Concatenate occupied seat numbers
    SELECT GROUP_CONCAT(seat_no) INTO seat_list
    FROM tickets
    WHERE SID = show_id AND VID = venue_id;
    
    SET occupied_seats = seat_list;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertBooking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertBooking`(
    IN new_UID INT,
    IN new_SID INT,
    IN new_payment_method VARCHAR(20),
    IN new_b_amount FLOAT,
    IN new_b_status VARCHAR(1),
    OUT b_id INT
)
BEGIN
    INSERT INTO bookings (UID, SID, payment_method, b_date, b_amount, b_status)
    VALUES (new_UID, new_SID,  new_payment_method, NOW(),new_b_amount, new_b_status);
    SELECT LAST_INSERT_ID() INTO b_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertSeatNo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertSeatNo`(IN seatnum INT, IN bookid INT, IN showid INT)
BEGIN
    DECLARE bookingExists INT;
    DECLARE seatnumduplicate INT;

    -- Check if the booking ID exists
    SELECT COUNT(*) INTO bookingExists
    FROM bookings
    WHERE BID = bookid;

    IF bookingExists > 0 THEN
    
        -- Check if the show ID and booking ID exist in the tickets table
        IF EXISTS (SELECT 1 FROM tickets WHERE SID = showid AND BID = bookid) THEN
        
            -- Check if the seat number is not a duplicate for the same show and booking
            SELECT COUNT(*) INTO seatnumduplicate
            FROM tickets 
            WHERE SID = showid AND BID = bookid AND seat_no = seatnum;
            
            IF seatnumduplicate = 0 THEN 
                -- Update seat number in the tickets table
                UPDATE tickets
                SET seat_no = seatnum
                WHERE BID = bookid;
            ELSE
                SIGNAL SQLSTATE '45001'
                SET MESSAGE_TEXT = 'Duplicate seat number for this booking and show';
            END IF;
            
        ELSE
            SIGNAL SQLSTATE '45002'
            SET MESSAGE_TEXT = 'Show ID or Booking ID does not exist in tickets table';
        END IF;
        
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Booking ID does not exist';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertShow` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertShow`(
	IN new_SID INT,
    IN new_name VARCHAR(50),
    IN new_trailer VARCHAR(200),
    IN new_s_type VARCHAR(20),
    IN new_image VARCHAR(200) )
BEGIN
    INSERT INTO shows
    VALUES (new_SID, new_name, new_trailer, new_s_type, new_image);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertTicket` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertTicket`(IN booking_id INT, IN new_vid INT, IN show_time DATETIME, IN seat INT)
BEGIN
    DECLARE show_id INT;
    -- Get show ID based on booking ID
    SELECT SID INTO show_id FROM bookings WHERE BID = booking_id;

    -- Insert into tickets table
	INSERT INTO tickets (SID, BID, VID, seat_no, show_time)
	VALUES (show_id, booking_id, new_vid, seat, show_time);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertUser`(
    IN new_name VARCHAR(50),
    IN new_email VARCHAR(30),
    IN new_age INT,
    IN new_gender VARCHAR(1),
    IN new_mobile BIGINT,
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertVenue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertVenue`(
	IN new_VID INT,
    IN new_city VARCHAR(25),
    IN new_pincode INT,
    IN new_location VARCHAR(30),
    IN new_seat_avail VARCHAR(1) )
BEGIN
    INSERT INTO venue (VID, city, pincode, location, seat_avail)
    VALUES (new_VID, new_city, new_pincode, new_location, new_seat_avail);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShowUserBookings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ShowUserBookings`(IN userid INT)
BEGIN
    SELECT *
    FROM bookings
    WHERE UID = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Show_Availability` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Show_Availability`(IN S_ID INT, IN V_ID INT, OUT Availability VARCHAR(1), OUT ErrorMessage VARCHAR(50))
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
            FROM venue NATURAL JOIN event_location
            WHERE SID = S_ID AND VID = V_ID;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerifyUserCredentials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `VerifyUserCredentials`(
    IN in_username VARCHAR(255),
    IN in_password VARCHAR(255),
    OUT is_verified BOOLEAN,
    OUT error_message VARCHAR(255),
    OUT userid INT)
BEGIN
    DECLARE stored_hash VARCHAR(255);
    DECLARE stored_salt VARCHAR(255);
	DECLARE input_hash VARCHAR(255);

    -- Check if the username exists
    SELECT password_hash, password_salt, UID INTO stored_hash, stored_salt, userid
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `movies`
--

/*!50001 DROP VIEW IF EXISTS `movies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `movies` AS select `shows`.`SID` AS `SID`,`shows`.`name` AS `name`,`shows`.`trailer` AS `trailer`,`shows`.`image` AS `image` from `shows` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-10 12:31:34
