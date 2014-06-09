-- MySQL dump 10.13  Distrib 5.5.37, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: wishSocial
-- ------------------------------------------------------
-- Server version	5.5.37-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `pwd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `img_src` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'初出茅庐','/images/badges/registed.png'),(2,'小试牛刀','/images/badges/first_edit.png');
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `development_processes`
--

DROP TABLE IF EXISTS `development_processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `development_processes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `last_edit_time` datetime NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content_html` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `development_processes`
--

LOCK TABLES `development_processes` WRITE;
/*!40000 ALTER TABLE `development_processes` DISABLE KEYS */;
INSERT INTO `development_processes` VALUES (1,'* I can add a development development record.\n* A record contains a title and a content.','2014-02-04 00:07:52','2014-02-04 00:07:52','Finish the function that add a development process record.','<ul>\n<li>I can add a development development record.</li>\n<li>A record contains a title and a content.</li>\n</ul>\n'),(2,'* Click the title of development process in the list of the developemtn processes and edit the specific development process record.\n* click the \'save\' button to update the new development process.','2014-02-04 20:56:44','2014-02-04 21:47:48','Finish the edit the development process function.','<ul>\n<li>Click the title of development process in the list of the developemtn processes and edit the specific development process record.</li>\n<li>click the &#39;save&#39; button to update the new development process.</li>\n</ul>\n'),(3,'* User can edit new tag and press Enter to add new tag.\n* The tag wish same text will not be added twice.\n* Use a scope variable to manage the Tags.','2014-02-08 01:37:38','2014-02-08 01:37:38','Use and enhance one tagsinput plugin to add wish function','<ul>\n<li>User can edit new tag and press Enter to add new tag.</li>\n<li>The tag wish same text will not be added twice.</li>\n<li>Use a scope variable to manage the Tags.</li>\n</ul>\n'),(4,'##Finishd','2014-02-24 20:45:56','2014-02-24 20:45:56','asdfasdf','<h2>Finishd</h2>\n'),(6,'As saying above.','2014-05-04 23:40:52','2014-05-04 23:40:52','Finish the backend data feed to the first page of wishes','<p>As saying above.</p>\n');
/*!40000 ALTER TABLE `development_processes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_log`
--

DROP TABLE IF EXISTS `general_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_log` (
  `event_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_host` mediumtext NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `command_type` varchar(64) NOT NULL,
  `argument` mediumtext NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8 COMMENT='General log';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_log`
--

LOCK TABLES `general_log` WRITE;
/*!40000 ALTER TABLE `general_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `general_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `r_users_badges`
--

DROP TABLE IF EXISTS `r_users_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `r_users_badges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `b_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `r_users_badges`
--

LOCK TABLES `r_users_badges` WRITE;
/*!40000 ALTER TABLE `r_users_badges` DISABLE KEYS */;
INSERT INTO `r_users_badges` VALUES (1,1,1),(2,9,2),(3,10,3),(4,11,4),(5,12,5),(6,13,6),(7,14,7),(8,15,1),(9,15,2),(10,16,1),(11,19,1),(12,19,2),(13,20,1),(14,21,1),(15,19,2),(16,22,1),(17,23,1),(18,23,2),(19,24,1);
/*!40000 ALTER TABLE `r_users_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `r_wishes_tags`
--

DROP TABLE IF EXISTS `r_wishes_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `r_wishes_tags` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `w_id` int(10) NOT NULL,
  `t_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `r_wishes_tags`
--

LOCK TABLES `r_wishes_tags` WRITE;
/*!40000 ALTER TABLE `r_wishes_tags` DISABLE KEYS */;
INSERT INTO `r_wishes_tags` VALUES (1,0,5),(2,0,14),(3,0,5),(4,0,15),(5,0,5),(6,0,16),(7,0,5),(8,0,17),(9,0,5),(10,0,17),(11,0,2),(12,0,5),(13,0,17),(14,0,2),(15,0,5),(16,0,17),(17,68,2),(18,68,5),(19,68,17),(20,69,2),(21,69,5),(22,69,17),(23,69,18),(24,70,2),(25,70,5),(26,70,17),(27,70,19),(28,71,2),(29,71,5),(30,71,17),(31,71,20),(32,72,2),(33,72,5),(34,72,17),(35,72,21),(36,73,2),(37,73,5),(38,73,17),(39,73,22),(40,74,2),(41,74,5),(42,74,17),(43,74,23),(44,75,5),(45,75,5),(46,75,5),(47,75,5),(48,76,2),(49,76,5),(50,76,17),(51,76,24),(52,77,2),(53,77,5),(54,77,17),(55,77,25),(56,78,2),(57,78,5),(58,78,18),(59,78,26),(60,90,5),(61,90,5),(62,92,5),(63,92,5),(64,93,5),(65,93,5),(66,94,5),(67,94,27),(68,99,28),(69,99,5),(70,99,2),(71,99,29),(72,99,30),(73,99,31),(74,99,28),(75,100,32),(76,100,33),(77,100,34),(78,101,32),(79,101,33),(80,101,34),(81,102,32),(82,102,33),(83,102,34),(84,103,32),(85,103,33),(86,103,34),(87,104,32),(88,104,33),(89,104,34),(90,105,32),(91,106,32),(92,107,27),(93,108,27),(94,109,27),(95,110,27),(96,111,27),(97,112,27),(98,117,32),(99,118,35),(100,118,36),(101,118,37),(102,119,5),(103,119,28),(104,119,30),(105,120,5),(106,120,28),(107,120,38),(108,121,39),(109,122,40),(110,123,40),(111,124,40),(112,124,29),(113,125,40),(114,126,27),(115,127,27),(116,128,27),(117,130,27),(118,131,27),(119,132,27),(120,133,27),(121,134,27),(122,135,27),(123,136,40),(124,137,40),(125,138,28),(126,139,5),(127,140,41),(128,141,28),(129,142,38),(130,143,38),(131,143,28),(132,143,31),(133,144,42),(134,145,40),(135,146,28),(136,147,5),(137,148,28),(138,0,38),(139,0,28),(140,0,31),(141,0,40),(142,0,38),(143,0,28),(144,0,31),(145,143,38),(146,143,28),(147,143,31),(148,149,40),(149,149,2),(150,149,40),(151,149,2),(152,149,40),(153,149,2),(154,149,28),(155,150,2),(156,150,29),(157,150,29),(158,150,41),(159,151,43),(160,151,5),(161,151,43),(162,151,5),(163,151,38);
/*!40000 ALTER TABLE `r_wishes_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `r_wishes_users`
--

DROP TABLE IF EXISTS `r_wishes_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `r_wishes_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `w_id` int(10) DEFAULT NULL,
  `u_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `r_wishes_users`
--

LOCK TABLES `r_wishes_users` WRITE;
/*!40000 ALTER TABLE `r_wishes_users` DISABLE KEYS */;
INSERT INTO `r_wishes_users` VALUES (1,1,1);
/*!40000 ALTER TABLE `r_wishes_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slow_log`
--

DROP TABLE IF EXISTS `slow_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slow_log` (
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_host` mediumtext NOT NULL,
  `query_time` time NOT NULL,
  `lock_time` time NOT NULL,
  `rows_sent` int(11) NOT NULL,
  `rows_examined` int(11) NOT NULL,
  `db` varchar(512) NOT NULL,
  `last_insert_id` int(11) NOT NULL,
  `insert_id` int(11) NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `sql_text` mediumtext NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8 COMMENT='Slow log';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slow_log`
--

LOCK TABLES `slow_log` WRITE;
/*!40000 ALTER TABLE `slow_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `slow_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (2,'爱情'),(3,'初恋'),(4,'恋爱'),(5,'asdf'),(27,'a'),(28,'asdfasdf'),(29,'爱情故事'),(30,'asdf，asdf'),(31,'阿斯，ASDF'),(32,'姑娘'),(33,'搭讪'),(34,'美女'),(35,'女生'),(36,'圣诞节'),(37,'租赁'),(38,'asdfasdfasdf'),(39,'你会后悔的'),(40,'阿斯顿非'),(41,'sadf'),(42,'这是一个非常完美的愿望'),(43,'test');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `pwd` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT '/imgs/avatar.png' COMMENT '用户头像位置',
  `home_href` varchar(200) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `introduce` varchar(45) DEFAULT NULL,
  `img_src_128` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'julienbrks@gmail.com','test','123','/images/avatar/user-64.png','/user/123',NULL,'阿斯顿发射的非asdfasdfasdfsadfsadfsadf','/images/avatar/user-128.png'),(20,'julienbrks1@gmail.com','123','1233','/images/avatar/user-64.png','/user/1233',NULL,NULL,'/images/avatar/user-128.png'),(21,'dsaa@julienb.com','123','1234','/images/avatar/user-64.png','/user/1234',NULL,NULL,'/images/avatar/user-128.png'),(22,'test@gmail.com','test','test','/images/avatar/user-64.png','/user/test',NULL,NULL,'/images/avatar/user-128.png'),(23,'test@qq.com','123','test1','/images/avatar/user-64.png','/user/test1',NULL,NULL,'/images/avatar/user-128.png'),(24,'test1@qq.com','test1','test345','/images/avatar/user-64.png','/user/test345',NULL,NULL,'/images/avatar/user-128.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_users_wishes`
--

DROP TABLE IF EXISTS `vote_users_wishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote_users_wishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `w_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `vote` tinyint(4) DEFAULT NULL COMMENT 'null和0表示没投票，1表示投喜欢票，2表示投不喜欢票。',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_users_wishes`
--

LOCK TABLES `vote_users_wishes` WRITE;
/*!40000 ALTER TABLE `vote_users_wishes` DISABLE KEYS */;
INSERT INTO `vote_users_wishes` VALUES (1,1,1,1),(2,1,2,1),(3,1,2,NULL);
/*!40000 ALTER TABLE `vote_users_wishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishes`
--

DROP TABLE IF EXISTS `wishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `home_href` varchar(200) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT NULL,
  `vote_count` int(11) DEFAULT NULL,
  `comment_count` varchar(45) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `helper_id` int(10) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL COMMENT '愿望所处的状态。 ''published'', ''helping'', ''finished''',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishes`
--

LOCK TABLES `wishes` WRITE;
/*!40000 ALTER TABLE `wishes` DISABLE KEYS */;
INSERT INTO `wishes` VALUES (140,'','','2014-05-24 12:25:27','/wish/140',NULL,NULL,NULL,1,4,'finished'),(141,'asdf','asdfasdf','2014-05-24 15:53:28','/wish/141',NULL,NULL,NULL,3,3,'helping'),(142,'wo','asdfasdf','2014-05-24 15:53:52','/wish/142',NULL,NULL,NULL,3,NULL,NULL),(143,'我时一个愿望','Hello World!asdf','2014-05-26 16:40:45','/wish/143',NULL,NULL,NULL,1,NULL,'finished'),(144,'我也是一个愿望','非常美好的愿望','2014-05-26 20:37:53','/wish/144',NULL,NULL,NULL,11,NULL,NULL),(145,'阿斯顿非','阿斯顿非','2014-05-26 20:52:43','/wish/145',NULL,NULL,NULL,1,13,'finished'),(146,'asdf','asdfasdf','2014-05-26 21:07:04','/wish/146',NULL,NULL,NULL,15,NULL,NULL),(147,'asdf','asdf','2014-05-26 21:07:54','/wish/147',NULL,NULL,NULL,15,NULL,NULL),(148,'asdf','asdf','2014-05-26 21:09:46','/wish/148',NULL,NULL,NULL,15,NULL,NULL),(149,'这是一个愿望','！！！！','2014-05-27 15:28:54','/wish/149',NULL,NULL,NULL,19,21,'finished'),(150,'这是一个愿望','我时一个愿望的详情内容','2014-05-27 15:58:01','/wish/150',NULL,NULL,NULL,19,22,'finished'),(151,'test','test1','2014-05-28 09:20:55','/wish/151',NULL,NULL,NULL,23,22,'helping');
/*!40000 ALTER TABLE `wishes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-03  1:57:54
