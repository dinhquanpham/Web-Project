-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Eiichiro Oda','2022-11-15 15:37:00','2022-11-15 15:37:00'),(2,'Masashi Kishimoto','2022-11-15 15:37:43','2022-11-15 15:37:43'),(3,'Tite Kubo','2022-11-15 15:38:10','2022-11-15 15:38:10'),(4,'Akira Toriyama','2022-11-15 15:38:29','2022-11-15 15:38:29');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNumber` int NOT NULL,
  `price` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderdetails_productId_orderId_unique` (`orderId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderDate` datetime NOT NULL,
  `shippedDate` datetime DEFAULT NULL,
  `paidAmount` int DEFAULT NULL,
  `paidStatus` tinyint(1) DEFAULT NULL,
  `paidAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `allowed` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_set`
--

DROP TABLE IF EXISTS `product_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_set` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `newestChap` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `providerId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_set`
--

LOCK TABLES `product_set` WRITE;
/*!40000 ALTER TABLE `product_set` DISABLE KEYS */;
INSERT INTO `product_set` VALUES (5,'Naruto',NULL,20,'2022-11-15 15:07:10','2022-11-15 15:32:45','1'),(6,'Dragon Ball',NULL,4,'2022-11-15 15:07:20','2022-11-15 15:32:37','1'),(7,'One Piece',NULL,5,'2022-11-15 15:07:27','2022-11-15 15:30:52','1'),(8,'Bleach',NULL,4,'2022-11-15 15:07:33','2022-11-15 15:13:50','1');
/*!40000 ALTER TABLE `product_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `quantityInStock` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `publishedYear` int NOT NULL,
  `productSize` varchar(255) NOT NULL,
  `pageNumber` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `soldStatus` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int DEFAULT NULL,
  `productsetId` int DEFAULT NULL,
  `providerId` int DEFAULT NULL,
  `soldNumber` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `productsetId` (`productsetId`),
  KEY `providerId` (`providerId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`productsetId`) REFERENCES `product_set` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`providerId`) REFERENCES `providers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Naruto Tập 1',25000,1,NULL,2018,'17.6 x 11.3 cm',202,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-1---tb-2022.jpg',1,'2022-11-15 14:55:49','2022-11-15 14:55:49',2,5,NULL,5),(2,'Naruto Tập 2',25000,10,NULL,2019,'17.6 x 11.3 cm',201,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-2.jpg',1,'2022-11-15 14:56:17','2022-11-22 14:49:00',2,5,NULL,1),(3,'Naruto Tập 3',25000,7,NULL,2019,'17.6 x 11.3 cm',333,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-3.jpg',1,'2022-11-15 14:56:41','2022-11-22 14:51:28',2,5,NULL,1),(4,'Naruto Tập 4',25000,0,NULL,2019,'17.6 x 11.3 cm',123,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-4.jpg',1,'2022-11-15 14:56:58','2022-11-15 14:56:58',2,5,NULL,1),(5,'Naruto Tập 5',25000,0,NULL,2019,'17.6 x 11.3 cm',213,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-5.jpg',1,'2022-11-15 14:59:40','2022-11-15 14:59:40',2,5,NULL,1),(6,'Naruto Tập 6',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-6.jpg',1,'2022-11-15 15:00:24','2022-11-15 15:00:24',2,5,NULL,1),(7,'Naruto Tập 7',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-7.jpg',1,'2022-11-15 15:00:27','2022-11-15 15:00:27',2,5,NULL,1),(8,'Naruto Tập 8',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-8.jpg',1,'2022-11-15 15:00:30','2022-11-15 15:00:30',2,5,NULL,1),(9,'Naruto Tập 9',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-9.jpg',1,'2022-11-15 15:00:33','2022-11-15 15:00:33',2,5,NULL,1),(10,'Naruto Tập 10',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866155.jpg',1,'2022-11-15 15:00:36','2022-11-15 15:00:36',2,5,NULL,6),(11,'Naruto Tập 11',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866162.jpg',1,'2022-11-15 15:00:40','2022-11-15 15:00:40',2,5,NULL,1),(12,'Naruto Tập 12',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866179.jpg',1,'2022-11-15 15:00:42','2022-11-15 15:00:42',2,5,NULL,1),(13,'Naruto Tập 13',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866186.jpg',1,'2022-11-15 15:00:45','2022-11-15 15:00:45',2,5,NULL,1),(14,'Naruto Tập 14',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866193.jpg',1,'2022-11-15 15:00:52','2022-11-15 15:00:52',2,5,NULL,1),(15,'Naruto Tập 15',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866209.jpg',1,'2022-11-15 15:00:54','2022-11-15 15:00:54',2,5,NULL,1),(16,'Naruto Tập 16',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866216.jpg',1,'2022-11-15 15:00:58','2022-11-15 15:00:58',2,5,NULL,1),(17,'Naruto Tập 17',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/17_c54469b4e13643a89c3b9aa57b35e9b4.jpg',1,'2022-11-15 15:01:13','2022-11-15 15:01:13',2,5,NULL,1),(18,'Naruto Tập 18',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/18_f8362e1662e646aea920250e545b6999.jpg',1,'2022-11-15 15:01:15','2022-11-15 15:01:15',2,5,NULL,10),(19,'Naruto Tập 19',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/19_37_647b99bd6e84496ebed8a7fe7c08bb33.jpg',1,'2022-11-15 15:01:19','2022-11-15 15:01:19',2,5,NULL,1),(20,'Naruto Tập 20',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/20_35_ea1ed69322e442fb8a4f957f5c07a177.jpg',1,'2022-11-15 15:01:23','2022-11-15 15:01:23',2,5,NULL,1),(21,'One Piece Tập 1',20000,2,NULL,2020,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:14','2022-11-15 15:02:14',1,7,NULL,1),(22,'One Piece Tập 2',20000,2,NULL,2020,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:17','2022-11-15 15:02:17',1,7,NULL,1),(23,'One Piece Tập 3',20000,2,NULL,2020,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:19','2022-11-15 15:02:19',1,7,NULL,1),(24,'One Piece Tập 4',20000,2,NULL,2020,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:23','2022-11-15 15:02:23',1,7,NULL,1),(25,'One Piece Tập 5',20000,2,NULL,2020,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:25','2022-11-15 15:02:25',1,7,NULL,123),(26,'Bleach Tập 1',22000,2,NULL,2021,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:42','2022-11-15 15:02:42',3,8,NULL,1),(27,'Bleach Tập 2',22000,2,NULL,2021,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:46','2022-11-15 15:02:46',3,8,NULL,1),(28,'Bleach Tập 3',22000,2,NULL,2021,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:48','2022-11-15 15:02:48',3,8,NULL,1),(29,'Bleach Tập 4',22000,2,NULL,2021,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:02:51','2022-11-15 15:02:51',3,8,NULL,1),(30,'Dragon Ball Tập 1',19000,7,NULL,2022,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:03:28','2022-11-15 15:03:28',4,6,NULL,1),(31,'Dragon Ball Tập 2',19000,7,NULL,2022,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:03:30','2022-11-15 15:03:30',4,6,NULL,1),(32,'Dragon Ball Tập 3',19000,7,NULL,2022,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:03:33','2022-11-15 15:03:33',4,6,NULL,1),(33,'Dragon Ball Tập 4',19000,7,NULL,2022,'17.6 x 11.3 cm',200,NULL,1,'2022-11-15 15:03:35','2022-11-15 15:03:35',4,6,NULL,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'NXB Kim Đồng','2022-11-15 14:38:26','2022-11-15 14:38:26'),(2,'NXB Trẻ','2022-11-15 14:39:10','2022-11-15 14:39:10'),(3,'IPM Book','2022-11-15 14:39:43','2022-11-15 14:39:43');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','admin of the system','2022-11-10 16:14:26','2022-11-15 14:23:50'),(2,'user','user of the system','2022-11-15 14:23:21','2022-11-15 14:23:21');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ship_address`
--

DROP TABLE IF EXISTS `ship_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ship_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `homeAddress` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ship_address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ship_address`
--

LOCK TABLES `ship_address` WRITE;
/*!40000 ALTER TABLE `ship_address` DISABLE KEYS */;
INSERT INTO `ship_address` VALUES (1,'Hung Yen','Tien Lu','Dong Quang','12a','2022-11-22 02:10:03','2022-11-22 02:10:03',NULL);
/*!40000 ALTER TABLE `ship_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'quan','dinhquan','Quan','Dinh','Pham','Hung Yen','0832705889','2022-11-22 02:06:53','2022-11-22 02:06:53',NULL),(2,'sang','123456','Sang','Minh','Vu','Quang Ninh','123','2022-11-22 02:07:15','2022-11-22 02:07:15',NULL),(3,'nghia','123456','Nghia','Trong','Hoang','Nam Dinh','123','2022-11-22 02:07:37','2022-11-22 02:07:37',NULL),(4,'bang','123456','Bang','Vang','Nguyen','Ha Noi','123','2022-11-22 02:07:56','2022-11-22 02:07:56',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-23 17:33:31
