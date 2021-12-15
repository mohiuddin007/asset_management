-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2021 at 11:18 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assetmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ActivityId` int(11) NOT NULL,
  `AssetId` int(11) NOT NULL,
  `EmployeeId` int(11) NOT NULL,
  `ActivityType` int(11) NOT NULL,
  `AssetName` varchar(255) NOT NULL,
  `EmployeeName` varchar(255) NOT NULL,
  `ActivityTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`ActivityId`, `AssetId`, `EmployeeId`, `ActivityType`, `AssetName`, `EmployeeName`, `ActivityTime`) VALUES
(1, 6, 4, 0, 'Asus Laptop', 'anas', '2021-10-21 08:59:50'),
(2, 7, 5, 1, 'Mouse', 'maruf', '2021-10-21 09:00:33'),
(32, 3, 4, 1, 'A4 tech OP-6200', 'anas', '2021-10-21 11:06:57'),
(33, 3, 4, 2, 'A4 tech OP-6200', 'anas', '2021-10-21 11:11:28');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `AssetId` int(11) NOT NULL,
  `AssetName` varchar(50) NOT NULL,
  `EmployeeId` int(50) DEFAULT NULL,
  `CategoryId` int(11) NOT NULL,
  `UsageStart` datetime DEFAULT NULL,
  `UsageEnd` datetime DEFAULT NULL,
  `IsOkay` tinyint(1) NOT NULL DEFAULT 1,
  `Comments` varchar(50) NOT NULL,
  `AssetDetails` varchar(50) NOT NULL,
  `IsAvailable` tinyint(1) NOT NULL DEFAULT 1,
  `IsChecked` tinyint(1) NOT NULL DEFAULT 1,
  `UsedQuantity` int(11) NOT NULL DEFAULT 0,
  `Request` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`AssetId`, `AssetName`, `EmployeeId`, `CategoryId`, `UsageStart`, `UsageEnd`, `IsOkay`, `Comments`, `AssetDetails`, `IsAvailable`, `IsChecked`, `UsedQuantity`, `Request`) VALUES
