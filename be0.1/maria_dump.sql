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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAddress`
--

LOCK TABLES `tblAddress` WRITE;
/*!40000 ALTER TABLE `tblAddress` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAddressType`
--

LOCK TABLES `tblAddressType` WRITE;
/*!40000 ALTER TABLE `tblAddressType` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnimal`
--

LOCK TABLES `tblAnimal` WRITE;
/*!40000 ALTER TABLE `tblAnimal` DISABLE KEYS */;
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
  `actions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`actions`)),
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`actionID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblAnimalAction_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`),
  CONSTRAINT `tblAnimalAction_ibfk_2` FOREIGN KEY (`actionID`) REFERENCES `tblPlotAction` (`actionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblAnimalAction`
--

LOCK TABLES `tblAnimalAction` WRITE;
/*!40000 ALTER TABLE `tblAnimalAction` DISABLE KEYS */;
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
  `actions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`actions`)),
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`actionID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblCropAction_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`),
  CONSTRAINT `tblCropAction_ibfk_2` FOREIGN KEY (`actionID`) REFERENCES `tblPlotAction` (`actionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblCropAction`
--

LOCK TABLES `tblCropAction` WRITE;
/*!40000 ALTER TABLE `tblCropAction` DISABLE KEYS */;
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
  `countryOfOrigin` varchar(100) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `tblDemographics_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblDemographics`
--

LOCK TABLES `tblDemographics` WRITE;
/*!40000 ALTER TABLE `tblDemographics` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblFarm`
--

LOCK TABLES `tblFarm` WRITE;
/*!40000 ALTER TABLE `tblFarm` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `tblFarmUser` ENABLE KEYS */;
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
  PRIMARY KEY (`plotID`),
  KEY `farmID` (`farmID`),
  CONSTRAINT `tblPlot_ibfk_1` FOREIGN KEY (`farmID`) REFERENCES `tblFarm` (`farmID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPlot`
--

LOCK TABLES `tblPlot` WRITE;
/*!40000 ALTER TABLE `tblPlot` DISABLE KEYS */;
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
  PRIMARY KEY (`actionID`),
  KEY `plotID` (`plotID`),
  KEY `userID` (`userID`),
  CONSTRAINT `tblPlotAction_ibfk_3` FOREIGN KEY (`plotID`) REFERENCES `tblPlotSeason` (`plotID`),
  CONSTRAINT `tblPlotAction_ibfk_4` FOREIGN KEY (`userID`) REFERENCES `tblUser` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblPlotAction`
--

LOCK TABLES `tblPlotAction` WRITE;
/*!40000 ALTER TABLE `tblPlotAction` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRole`
--

LOCK TABLES `tblRole` WRITE;
/*!40000 ALTER TABLE `tblRole` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblRolePermission`
--

LOCK TABLES `tblRolePermission` WRITE;
/*!40000 ALTER TABLE `tblRolePermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblRolePermission` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(11,'819423a698f9ea9ba3577f20993cb0da98a79ea22ce5d6550b65b69fb36fd438','nate@fake.com','Nathan','Whiteaker','2024-02-09','2024-02-09');
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
(9,'567a18b7-2000-4a89-9a18-49d8b5c37f18','2024-02-10 22:33:31',NULL,NULL);
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

-- Dump completed on 2024-02-12 19:38:48
