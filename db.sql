-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Eiichiro Oda','2022-11-15 15:37:00','2022-11-15 15:37:00'),(2,'Masashi Kishimoto','2022-11-15 15:37:43','2022-11-15 15:37:43'),(3,'Tite Kubo','2022-11-15 15:38:10','2022-11-15 15:38:10'),(4,'Akira Toriyama','2022-11-15 15:38:29','2022-11-15 15:38:29'),(5,'Nguyễn Nhật Ánh','2022-11-27 15:21:57','2022-11-27 15:21:57'),(6,'J K Rowling','2022-11-28 03:34:04','2022-11-28 03:34:04'),(7,'Michael Lewis','2022-11-28 03:49:40','2022-11-28 03:49:40'),(8,'Kinugasa Syougo, Tomoseshunsaku','2022-11-28 03:56:52','2022-11-28 03:56:52'),(9,'Andreas Moritz','2022-11-30 03:26:09','2022-11-30 03:26:09'),(10,'Osamu Tezuka','2022-11-30 03:32:51','2022-11-30 03:32:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,' Văn học',NULL,'2022-11-27 15:09:21','2022-11-27 15:09:21'),(2,'Manga-Comic',NULL,'2022-11-27 15:09:41','2022-11-27 15:09:41'),(4,'Light Novel',NULL,'2022-11-27 15:10:38','2022-11-27 15:10:38'),(5,'Ngôn tình',NULL,'2022-11-27 15:11:07','2022-11-27 15:11:07'),(6,'Truyện ngắn',NULL,'2022-11-27 15:11:26','2022-11-27 15:11:26'),(7,'Tâm lý',NULL,'2022-11-27 15:11:36','2022-11-27 15:11:36'),(8,'Tiểu thuyết',NULL,'2022-11-27 15:11:49','2022-11-27 15:11:49'),(9,'Kinh tế',NULL,'2022-11-27 15:11:59','2022-11-27 15:11:59'),(10,'Hành động',NULL,'2022-11-27 15:12:06','2022-11-27 15:12:06'),(11,'Viễn tưởng',NULL,'2022-11-27 15:12:11','2022-11-27 15:12:11'),(12,'Nghệ thuật - Giải trí',NULL,'2022-11-27 15:12:31','2022-11-27 15:12:31'),(13,'Hành động',NULL,'2022-11-28 03:25:16','2022-11-28 03:25:16'),(14,'Phiêu lưu',NULL,'2022-11-28 03:25:24','2022-11-28 03:25:24');
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
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `productId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`,`categoryId`),
  UNIQUE KEY `product_category_productId_categoryId_unique` (`productId`,`categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,2,'2022-11-28 03:23:28','2022-11-28 03:23:28'),(1,13,'2022-11-28 03:26:14','2022-11-28 03:26:14'),(1,14,'2022-11-28 03:26:17','2022-11-28 03:26:17'),(2,2,'2022-11-28 03:26:30','2022-11-28 03:26:30'),(2,13,'2022-11-28 03:26:36','2022-11-28 03:26:36'),(2,14,'2022-11-28 03:26:39','2022-11-28 03:26:39'),(3,2,'2022-11-28 03:27:07','2022-11-28 03:27:07'),(3,13,'2022-11-28 03:27:28','2022-11-28 03:27:28'),(3,14,'2022-11-28 03:27:30','2022-11-28 03:27:30'),(4,2,'2022-11-28 03:27:35','2022-11-28 03:27:35'),(4,13,'2022-11-28 03:27:38','2022-11-28 03:27:38'),(4,14,'2022-11-28 03:27:39','2022-11-28 03:27:39'),(5,2,'2022-11-28 03:27:49','2022-11-28 03:27:49'),(5,13,'2022-11-28 03:27:46','2022-11-28 03:27:46'),(5,14,'2022-11-28 03:27:44','2022-11-28 03:27:44'),(6,2,'2022-11-28 03:27:52','2022-11-28 03:27:52'),(6,13,'2022-11-28 03:27:56','2022-11-28 03:27:56'),(6,14,'2022-11-28 03:27:58','2022-11-28 03:27:58'),(7,2,'2022-11-28 03:28:05','2022-11-28 03:28:05'),(7,13,'2022-11-28 03:28:03','2022-11-28 03:28:03'),(7,14,'2022-11-28 03:28:01','2022-11-28 03:28:01'),(8,2,'2022-11-28 03:28:09','2022-11-28 03:28:09'),(8,13,'2022-11-28 03:28:10','2022-11-28 03:28:10'),(8,14,'2022-11-28 03:28:14','2022-11-28 03:28:14'),(9,2,'2022-11-28 03:28:22','2022-11-28 03:28:22'),(9,13,'2022-11-28 03:28:19','2022-11-28 03:28:19'),(9,14,'2022-11-28 03:28:17','2022-11-28 03:28:17'),(10,2,'2022-11-28 03:28:25','2022-11-28 03:28:25'),(10,13,'2022-11-28 03:28:31','2022-11-28 03:28:31'),(10,14,'2022-11-28 03:28:33','2022-11-28 03:28:33'),(11,2,'2022-11-28 03:28:41','2022-11-28 03:28:41'),(11,13,'2022-11-28 03:28:38','2022-11-28 03:28:38'),(11,14,'2022-11-28 03:28:35','2022-11-28 03:28:35'),(12,2,'2022-11-28 03:28:55','2022-11-28 03:28:55'),(12,13,'2022-11-28 03:28:59','2022-11-28 03:28:59'),(12,14,'2022-11-28 03:29:02','2022-11-28 03:29:02'),(13,2,'2022-11-28 03:29:10','2022-11-28 03:29:10'),(13,13,'2022-11-28 03:29:08','2022-11-28 03:29:08'),(13,14,'2022-11-28 03:29:04','2022-11-28 03:29:04'),(14,2,'2022-11-28 03:29:16','2022-11-28 03:29:16'),(15,2,'2022-11-28 03:29:19','2022-11-28 03:29:19'),(16,2,'2022-11-28 03:29:21','2022-11-28 03:29:21'),(17,2,'2022-11-28 03:29:24','2022-11-28 03:29:24'),(18,2,'2022-11-28 03:29:27','2022-11-28 03:29:27'),(19,2,'2022-11-28 03:29:30','2022-11-28 03:29:30'),(20,2,'2022-11-28 03:29:32','2022-11-28 03:29:32'),(21,2,'2022-11-28 03:29:36','2022-11-28 03:29:36'),(22,2,'2022-11-28 03:29:39','2022-11-28 03:29:39'),(23,2,'2022-11-28 03:29:41','2022-11-28 03:29:41'),(24,2,'2022-11-28 03:29:44','2022-11-28 03:29:44'),(25,2,'2022-11-28 03:29:46','2022-11-28 03:29:46'),(26,2,'2022-11-28 03:29:58','2022-11-28 03:29:58'),(27,2,'2022-11-28 03:30:01','2022-11-28 03:30:01'),(28,2,'2022-11-28 03:30:04','2022-11-28 03:30:04'),(29,2,'2022-11-28 03:30:07','2022-11-28 03:30:07'),(30,2,'2022-11-28 03:30:11','2022-11-28 03:30:11'),(31,2,'2022-11-28 03:30:14','2022-11-28 03:30:14'),(32,2,'2022-11-28 03:30:16','2022-11-28 03:30:16'),(33,2,'2022-11-28 03:30:21','2022-11-28 03:30:21'),(34,1,'2022-11-28 03:31:04','2022-11-28 03:31:04'),(35,1,'2022-11-28 03:45:16','2022-11-28 03:45:16'),(36,1,'2022-11-28 03:45:18','2022-11-28 03:45:18'),(37,1,'2022-11-28 03:45:20','2022-11-28 03:45:20'),(38,1,'2022-11-28 03:45:23','2022-11-28 03:45:23'),(39,1,'2022-11-28 03:45:26','2022-11-28 03:45:26'),(40,9,'2022-11-28 04:06:12','2022-11-28 04:06:12'),(41,4,'2022-11-28 04:09:16','2022-11-28 04:09:16'),(42,4,'2022-11-28 04:09:20','2022-11-28 04:09:20'),(43,7,'2022-11-30 10:29:53','2022-11-30 10:30:00');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
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
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `providerId` int DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_set`
--

LOCK TABLES `product_set` WRITE;
/*!40000 ALTER TABLE `product_set` DISABLE KEYS */;
INSERT INTO `product_set` VALUES (5,'Naruto',NULL,20,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-1---tb-2022.jpg','2022-11-15 15:07:10','2022-11-15 15:32:45',1,2),(6,'Dragon Ball',NULL,4,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_74966.jpg','2022-11-15 15:07:20','2022-11-15 15:32:37',1,4),(7,'One Piece',NULL,5,'https://product.hstatic.net/200000343865/product/1_b5eb7fcb65c54c13a2e3d5f982bbac5b.jpg','2022-11-15 15:07:27','2022-11-15 15:30:52',1,1),(8,'Bleach',NULL,4,'https://cdn0.fahasa.com/media/catalog/product/u/n/untitled-1_46_2.jpg','2022-11-15 15:07:33','2022-11-15 15:13:50',1,3),(9,'Harry Potter',NULL,7,'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179672.jpg','2022-11-28 03:39:30','2022-11-28 03:39:30',2,6),(10,'Chào Mừng Đến Lớp Học Đề Cao Thực Lực',NULL,3,'https://cdn0.fahasa.com/media/catalog/product/z/3/z3853755123856_ef10ce3e573421f423e49a9ee9b6b499_1.jpg','2022-11-28 04:01:35','2022-11-28 04:01:35',3,8);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Naruto Tập 1',25000,1,NULL,2018,'17.6 x 11.3 cm',202,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-1---tb-2022.jpg',1,'2022-11-15 14:55:49','2022-11-15 14:55:49',2,5,1,5),(2,'Naruto Tập 2',25000,10,NULL,2019,'17.6 x 11.3 cm',201,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-2.jpg',1,'2022-11-15 14:56:17','2022-11-22 14:49:00',2,5,1,1),(3,'Naruto Tập 3',25000,7,NULL,2019,'17.6 x 11.3 cm',333,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-3.jpg',1,'2022-11-15 14:56:41','2022-11-22 14:51:28',2,5,1,1),(4,'Naruto Tập 4',25000,0,NULL,2019,'17.6 x 11.3 cm',123,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-4.jpg',1,'2022-11-15 14:56:58','2022-11-15 14:56:58',2,5,1,1),(5,'Naruto Tập 5',25000,0,NULL,2019,'17.6 x 11.3 cm',213,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-5.jpg',1,'2022-11-15 14:59:40','2022-11-15 14:59:40',2,5,1,1),(6,'Naruto Tập 6',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-6.jpg',1,'2022-11-15 15:00:24','2022-11-15 15:00:24',2,5,1,1),(7,'Naruto Tập 7',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-7.jpg',1,'2022-11-15 15:00:27','2022-11-15 15:00:27',2,5,1,1),(8,'Naruto Tập 8',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-8.jpg',1,'2022-11-15 15:00:30','2022-11-15 15:00:30',2,5,1,1),(9,'Naruto Tập 9',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/a/naruto---tap-9.jpg',1,'2022-11-15 15:00:33','2022-11-15 15:00:33',2,5,1,1),(10,'Naruto Tập 10',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866155.jpg',1,'2022-11-15 15:00:36','2022-11-15 15:00:36',2,5,1,6),(11,'Naruto Tập 11',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866162.jpg',1,'2022-11-15 15:00:40','2022-11-15 15:00:40',2,5,1,1),(12,'Naruto Tập 12',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866179.jpg',1,'2022-11-15 15:00:42','2022-11-15 15:00:42',2,5,1,1),(13,'Naruto Tập 13',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866186.jpg',1,'2022-11-15 15:00:45','2022-11-15 15:00:45',2,5,1,1),(14,'Naruto Tập 14',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866193.jpg',1,'2022-11-15 15:00:52','2022-11-15 15:00:52',2,5,1,1),(15,'Naruto Tập 15',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866209.jpg',1,'2022-11-15 15:00:54','2022-11-15 15:00:54',2,5,1,1),(16,'Naruto Tập 16',25000,2,NULL,2019,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244866216.jpg',1,'2022-11-15 15:00:58','2022-11-15 15:00:58',2,5,1,1),(17,'Naruto Tập 17',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/17_c54469b4e13643a89c3b9aa57b35e9b4.jpg',1,'2022-11-15 15:01:13','2022-11-15 15:01:13',2,5,1,1),(18,'Naruto Tập 18',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/18_f8362e1662e646aea920250e545b6999.jpg',1,'2022-11-15 15:01:15','2022-11-15 15:01:15',2,5,1,10),(19,'Naruto Tập 19',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/19_37_647b99bd6e84496ebed8a7fe7c08bb33.jpg',1,'2022-11-15 15:01:19','2022-11-15 15:01:19',2,5,1,1),(20,'Naruto Tập 20',25000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/20_35_ea1ed69322e442fb8a4f957f5c07a177.jpg',1,'2022-11-15 15:01:23','2022-11-15 15:01:23',2,5,1,1),(21,'One Piece Tập 1',20000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/1_b5eb7fcb65c54c13a2e3d5f982bbac5b.jpg',1,'2022-11-15 15:02:14','2022-11-15 15:02:14',1,7,1,1),(22,'One Piece Tập 2',20000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/2_5774bb5eaad14c06a06988983ecca779.jpg',1,'2022-11-15 15:02:17','2022-11-15 15:02:17',1,7,1,1),(23,'One Piece Tập 3',20000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/3_b712eab3ff0c4259b860d92989fc29c4.jpg',1,'2022-11-15 15:02:19','2022-11-15 15:02:19',1,7,1,1),(24,'One Piece Tập 4',20000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/4_4cbbfa7860994cadab23c1895be4ec44.jpg',1,'2022-11-15 15:02:23','2022-11-15 15:02:23',1,7,1,1),(25,'One Piece Tập 5',20000,2,NULL,2020,'17.6 x 11.3 cm',200,'https://product.hstatic.net/200000343865/product/5_0c075ea48e7c4eb59f4b352575756cd3.jpg',1,'2022-11-15 15:02:25','2022-11-15 15:02:25',1,7,1,123),(26,'Bleach Tập 1',22000,2,NULL,2021,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/u/n/untitled-1_46_2.jpg',1,'2022-11-15 15:02:42','2022-11-15 15:02:42',3,8,1,1),(27,'Bleach Tập 2',22000,2,NULL,2021,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/b/l/bleach---tap-2.jpg',1,'2022-11-15 15:02:46','2022-11-15 15:02:46',3,8,1,1),(28,'Bleach Tập 3',22000,2,NULL,2021,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244826265.jpg',1,'2022-11-15 15:02:48','2022-11-15 15:02:48',3,8,1,1),(29,'Bleach Tập 4',22000,2,NULL,2021,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244826272.jpg',1,'2022-11-15 15:02:51','2022-11-15 15:02:51',3,8,1,1),(30,'Dragon Ball Tập 1',19000,7,NULL,2022,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_74966.jpg',1,'2022-11-15 15:03:28','2022-11-15 15:03:28',4,6,1,1),(31,'Dragon Ball Tập 2',19000,7,NULL,2022,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_74967.jpg',1,'2022-11-15 15:03:30','2022-11-15 15:03:30',4,6,1,1),(32,'Dragon Ball Tập 3',19000,7,NULL,2022,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_74968.jpg',1,'2022-11-15 15:03:33','2022-11-15 15:03:33',4,6,1,1),(33,'Dragon Ball Tập 4',19000,7,NULL,2022,'17.6 x 11.3 cm',200,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_74969.jpg',1,'2022-11-15 15:03:35','2022-11-15 15:03:35',4,6,1,1),(34,'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',85000,4,NULL,2022,'30 x 60cm',400,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_2199.jpg',1,'2022-11-27 15:19:04','2022-11-27 15:19:04',5,NULL,2,0),(35,'Harry Potter Và Hội Phượng Hoàng - Tập 05',250000,6,NULL,2022,'26 x 22 cm',500,'https://cdn0.fahasa.com/media/catalog/product/h/a/harry-potter-va-hoi-phuong-hoang---ban-mau.jpg',1,'2022-11-28 03:35:37','2022-11-28 03:35:37',6,9,2,2),(36,'Harry Potter Và Bảo Bối Tử Thần - Tập 7',225000,6,NULL,2022,'26 x 22 cm',625,'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179641.jpg',1,'2022-11-28 03:38:27','2022-11-28 03:38:27',6,9,2,2),(37,'Harry Potter Và Tên Tù Nhân Ngục Azkaban - Tập 3',185000,6,NULL,2022,'26 x 22 cm',625,'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179658.jpg',1,'2022-11-28 03:42:05','2022-11-28 03:42:05',6,9,2,0),(38,'Harry Potter Và Hòn Đá Phù Thuỷ - Tập 1',185000,6,NULL,2022,'26 x 22 cm',625,'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179672.jpg',1,'2022-11-28 03:42:42','2022-11-28 03:42:42',6,9,2,0),(39,'Harry Potter Và Phòng Chứa Bí Mật - Tập 2',185000,6,NULL,2022,'26 x 22 cm',625,'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974145615.jpg',1,'2022-11-28 03:44:07','2022-11-28 03:44:07',6,9,2,0),(40,'Trò Bịp Trên Phố Wall ',169000,6,NULL,2022,'20.5 x 13 cm',480,'https://cdn0.fahasa.com/media/catalog/product/i/m/image_244718_1_4844.jpg',1,'2022-11-28 03:48:49','2022-11-28 03:48:49',7,NULL,4,0),(41,'Chào Mừng Đến Lớp Học Đề Cao Thực Lực - Tập 3',96000,4,NULL,2022,'18 x 13 cm',360,'https://cdn0.fahasa.com/media/catalog/product/c/h/chao-mung-den-lop-hoc-3---bia-1_1.jpg',1,'2022-11-28 03:58:00','2022-11-28 03:58:00',8,10,3,0),(42,'Chào Mừng Đến Lớp Học Đề Cao Thực Lực - Tập 4',96000,4,NULL,2022,'18 x 13 cm',360,'https://cdn0.fahasa.com/media/catalog/product/z/3/z3853755123856_ef10ce3e573421f423e49a9ee9b6b499_1.jpg',1,'2022-11-28 03:59:56','2022-11-28 03:59:56',8,10,3,0),(43,'Ung Thư Không Phải Là Bệnh Mà Là Cơ Chế Chữa Lành',189000,3,NULL,2014,'24 x 15.5 cm',463,'https://cdn0.fahasa.com/media/catalog/product/8/9/8935280912731.jpg',1,'2022-11-30 03:28:40','2022-11-30 03:28:40',9,NULL,5,0),(44,'Black Jack - Tập 15',30000,3,NULL,2014,'24 x 15.5 cm',200,'https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_20342022_113431.jpg',1,'2022-11-30 03:33:02','2022-11-30 03:33:02',10,NULL,2,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'NXB Kim Đồng','2022-11-15 14:38:26','2022-11-15 14:38:26'),(2,'NXB Trẻ','2022-11-15 14:39:10','2022-11-15 14:39:10'),(3,'IPM Book','2022-11-15 14:39:43','2022-11-15 14:39:43'),(4,'Alpha Books','2022-11-28 03:52:42','2022-11-28 03:52:42'),(5,'Thái Hà Book','2022-11-30 03:28:17','2022-11-30 03:28:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ship_address`
--

LOCK TABLES `ship_address` WRITE;
/*!40000 ALTER TABLE `ship_address` DISABLE KEYS */;
INSERT INTO `ship_address` VALUES (1,'Hung Yen','Tien Lu','Dong Quang','12a','2022-11-22 02:10:03','2022-11-22 02:10:03',1),(2,'Hung Yen','TP. Hung Yen','Chu Van An','1','2022-11-22 02:10:03','2022-11-29 10:16:42',1),(3,'Quang Ninh','Abc','Bds','123','2022-11-22 02:10:03','2022-11-22 02:10:03',2),(4,'Nam Dinh','abc','123','321','2022-11-22 02:10:03','2022-11-22 02:10:03',3),(5,'Ha Noi','xyz','xyz','123232','2022-11-22 02:10:03','2022-11-22 02:10:03',4);
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

-- Dump completed on 2022-11-30 10:36:26