(3, 'A4 tech OP-6200', 4, 5, NULL, '2021-10-21 11:11:28', 1, '', 'Usb Mouse', 1, 1, 0, 0),
(6, 'Asus VivoBook 15', 4, 1, '2021-10-11 05:27:11', '2021-10-19 12:30:16', 1, '', 'OS-windows Serial Number: M8N0CV12M48433G					', 0, 1, 0, 0),
(7, 'logitec g4', 63, 5, NULL, NULL, 1, '', 'Usb Mouse', 1, 1, 0, 0),
(8, 'Sepnil Disinfectant Spray', 4, 9, NULL, NULL, 1, '', 'Sepnil Disinfectant Spray', 1, 1, 0, 0),
(9, 'A4Tech Bloody', 63, 6, NULL, NULL, 1, '', 'mechanical keyboard', 1, 1, 0, 0),
(10, 'PBS notebook', 63, 8, NULL, NULL, 1, '', 'notebook', 1, 1, 2, 0),
(11, 'laptop', NULL, 4, NULL, NULL, 1, 'my laptop', 'asus vivobook', 1, 1, 0, 0),
(12, 'asus vivo', 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, '', 'laptop gaming serial number: 1111', 1, 1, 0, 0),
(29, 'Bashundhara Tissue', 6, 3, '2021-10-22 04:59:07', '2021-10-22 11:22:22', 1, '', 'box', 1, 1, 2, 0),
(30, 'A5 tech OP-6200', 6, 5, '2021-10-22 05:04:58', NULL, 1, '', 'mice', 1, 1, 0, 0),
(31, 'mouse logitec', 6, 5, '2021-10-22 05:05:35', NULL, 1, '', 'Usb Mouse', 1, 1, 0, 0),
(32, 'PBS notebook', 6, 3, '2021-10-22 05:06:24', NULL, 1, '', 'PBS notebook for note taking', 1, 1, 0, 0),
(33, 'PBS notebook', 6, 8, '2021-10-22 05:07:03', NULL, 1, 'smell good', 'quantity :120pcs', 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `assets_category`
--

CREATE TABLE `assets_category` (
  `CategoryId` int(11) NOT NULL,
  `CategoryName` varchar(50) NOT NULL,
  `AssetQuantity` int(11) NOT NULL,
  `WarningQuantity` int(11) NOT NULL,
  `IsIndividual` tinyint(1) NOT NULL DEFAULT 1,
  `IsRepairable` tinyint(1) NOT NULL DEFAULT 1,
  `IsIdentifiable` tinyint(1) NOT NULL DEFAULT 1,
  `AssetNeedApproval` tinyint(1) NOT NULL DEFAULT 0,
  `AssetUsed` int(11) NOT NULL,
  `WarningFlag` tinyint(1) NOT NULL DEFAULT 0,
  `AssetExpired` int(11) NOT NULL DEFAULT 0,
  `IsRequested` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assets_category`
--

INSERT INTO `assets_category` (`CategoryId`, `CategoryName`, `AssetQuantity`, `WarningQuantity`, `IsIndividual`, `IsRepairable`, `IsIdentifiable`, `AssetNeedApproval`, `AssetUsed`, `WarningFlag`, `AssetExpired`, `IsRequested`) VALUES
(1, 'laptop', 16, 2, 1, 1, 1, 1, 6, 0, 3, 0),
(3, 'Tissue Box', 35, 10, 1, 0, 0, 0, 8, 0, 2, 0),
(4, 'Tea Bag', 6, 2, 0, 0, 0, 0, 0, 0, 1, 0),
(5, 'Mouse', 23, 5, 1, 1, 1, 1, 20, 0, 7, 0),
(6, 'Key Board', 30, 5, 1, 1, 1, 1, 0, 0, 0, 0),
(7, 'Micro Oven', 1, 0, 0, 1, 1, 1, 1, 0, 0, 0),
(8, 'Note Book', 28, 5, 1, 0, 0, 0, 10, 0, 2, 0),
(9, 'Air Freshener', 5, 2, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `EmployeeId` int(11) NOT NULL,
  `EmployeeName` varchar(50) DEFAULT NULL,
  `EmployeePassword` varchar(50) NOT NULL,
  `EmployeeEmail` varchar(50) NOT NULL,
  `EmployeeFullName` varchar(50) NOT NULL,
  `EmployeeBatchId` varchar(20) NOT NULL,
  `EmployeeIsAdmin` int(11) NOT NULL DEFAULT 0,
  `EmployeeNumber` varchar(11) DEFAULT NULL,
  `EmployeeAddress` varchar(50) NOT NULL,
  `checkInFlag` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`EmployeeId`, `EmployeeName`, `EmployeePassword`, `EmployeeEmail`, `EmployeeFullName`, `EmployeeBatchId`, `EmployeeIsAdmin`, `EmployeeNumber`, `EmployeeAddress`, `checkInFlag`) VALUES
(0, 'allUser', '123456', '', '', '', 0, '0', '', 0),
(1, 'siam', '1234', 'siam@uxd.co.jp', 'Fahim Siam', '202109', 0, '1872627888', 'OLD DHAKA', 0),
(2, 'super', 'super', 'superadmin@uxd.co.jp', 'super admin', '20190101', 2, '123456789', '123cadsad', 0),
(3, 'admin', 'admin', 'admin@uxd.co.jp', 'admin san', '20190101', 1, '123454657', 'sda a233', 0),
(4, 'anas', '123456', 'anas@uxd.co.jp', 'Anas Sikder', '202109', 0, '1980851587', '2/16 mirpur,dhaka-1216', 0),
(5, 'maruf', '123456', 'maruf@uxd.co.jp', 'Md. Maruf Hasan Shakil', '202109', 0, '1568483616', 'baridhara', 0),
(6, 'arif', '56789', 'arif@uxd.co.jp', 'Arif Ur Rahman', '202109', 0, '1680728065', 'Badda', 0),
(63, 'nafis', '12345', 'nafis@uxd.co.jp', 'Nafis', '202101', 0, '01703260888', 'badda', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`ActivityId`),
  ADD KEY `AssetId` (`AssetId`),
  ADD KEY `EmployeeId` (`EmployeeId`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`AssetId`),
  ADD KEY `EmployeeId` (`EmployeeId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Indexes for table `assets_category`
--
ALTER TABLE `assets_category`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`EmployeeId`),
  ADD UNIQUE KEY `EmployeeEmail` (`EmployeeEmail`),
  ADD UNIQUE KEY `EmployeeNumber` (`EmployeeNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `ActivityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `AssetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `assets_category`
--
ALTER TABLE `assets_category`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`AssetId`) REFERENCES `assets` (`AssetId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`EmployeeId`) REFERENCES `users` (`EmployeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `EmployeeId` FOREIGN KEY (`EmployeeId`) REFERENCES `users` (`EmployeeId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `assets_category` (`CategoryId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
