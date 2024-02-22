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
  KEY `userID` (`userID`),
  CONSTRAINT `tblUserSession_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblUserSession`
--

LOCK TABLES `tblUserSession` WRITE;
/*!40000 ALTER TABLE `tblUserSession` DISABLE KEYS */;
INSERT INTO `tblUserSession` VALUES
(1,'859a4a94-f8cc-42eb-b6ae-ac2c52710deb',NULL,NULL,NULL),
(1,'88174f81-1e0e-4e04-8c8e-cea462606182',NULL,NULL,NULL),
(1,'a87c5cf8-5366-4750-886b-14dd71dfaee0',NULL,NULL,NULL),
(8,'3c21f97f-980d-4d57-929d-1bb5989e71ec',NULL,NULL,NULL),
(8,'361d7372-8bb2-4ca2-8e54-8eb814d88cc3',NULL,NULL,NULL),
(8,'5af364c9-bbae-4306-8d01-13c3e8da4adc',NULL,NULL,NULL),
(8,'1a2a669c-e924-4f77-8994-a80dcb43ccea',NULL,NULL,NULL),
(8,'0d7b12f0-530e-4e55-8f42-700851182bf8',NULL,NULL,NULL),
(1,'108f0a1c-cf67-407d-8ed0-66a09a47ef7d',NULL,NULL,NULL),
(1,'aef0c541-eb9a-482a-8a75-33fe6262c528',NULL,NULL,NULL),
(1,'ac412c9b-a1f6-4246-9789-0acb07840fe4',NULL,NULL,NULL),
(1,'5d831860-a652-40b1-b20e-5e43c359320b',NULL,NULL,NULL),
(3,'7a39c4aa-e59b-4dc5-926b-c3ad129c7a6e',NULL,NULL,NULL),
(1,'51d65475-29f2-4416-b545-526d6580c9f9',NULL,NULL,NULL),
(3,'b8429005-6e6f-4555-99fb-0100ced3fffe',NULL,NULL,NULL),
(6,'9cf11307-be00-427a-9db3-00f2c8c9f4c7',NULL,NULL,NULL),
(6,'93bc02a4-3c07-4dd9-8b40-33b02071833b',NULL,NULL,NULL),
(9,'d0f10c4e-001a-4bcf-8545-7e5035249347',NULL,NULL,NULL),
(9,'595be672-64e5-4070-b777-82703e81f5be',NULL,NULL,NULL),
(9,'f4857664-c539-43ec-8c64-2d46ddd99c53',NULL,NULL,NULL),
(9,'d8e37f27-1557-41e7-a8b4-1a09deb4c567',NULL,NULL,NULL),
(9,'5da84970-b9d8-41e9-b56b-4d9bd2936caf',NULL,NULL,NULL),
(9,'dacacf64-afc7-4aa3-b4f1-cc8989111850',NULL,NULL,NULL),
(9,'2548092f-f7b8-4eaf-a294-0278a2948e54',NULL,NULL,NULL),
(9,'d1a02048-3bce-481c-b434-bf1b8f6fd991',NULL,NULL,NULL),
(9,'dab1f9cc-8a94-4ad9-9541-72a551c6f200',NULL,NULL,NULL),
(9,'81086795-5071-4d5b-9e39-b5124f34c01c',NULL,NULL,NULL),
(9,'84bc72de-5072-49fb-9ca9-504041d9c511',NULL,NULL,NULL),
(9,'27afa3ae-d269-4812-97ea-33bb28d07b33',NULL,NULL,NULL),
(9,'1bdeb17e-940d-4a40-83df-d96d0cabc4fc',NULL,NULL,NULL),
(9,'38cf97a4-769b-4919-844b-3481019bd4f4',NULL,NULL,NULL),
(9,'ad977de1-cb8d-4d13-9059-e7dbc410cc57',NULL,NULL,NULL),
(9,'98267a17-8336-45ec-bb59-8aad7b48808d',NULL,NULL,NULL),
(9,'6a8c6ee7-fb5e-448a-9042-bc75b83a5706',NULL,NULL,NULL),
(9,'d20be0fc-c14c-4989-876f-40f8c6aa2d4f',NULL,NULL,NULL),
(9,'411ed691-ac34-4e75-9646-5a90e3081e69',NULL,NULL,NULL),
(9,'890e87d1-69ec-4acb-a187-33851ada83c8',NULL,NULL,NULL),
(9,'448af855-ecd5-4ea6-a96d-718b05987a38','2024-02-09 15:03:04',NULL,NULL),
(9,'3ebb88a0-f020-4a8c-b5cf-f7777362073d','2024-02-09 15:05:18',NULL,NULL),
(9,'5dca2aa2-7db4-4e9f-ab42-6b917fb0edba','2024-02-09 15:10:45',NULL,NULL),
(9,'c55ccec1-a4b5-4764-9c60-8cfe255ba56c','2024-02-09 15:29:20',NULL,NULL),
(9,'f4e6b0b6-96d1-4f40-bdca-851047168735','2024-02-09 15:29:32',NULL,NULL),
(9,'8b96ea4a-807c-434b-8939-02abe3f300fb','2024-02-09 15:31:08',NULL,NULL),
(9,'71639ed9-83db-40d6-bab8-6c122350628c','2024-02-09 15:33:04',NULL,NULL),
(9,'deed7f67-4c76-464d-a132-e08dda71a971','2024-02-09 15:38:09',NULL,NULL),
(9,'eea842b7-3733-4bbe-b216-410ec9bc0b92','2024-02-09 15:39:23',NULL,NULL),
(9,'5ee149f2-9345-46f6-8421-d7924966cd2c','2024-02-09 18:28:03',NULL,NULL),
(9,'20c6ec9e-6116-4216-8a61-f1dd8e5b0f36','2024-02-10 20:16:22',NULL,NULL),
(9,'567a18b7-2000-4a89-9a18-49d8b5c37f18','2024-02-10 22:33:31',NULL,NULL),
(9,'1e2150fd-8151-495e-a382-bd6605c0cdf8','2024-02-13 00:41:37',NULL,NULL),
(19,'52bc37e7-f9a1-44cb-9edf-60c41fdda6cb','2024-02-13 00:41:54',NULL,NULL),
(9,'9db978f8-7e9c-44ec-ada2-198c99cf5baa','2024-02-13 15:55:41',NULL,NULL),
(9,'62af19c7-b6e2-4b32-bcd5-baf011ac248d','2024-02-13 15:57:18',NULL,NULL),
(9,'8e9d666d-8af2-4aea-96fa-46c861224251','2024-02-13 16:00:53',NULL,NULL),
(9,'4f6fe6d7-977a-436e-9937-14d2b4ecbc6a','2024-02-13 16:02:47',NULL,NULL),
(9,'24767409-72b1-417c-83f0-a7c62038b16e','2024-02-13 16:06:42',NULL,NULL),
(9,'e2367dda-62bf-4d48-81bd-2297bd96cf5a','2024-02-13 16:08:23',NULL,NULL),
(9,'1acd0950-6ccd-438c-aa53-c3f0644bbcf0','2024-02-13 16:11:02',NULL,NULL),
(9,'c6c2bdd2-cc48-4fe0-b3f5-5ac8bb5ce7e2','2024-02-13 16:13:45',NULL,NULL),
(9,'10ad9eca-4167-4bb3-be6a-9b75c942444d','2024-02-13 16:15:18',NULL,NULL),
(9,'5519dc7a-b05c-4ebb-9fb7-947f90ca6a53','2024-02-13 16:54:41',NULL,NULL),
(9,'117deb66-f1d9-463f-bbdc-8eb89014418d','2024-02-13 17:03:07',NULL,NULL),
(9,'c93f00a7-fade-4ad6-8dac-31572bcf3b9d','2024-02-13 17:08:46',NULL,NULL),
(9,'8854031f-5128-4f60-9dc0-6515ae6c9f24','2024-02-13 17:24:23',NULL,NULL),
(9,'0744d0c5-81e9-4a6e-93c3-187495df0e29','2024-02-13 17:26:56',NULL,NULL),
(9,'3a0c3d11-ca75-44c9-a112-e82666e55f31','2024-02-13 17:31:32',NULL,NULL),
(9,'d2ab4177-464e-4232-b707-edd49193b1d2','2024-02-13 17:36:36',NULL,NULL),
(9,'a24c452c-6eac-44a3-9f69-166870575aba','2024-02-13 18:12:50',NULL,NULL),
(9,'b00f6b1e-9262-4791-be38-466cfba9b554','2024-02-13 20:55:11',NULL,NULL),
(9,'05116900-6da8-45a8-ae62-45582d8dfd90','2024-02-15 15:43:35',NULL,NULL),
(9,'3b21936e-1a46-4042-b6d9-72c72fb13fb7','2024-02-15 15:48:23',NULL,NULL),
(9,'4d4d404b-6641-4a31-9aa4-f9456cd78e23','2024-02-15 15:49:29',NULL,NULL),
(9,'61f72289-c717-4a12-855f-5646ed82bbae','2024-02-15 15:50:00',NULL,NULL),
(9,'3b73f8f4-885d-4ee2-953c-bdec92a8062a','2024-02-15 16:00:45',NULL,NULL),
(9,'ebaed181-5887-40bf-8a5b-c1d40ee12b09','2024-02-15 16:13:16',NULL,NULL),
(9,'8a168e71-f7fe-4a97-b2ad-dc0586aa7840','2024-02-15 16:20:31',NULL,NULL),
(9,'9dda4e9f-b920-4be1-98ea-88379c36bf4c','2024-02-15 16:21:31',NULL,NULL),
(9,'f2ded6db-957b-4ee9-b51d-b3b98ae119c6','2024-02-15 16:54:52',NULL,NULL),
(9,'c3a4a7cb-aa3e-49fd-ab47-2c738cc149cb','2024-02-15 18:08:44',NULL,NULL),
(19,'3dad23af-e62d-4f28-9b48-6a94db86f29f','2024-02-15 18:11:50',NULL,NULL),
(9,'13286227-9078-4b0f-a96a-548b5a61f06f','2024-02-15 18:18:11',NULL,NULL),
(20,'0c9d5abe-5611-4420-a5de-82ea16ed3e81','2024-02-15 18:37:29',NULL,NULL),
(9,'b1f2561a-8995-465f-8d5a-f550dd493f3f','2024-02-15 19:17:08',NULL,NULL),
(9,'6ff92959-ba4c-47d0-9166-b583b6400c98','2024-02-16 02:09:38',NULL,NULL),
(9,'c300bc88-8b58-4f97-a736-8fc57f91256c','2024-02-16 05:00:07',NULL,NULL),
(9,'ad0a2ef9-6fb0-4db5-89c3-4deed66ccefd','2024-02-16 13:52:03',NULL,NULL),
(9,'8f1bb462-5960-4296-b616-f0b7c4d2b6b9','2024-02-16 14:13:59',NULL,NULL),
(16,'f6ff0e88-e748-405d-b52c-481b6cb0f902','2024-02-16 15:20:39',NULL,NULL),
(9,'1f7111c0-68b7-45a0-bed7-5e375e23ab83','2024-02-16 16:42:17',NULL,NULL),
(9,'4884aef6-83dd-45fa-9709-8310c1588fc8','2024-02-16 19:03:52',NULL,NULL),
(9,'a133bde7-e69d-4f91-9663-34a69a503d03','2024-02-16 19:17:31',NULL,NULL),
(19,'31c39d18-35b1-4280-9c6f-8f38bceafb72','2024-02-16 23:56:12',NULL,NULL),
(19,'c569d9c7-428a-41de-badd-b24e83a168d7','2024-02-17 01:52:15',NULL,NULL),
(9,'9ff240d6-dd9a-47b8-a0dd-c9211a36b399','2024-02-17 02:14:48',NULL,NULL),
(9,'ff759e02-9c27-42e4-a1a7-1217d995489b','2024-02-17 02:42:04',NULL,NULL),
(9,'430e7417-c7bf-489d-a3d0-c7ca86ba67f7','2024-02-17 03:01:39',NULL,NULL),
(9,'84817943-4cba-4e8f-9773-9b7e451ff59c','2024-02-17 04:37:31',NULL,NULL),
(9,'2ab3d784-eb49-4e0b-a4c6-6da09ae5449b','2024-02-17 14:45:53',NULL,NULL),
(9,'11044fdc-68f0-4335-ba42-e8d73a8eb959','2024-02-17 14:53:25',NULL,NULL),
(9,'b1e26029-7bc1-482c-8720-6188a905e181','2024-02-17 14:55:52',NULL,NULL),
(9,'b29aed43-83e6-440b-860b-13555173e1f8','2024-02-17 18:36:59',NULL,NULL),
(9,'847b935c-b5f3-454c-8bf3-a578eea61df6','2024-02-18 12:32:50',NULL,NULL),
(9,'9c4fa962-caea-4bbb-9cc2-0770d7cf52a5','2024-02-18 13:08:43',NULL,NULL),
(9,'bf338432-f95f-4c54-b47f-f228afdcabfe','2024-02-18 15:37:59',NULL,NULL),
(9,'bba1aad1-4ec0-4d9a-96fb-52123085ee75','2024-02-18 15:41:33',NULL,NULL),
(9,'0db0da36-500e-41cd-9deb-1da3b5118abe','2024-02-18 20:16:46',NULL,NULL),
(9,'15c594ce-cf2d-49e7-8e65-58725f7177ab','2024-02-18 20:23:41',NULL,NULL),
(9,'107c1632-e1a3-4721-abf4-6c4c1686d5ba','2024-02-18 20:36:44',NULL,NULL),
(9,'9bdaf72a-7fdd-468b-87e0-f4aeb33975fd','2024-02-18 20:37:36',NULL,NULL),
(9,'5acd34b9-df6c-4b3d-88f7-55694dbfc704','2024-02-18 20:46:00',NULL,NULL),
(9,'fa7e9423-d1e1-4ec6-b336-d4ae1c3af582','2024-02-18 21:09:00',NULL,NULL),
(19,'90b31a50-1f91-4005-a2fc-1491a7d2c668','2024-02-18 23:24:24',NULL,NULL),
(9,'ced4ffb9-dfea-4124-8a79-9e3a385e9ab0','2024-02-19 00:13:18',NULL,NULL),
(19,'d8266e33-3520-4ffd-9a13-30d69518816c','2024-02-19 00:38:31',NULL,NULL),
(9,'66e1be86-144d-4f7a-bdbd-01059e840693','2024-02-19 01:58:14',NULL,NULL),
(9,'d86d63ea-a72a-42cf-b86a-4a54006132a2','2024-02-19 02:01:40',NULL,NULL),
(9,'35e72b62-f4c6-4bed-bea2-6fe22d1a524d','2024-02-19 13:55:28',NULL,NULL),
(9,'83bbc0f6-199a-4e3e-b349-182ee0970430','2024-02-19 13:56:41',NULL,NULL),
(9,'54bbf71e-64bd-44cd-b181-12d440548f37','2024-02-19 14:07:39',NULL,NULL),
(9,'86e09973-c6d0-4e61-93ae-456ca1c33cf8','2024-02-19 14:15:09',NULL,NULL),
(22,'c6a15fac-f2d0-47cc-b878-b3d701fd79eb','2024-02-19 14:53:26',NULL,NULL),
(9,'606c406e-d75c-4492-862e-96aff9cbf886','2024-02-19 14:55:51',NULL,NULL),
(22,'e15ddb37-65f7-40b1-a08d-8ef23f4d68bb','2024-02-19 14:56:30',NULL,NULL),
(9,'db7283fb-e3a5-46a7-8817-6389daebc700','2024-02-19 14:57:15',NULL,NULL),
(9,'26d6b322-f7c9-4bc1-ae88-db7fc5ceaaab','2024-02-19 14:57:53',NULL,NULL),
(9,'9398ad27-a459-491f-9dc3-0112dca1052c','2024-02-19 16:05:34',NULL,NULL),
(22,'9346b91e-9c4b-43fe-b37d-2a1f96c5ce58','2024-02-19 19:25:48',NULL,NULL),
(22,'28c37d9e-1730-4eda-a109-5ee9a8ab6738','2024-02-19 19:26:08',NULL,NULL),
(9,'738af7a4-848e-4247-a8aa-da2ffc2ce166','2024-02-19 19:32:17',NULL,NULL),
(22,'a194e0cb-1307-4a45-b762-30b587df204f','2024-02-19 20:49:28',NULL,NULL),
(9,'03ec6f45-801d-4761-b583-a2a239447023','2024-02-19 23:53:07',NULL,NULL),
(9,'5ec6894a-fbd3-46d4-b053-4885cb2907b3','2024-02-20 15:40:01',NULL,NULL),
(9,'c9d0d739-3ad1-4ab9-9b9d-f0cf23396c78','2024-02-20 15:48:06',NULL,NULL),
(9,'26436cb8-c051-4671-b7f1-219475c46c35','2024-02-20 15:56:05',NULL,NULL),
(19,'759b6f65-e9e6-4441-8156-b895ce389c40','2024-02-20 16:29:10',NULL,1),
(9,'46865125-d162-4a00-bff6-d670afd51b62','2024-02-20 16:39:53',NULL,1),
(9,'247dc9c7-ee4d-459d-9be0-eef32241def1','2024-02-20 16:40:27',NULL,1),
(9,'194273f6-6bf5-400d-9b61-125362e8efcf','2024-02-20 16:43:22',NULL,1),
(9,'eb5cfa58-d3dc-4c7c-9c39-3f27914c3b1f','2024-02-20 16:43:30',NULL,1),
(9,'757d953f-6ae9-4bf9-8904-f23b581536d1','2024-02-20 17:23:06',NULL,1),
(9,'ef512864-15ee-4dfd-a39b-1e3f312cea11','2024-02-20 18:32:13',NULL,1),
(9,'b883794d-b7b5-4dd2-a09c-eb88d87c9415','2024-02-20 19:03:35',NULL,1),
(9,'2912882e-3f9e-4a23-bfa7-12ecc6bf3981','2024-02-20 19:21:37',NULL,1),
(9,'0d309ffb-cc15-40da-9a0e-b00eed81e858','2024-02-20 19:24:41',NULL,1),
(9,'5e22f694-3c6f-4e30-a6af-86021d662024','2024-02-20 19:32:45',NULL,1),
(9,'77e71ccf-91f9-49c2-97c4-6b686d2f1325','2024-02-20 19:33:12',NULL,1),
(9,'7ab04145-28d5-4b6e-b58f-c2a0a3d29ca9','2024-02-20 19:34:47',NULL,1),
(22,'9797319f-4c27-4fb0-978f-0d6d7bfa5581','2024-02-20 23:11:54',NULL,1),
(9,'671c47b0-5609-4691-bb24-b033abe04d84','2024-02-21 02:39:40',NULL,1),
(9,'1a783205-2878-444a-bc75-3b4576dc8a13','2024-02-21 02:41:18',NULL,1),
(9,'0e96c844-7846-498b-b444-72b1333c4d15','2024-02-21 02:47:01',NULL,1),
(9,'66c17fb0-8030-4313-a435-af7e7128ec60','2024-02-21 02:50:59',NULL,1),
(9,'00e2facd-89eb-4b99-a344-d426894fc7af','2024-02-21 02:52:48',NULL,1),
(9,'039c443e-5814-4ef6-9751-d7e8921f5432','2024-02-21 02:57:09',NULL,1),
(9,'7e1ce741-51fe-4810-ac6b-7be1e4a8bb20','2024-02-21 03:30:30',NULL,1),
(9,'916f95a1-a106-4037-bcc8-3244fe159184','2024-02-21 03:52:34',NULL,1),
(9,'8129cea7-7e40-4245-8014-009d6cd2d1c8','2024-02-21 04:03:01',NULL,1),
(9,'239d08bb-7702-46a2-ab87-2005c16f8bbe','2024-02-21 04:11:52',NULL,1),
(9,'638fcb9c-e39d-44f4-bc5d-adf136afba72','2024-02-21 04:15:07',NULL,1),
(9,'d7dcff22-72c6-41dd-85fe-88b4c9426505','2024-02-21 04:19:10',NULL,1),
(9,'a40f8797-35ff-4acd-be44-e2cfe7be6839','2024-02-21 04:23:57',NULL,1),
(9,'fd9557e2-1dad-47a4-8df1-c6fcc2ee3a8e','2024-02-21 04:25:23',NULL,1),
(9,'e04f42e1-4615-4cd5-a289-def7e0b5cecb','2024-02-21 04:53:27',NULL,1),
(9,'d3d3d514-3e43-45cb-bd0b-a55c6d8869d0','2024-02-21 14:55:47',NULL,1),
(9,'56ccb1ab-5ef8-4224-9531-725804788e36','2024-02-21 15:01:50',NULL,1),
(9,'65a24744-2403-43a7-a699-e601bc4ec98e','2024-02-21 15:03:04',NULL,1),
(9,'2f43115a-d527-42e0-b2b1-2cd0f1a15e11','2024-02-21 15:05:30',NULL,1),
(9,'372215db-6d5b-41a3-b3f3-2fba782e685e','2024-02-21 15:06:15',NULL,1),
(9,'5a2d1497-9f8f-48b8-bc1f-015628d8a4c6','2024-02-21 15:07:35',NULL,1),
(9,'a674194b-ec17-4e4d-bf0c-41e866c2ef34','2024-02-21 15:12:57',NULL,1),
(9,'5e5585eb-c865-4210-86f5-4ba536c78061','2024-02-21 15:15:01',NULL,1),
(9,'d567c7f9-d70d-44d8-8b50-4919b930164a','2024-02-21 15:19:33',NULL,1),
(9,'6b65c6c5-f82d-4452-9c67-02d51b2deca7','2024-02-21 15:21:48',NULL,1),
(9,'178966cc-d7cf-4b30-84e7-4bf41ac9c2ee','2024-02-21 15:25:37',NULL,1),
(9,'b8a86c45-d11e-4720-a5f6-69c134a73c22','2024-02-21 15:35:48',NULL,1),
(9,'be91f2bd-6ffd-44bb-aa4d-9e1c1a96d474','2024-02-21 15:37:27',NULL,1),
(9,'2c3bcbaf-6a0c-4b34-982b-0fd12776cc4a','2024-02-21 15:38:38',NULL,NULL),
(9,'f22752d0-d9e5-410d-a97c-06c4af70bc58','2024-02-21 15:46:35',NULL,NULL),
(9,'b54aebcb-07a9-4d88-ab3e-be45d6e3deac','2024-02-21 16:00:04',NULL,NULL),
(9,'098eda9f-1725-4ab8-a209-854bd7bc0778','2024-02-21 16:23:03',NULL,NULL),
(9,'c428ffda-5731-4fad-addd-db26feaeabf3','2024-02-21 16:34:09',NULL,NULL),
(9,'6f91457a-892a-4bd5-99c8-0cb3819f8ab4','2024-02-21 16:36:47',NULL,NULL),
(9,'acc609b4-b9ed-49e5-b8ca-c29605305586','2024-02-21 16:37:23',NULL,NULL),
(9,'5bea071d-9a35-45f4-b8d1-1098b816a91a','2024-02-21 16:42:43',NULL,NULL),
(9,'3ffcfd18-d64a-41e1-ae58-e1909a9f6031','2024-02-21 16:44:30',NULL,NULL),
(9,'f14ddb58-93fa-425b-8451-22e55d0f7db5','2024-02-21 16:52:07',NULL,NULL),
(9,'5fa4a97b-5805-4011-9ccb-9a0a404fbd51','2024-02-21 16:56:27',NULL,NULL),
(9,'2890dfb4-6faf-4f37-841d-f9ea812cfbe9','2024-02-21 17:01:25',NULL,NULL),
(9,'130ecc67-0cf0-4be7-8182-e226c717d83c','2024-02-21 17:02:12',NULL,NULL),
(9,'ca4cee5b-cb8c-44d3-86dd-e115ea58079a','2024-02-21 17:03:31',NULL,NULL),
(9,'1ee70d12-cc49-4dac-85a6-e5bc1ac14d2e','2024-02-21 17:07:53',NULL,NULL),
(9,'12a61aa5-053d-414e-9d41-57703fc37bd3','2024-02-21 17:08:11',NULL,NULL),
(9,'b0ef60b8-5966-4947-995f-69ab75df83c9','2024-02-21 17:16:31',NULL,NULL),
(9,'a8572a5b-e13b-4571-a50f-f04651e3735f','2024-02-21 17:50:56',NULL,NULL),
(9,'912c066f-ebb6-43d0-b566-5185453608fb','2024-02-21 18:45:16',NULL,NULL),
(9,'4c73b07d-ac06-4b64-9be4-b77c16f6c6a5','2024-02-21 19:11:15',NULL,NULL),
(9,'a9740810-c203-48d8-9a89-559938b1ce61','2024-02-22 15:37:40',NULL,NULL),
(9,'db98de91-e6fa-4e72-886d-24b987933429','2024-02-22 15:37:46',NULL,NULL),
(9,'1128c2c2-aee0-4cc9-82ef-3c988053f6c4','2024-02-22 16:17:32',NULL,1),
(9,'deb1e119-5c3d-4a99-be3c-39b079d921f6','2024-02-22 16:21:58',NULL,1),
(9,'f9e89122-b5ae-4638-9d50-efc0228d48bf','2024-02-22 18:36:45',NULL,1),
(22,'944f8790-5af7-4b94-92dc-87889d522c1d','2024-02-22 18:48:16',NULL,1);
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

-- Dump completed on 2024-02-22 22:58:12
