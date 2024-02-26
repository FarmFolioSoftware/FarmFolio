-- MariaDB dump 10.19  Distrib 10.11.7-MariaDB, for Linux (x86_64)
--
-- Host: farmfolio-db.cp0eq8aqg0c7.us-east-1.rds.amazonaws.com    Database: farmfolio
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblAddress`
--

DROP TABLE IF EXISTS `tblAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblAddress` (
  `addressID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `typeID` int(11) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zipCode` int(11) DEFAULT NULL,
  PRIMARY KEY (`addressID`),
  KEY `userID` (`userID`),
  KEY `typeID` (`typeID`),
  CONSTRAINT `tblAddress_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`),
  CONSTRAINT `tblAddress_ibfk_2` FOREIGN KEY (`typeID`) REFERENCES `tblAddressType` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAddress`
--

LOCK TABLES `tblAddress` WRITE;
/*!40000 ALTER TABLE `tblAddress` DISABLE KEYS */;
INSERT INTO `tblAddress` VALUES
(5,16,NULL,'123 main st','Flushing','NY',11111),
(6,17,NULL,'123 main st','Flushing','NY',11111),
(7,19,NULL,'1273 Rockefeller Street','Manhattan','NY',10001),
(8,20,NULL,'hell','Hell','MI',10001),
(9,21,NULL,'test','test','ME',1234),
(10,22,1,'123 Doe Farm Rd','Cookeville','TN',38505),
(12,22,2,'434 April Ln','Lincoln','NE',45115),
(13,23,2,'394 Richards Way','Lincoln','NE',45114),
(14,9,1,'123 Fake Avenue','Hell','MI',33333);
/*!40000 ALTER TABLE `tblAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblAddressType`
--

DROP TABLE IF EXISTS `tblAddressType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblAddressType` (
  `typeID` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAddressType`
--

LOCK TABLES `tblAddressType` WRITE;
/*!40000 ALTER TABLE `tblAddressType` DISABLE KEYS */;
INSERT INTO `tblAddressType` VALUES
(1,'Farm Address'),
(2,'User Address');
/*!40000 ALTER TABLE `tblAddressType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblAnimal`
--

DROP TABLE IF EXISTS `tblAnimal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblAnimal` (
  `animalID` int(11) NOT NULL AUTO_INCREMENT,
  `plotID` int(11) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`animalID`),
  KEY `plotID` (`plotID`),
  CONSTRAINT `tblAnimal_ibfk_1` FOREIGN KEY (`plotID`) REFERENCES `tblAnimalPlot` (`plotID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnimal`
--

LOCK TABLES `tblAnimal` WRITE;
/*!40000 ALTER TABLE `tblAnimal` DISABLE KEYS */;
INSERT INTO `tblAnimal` VALUES
(1,2,'2023-12-25');
/*!40000 ALTER TABLE `tblAnimal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblAnimalAction`
--

DROP TABLE IF EXISTS `tblAnimalAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblAnimalAction` (
  `actionID` int(11) NOT NULL AUTO_INCREMENT,
  `farmID` int(11) DEFAULT NULL,
  `actions` longtext DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`actionID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblAnimalAction_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`),
  CONSTRAINT `tblAnimalAction_ibfk_2` FOREIGN KEY (`actionID`) REFERENCES `tblPlotAction` (`actionID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnimalAction`
--

LOCK TABLES `tblAnimalAction` WRITE;
/*!40000 ALTER TABLE `tblAnimalAction` DISABLE KEYS */;
INSERT INTO `tblAnimalAction` VALUES
(2,5,'{\'healthChecked\': 0, \'fed\': 1, \'freeRoamed\': 0, \'slaughtered\': 0}','Used the new chicken feed we just bought');
/*!40000 ALTER TABLE `tblAnimalAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblAnimalPlot`
--

DROP TABLE IF EXISTS `tblAnimalPlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblAnimalPlot` (
  `plotID` int(11) NOT NULL,
  `animalType` varchar(50) DEFAULT NULL,
  `animalCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`plotID`),
  CONSTRAINT `tblAnimalPlot_ibfk_1` FOREIGN KEY (`plotID`) REFERENCES `tblPlotSeason` (`plotID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnimalPlot`
--

LOCK TABLES `tblAnimalPlot` WRITE;
/*!40000 ALTER TABLE `tblAnimalPlot` DISABLE KEYS */;
INSERT INTO `tblAnimalPlot` VALUES
(2,'Chicken',25);
/*!40000 ALTER TABLE `tblAnimalPlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCropAction`
--

DROP TABLE IF EXISTS `tblCropAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCropAction` (
  `actionID` int(11) NOT NULL AUTO_INCREMENT,
  `farmID` int(11) DEFAULT NULL,
  `actions` longtext DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`actionID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblCropAction_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`),
  CONSTRAINT `tblCropAction_ibfk_2` FOREIGN KEY (`actionID`) REFERENCES `tblPlotAction` (`actionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCropAction`
--

LOCK TABLES `tblCropAction` WRITE;
/*!40000 ALTER TABLE `tblCropAction` DISABLE KEYS */;
INSERT INTO `tblCropAction` VALUES
(1,5,'{\'seeded\': 0, \'watered\': 0, \'pesticided\': 0, \'harvested\': 0}','Repaired the broken scarecrow');
/*!40000 ALTER TABLE `tblCropAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblCropPlot`
--

DROP TABLE IF EXISTS `tblCropPlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblCropPlot` (
  `plotID` int(11) NOT NULL,
  `cropType` varchar(50) DEFAULT NULL,
  `plotSize` float DEFAULT NULL,
  `datePlanted` date DEFAULT NULL,
  `dateHarvested` date DEFAULT NULL,
  `cropsHarvested` int(11) DEFAULT NULL,
  PRIMARY KEY (`plotID`),
  CONSTRAINT `tblCropPlot_ibfk_1` FOREIGN KEY (`plotID`) REFERENCES `tblPlotSeason` (`plotID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCropPlot`
--

LOCK TABLES `tblCropPlot` WRITE;
/*!40000 ALTER TABLE `tblCropPlot` DISABLE KEYS */;
INSERT INTO `tblCropPlot` VALUES
(1,'Winter Potato',700,'2024-02-25',NULL,0);
/*!40000 ALTER TABLE `tblCropPlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblDemographics`
--

DROP TABLE IF EXISTS `tblDemographics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblDemographics` (
  `userID` int(11) NOT NULL,
  `race` varchar(100) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `sex` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `tblDemographics_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblDemographics`
--

LOCK TABLES `tblDemographics` WRITE;
/*!40000 ALTER TABLE `tblDemographics` DISABLE KEYS */;
INSERT INTO `tblDemographics` VALUES
(16,'rainbow','2024-02-29','Male'),
(17,'rainbow','2024-02-29','Male'),
(19,'white','2002-12-13','Male'),
(20,'White','2002-09-27','Male'),
(21,'test','2024-02-18','Male'),
(22,'white','2024-02-18','Male'),
(23,'white','1999-06-15','Male');
/*!40000 ALTER TABLE `tblDemographics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblFarm`
--

DROP TABLE IF EXISTS `tblFarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblFarm` (
  `farmID` int(11) NOT NULL AUTO_INCREMENT,
  `farmName` varchar(100) DEFAULT NULL,
  `logo` blob DEFAULT NULL,
  `addressID` int(11) DEFAULT NULL,
  PRIMARY KEY (`farmID`),
  KEY `addressID` (`addressID`),
  CONSTRAINT `tblFarm_ibfk_1` FOREIGN KEY (`addressID`) REFERENCES `tblAddress` (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblFarm`
--

LOCK TABLES `tblFarm` WRITE;
/*!40000 ALTER TABLE `tblFarm` DISABLE KEYS */;
INSERT INTO `tblFarm` VALUES
(1,'oldmcdonalds',NULL,6),
(2,'farmfolio',NULL,7),
(3,'E-I-E-I-O',NULL,8),
(4,'test',NULL,9),
(5,'Doe Farms',NULL,10);
/*!40000 ALTER TABLE `tblFarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblFarmUser`
--

DROP TABLE IF EXISTS `tblFarmUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblFarmUser` (
  `farmID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`farmID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `tblFarmUser_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`),
  CONSTRAINT `tblFarmUser_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblFarmUser`
--

LOCK TABLES `tblFarmUser` WRITE;
/*!40000 ALTER TABLE `tblFarmUser` DISABLE KEYS */;
INSERT INTO `tblFarmUser` VALUES
(5,22),
(5,23);
/*!40000 ALTER TABLE `tblFarmUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPayCycle`
--

DROP TABLE IF EXISTS `tblPayCycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPayCycle` (
  `payCycleID` int(11) NOT NULL AUTO_INCREMENT,
  `payCycleYear` char(4) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  PRIMARY KEY (`payCycleID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPayCycle`
--

LOCK TABLES `tblPayCycle` WRITE;
/*!40000 ALTER TABLE `tblPayCycle` DISABLE KEYS */;
INSERT INTO `tblPayCycle` VALUES
(1,'2024','2024-02-17','2024-03-01');
/*!40000 ALTER TABLE `tblPayCycle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPlot`
--

DROP TABLE IF EXISTS `tblPlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPlot` (
  `plotID` int(11) NOT NULL AUTO_INCREMENT,
  `farmID` int(11) DEFAULT NULL,
  `plotName` varchar(100) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `plotSize` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`plotID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblPlot_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPlot`
--

LOCK TABLES `tblPlot` WRITE;
/*!40000 ALTER TABLE `tblPlot` DISABLE KEYS */;
INSERT INTO `tblPlot` VALUES
(1,5,'North Potato Patch',38.895100,-77.036400,371),
(2,5,'Chicken Coop',37.243100,115.793000,500);
/*!40000 ALTER TABLE `tblPlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPlotAction`
--

DROP TABLE IF EXISTS `tblPlotAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPlotAction` (
  `actionID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `plotID` int(11) DEFAULT NULL,
  `dateTimeStart` datetime DEFAULT NULL,
  `dateTimeEnd` datetime DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `timesheetID` int(11) DEFAULT NULL,
  PRIMARY KEY (`actionID`),
  KEY `plotID` (`plotID`),
  KEY `userID` (`userID`),
  KEY `timesheetID` (`timesheetID`),
  CONSTRAINT `tblPlotAction_ibfk_3` FOREIGN KEY (`plotID`) REFERENCES `tblPlotSeason` (`plotID`),
  CONSTRAINT `tblPlotAction_ibfk_4` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`),
  CONSTRAINT `tblPlotAction_ibfk_5` FOREIGN KEY (`timesheetID`) REFERENCES `tblTimesheet` (`timesheetID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPlotAction`
--

LOCK TABLES `tblPlotAction` WRITE;
/*!40000 ALTER TABLE `tblPlotAction` DISABLE KEYS */;
INSERT INTO `tblPlotAction` VALUES
(1,23,1,'2024-02-19 13:05:58','2024-02-19 14:43:54','Fixed the scarecrow and made sure there was no frost forming',1),
(2,23,2,'2024-02-19 15:01:18','2024-02-19 15:25:10','Fed the chickens',1);
/*!40000 ALTER TABLE `tblPlotAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblPlotSeason`
--

DROP TABLE IF EXISTS `tblPlotSeason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblPlotSeason` (
  `plotID` int(11) NOT NULL,
  `dateIn` date NOT NULL,
  `dateOut` date DEFAULT NULL,
  `plotDescription` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`plotID`,`dateIn`),
  CONSTRAINT `tblPlotSeason_ibfk_1` FOREIGN KEY (`plotID`) REFERENCES `tblPlot` (`plotID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPlotSeason`
--

LOCK TABLES `tblPlotSeason` WRITE;
/*!40000 ALTER TABLE `tblPlotSeason` DISABLE KEYS */;
INSERT INTO `tblPlotSeason` VALUES
(1,'2024-02-19',NULL,'Currently growing special winter potatoes'),
(2,'2024-02-19',NULL,'Currently focusing on harvesting eggs from chickens instead of butchering');
/*!40000 ALTER TABLE `tblPlotSeason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRole`
--

DROP TABLE IF EXISTS `tblRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblRole` (
  `roleID` int(11) NOT NULL AUTO_INCREMENT,
  `farmID` int(11) DEFAULT NULL,
  `roleName` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`roleID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblRole_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRole`
--

LOCK TABLES `tblRole` WRITE;
/*!40000 ALTER TABLE `tblRole` DISABLE KEYS */;
INSERT INTO `tblRole` VALUES
(1,5,'Owner',1,'Farm owner role for the Doe Farms farm. Is linked to admin permissions'),
(2,5,'Employee',1,'Employee role for the Doe Farms farm. Only allows neccessary permissions');
/*!40000 ALTER TABLE `tblRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblRolePermission`
--

DROP TABLE IF EXISTS `tblRolePermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblRolePermission` (
  `permID` int(11) NOT NULL AUTO_INCREMENT,
  `roleID` int(11) DEFAULT NULL,
  `JSON` longtext DEFAULT NULL,
  PRIMARY KEY (`permID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `tblRolePermission_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `tblRole` (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRolePermission`
--

LOCK TABLES `tblRolePermission` WRITE;
/*!40000 ALTER TABLE `tblRolePermission` DISABLE KEYS */;
INSERT INTO `tblRolePermission` VALUES
(1,1,'{     \'createRoles\': 1,     \'assignRoles\': 1,     \'deletePlots\': 1 }'),
(2,2,'{     \'createRoles\': 0,     \'assignRoles\': 0,     \'deletePlots\': 0,     \'addPlotAction\': 1 }');
/*!40000 ALTER TABLE `tblRolePermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblTimesheet`
--

DROP TABLE IF EXISTS `tblTimesheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblTimesheet` (
  `timesheetID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `payCycleID` int(11) DEFAULT NULL,
  PRIMARY KEY (`timesheetID`),
  KEY `userID` (`userID`),
  KEY `payCycleID` (`payCycleID`),
  CONSTRAINT `tblTimesheet_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`),
  CONSTRAINT `tblTimesheet_ibfk_2` FOREIGN KEY (`payCycleID`) REFERENCES `tblPayCycle` (`payCycleID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblTimesheet`
--

LOCK TABLES `tblTimesheet` WRITE;
/*!40000 ALTER TABLE `tblTimesheet` DISABLE KEYS */;
INSERT INTO `tblTimesheet` VALUES
(1,23,1);
/*!40000 ALTER TABLE `tblTimesheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUser`
--

DROP TABLE IF EXISTS `tblUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUser` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `hashedPass` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `lastModifiedDate` date DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUser`
--

LOCK TABLES `tblUser` WRITE;
/*!40000 ALTER TABLE `tblUser` DISABLE KEYS */;
INSERT INTO `tblUser` VALUES
(1,'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',NULL,NULL,NULL,NULL,NULL),
(2,'c6ba91b90d922e159893f46c387e5dc1b3dc5c101a5a4522f03b987177a24a91',NULL,NULL,NULL,NULL,NULL),
(3,'5efc2b017da4f7736d192a74dde5891369e0685d4d38f2a455b6fcdab282df9c',NULL,NULL,NULL,NULL,NULL),
(4,'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',NULL,NULL,NULL,NULL,NULL),
(6,'e5add58bef20033735cc124e804709a2f159bbc4ef79681437690fadda0a7fac','test@notreal.com',NULL,NULL,NULL,NULL),
(7,'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f','undefined',NULL,NULL,NULL,NULL),
(8,'181886f60f1d22d4acd788a452aec0b219238bf9a80a8965e77740ac606772c3','undefined',NULL,NULL,NULL,NULL),
(9,'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','g@h.com','Garrett','Hayes',NULL,NULL),
(10,'819423a698f9ea9ba3577f20993cb0da98a79ea22ce5d6550b65b69fb36fd438','nate@fake.com','Nathan','Whiteaker','2024-02-09','2024-02-09'),
(16,'65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5','jdoe@gmail.com','John','Doe','2024-02-12','2024-02-12'),
(17,'65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5','johndoe@gmail.com','John','Doe','2024-02-12','2024-02-12'),
(18,'ddce815c5f6703f37db02325197602c0691efdbf7317677b5d3b6cef35be5ed6','nathan.j.lamb1207@gmail.com','Nathan','Lamb','2024-02-13','2024-02-13'),
(19,'daaad6e5604e8e17bd9f108d91e26afe6281dac8fda0091040a7a6d7bd9b43b5','edburch42@tntech.edu','Evan','Burch','2024-02-13','2024-02-13'),
(20,'e5add58bef20033735cc124e804709a2f159bbc4ef79681437690fadda0a7fac','njwhiteake42@tntech.edu','Nathan','Whiteaker','2024-02-15','2024-02-15'),
(21,'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','test','test','test','2024-02-19','2024-02-19'),
(22,'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','jd@gmail.com','John','Doe','2024-02-19','2024-02-19'),
(23,'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','ld@gmail.com','Larry','Doe','2024-02-20','2024-02-20'),
(24,'aaa9402664f1a41f40ebbc52c9993eb66aeb366602958fdfaa283b71e64db123','h','','h','2024-02-20','2024-02-20');
/*!40000 ALTER TABLE `tblUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUserRole`
--

DROP TABLE IF EXISTS `tblUserRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUserRole` (
  `userID` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  PRIMARY KEY (`userID`,`roleID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `tblUserRole_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`),
  CONSTRAINT `tblUserRole_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `tblRole` (`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUserRole`
--

LOCK TABLES `tblUserRole` WRITE;
/*!40000 ALTER TABLE `tblUserRole` DISABLE KEYS */;
INSERT INTO `tblUserRole` VALUES
(22,1),
(23,2);
/*!40000 ALTER TABLE `tblUserRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblUserSession`
--

DROP TABLE IF EXISTS `tblUserSession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblUserSession` (
  `userID` int(11) NOT NULL,
  `sessionToken` varchar(100) DEFAULT NULL,
  `timeIn` datetime DEFAULT NULL,
  `timeOut` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `farmID` int(11) DEFAULT NULL,
  KEY `userID` (`userID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblUserSession_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`),
  CONSTRAINT `tblUserSession_ibfk_2` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUserSession`
--

LOCK TABLES `tblUserSession` WRITE;
/*!40000 ALTER TABLE `tblUserSession` DISABLE KEYS */;
INSERT INTO `tblUserSession` VALUES
(9,'dec5f6e5-0f6b-4f7b-8360-42a322d12734','2024-02-23 14:06:13',NULL,1,NULL),
(9,'b5040cba-e007-4f7e-9fa8-05b744130f7c','2024-02-23 15:04:13',NULL,1,NULL),
(9,'e96a3651-1c0b-4061-8f0d-9b34b14cbf02','2024-02-23 15:05:44',NULL,1,NULL),
(9,'d5cba97f-f606-4754-aa83-81b315c95521','2024-02-23 15:14:36',NULL,1,NULL),
(22,'fa837af2-5a8b-4202-a3df-075a771fa4b4','2024-02-23 16:49:55',NULL,1,NULL);
/*!40000 ALTER TABLE `tblUserSession` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-26  5:43:28
