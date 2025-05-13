-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 04:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `storedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `firstName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) DEFAULT NULL,
  `role` enum('super_admin','admin','content_manager','order_manager') NOT NULL DEFAULT 'admin',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `lastLogin` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password_hash`, `firstName`, `lastName`, `role`, `isActive`, `lastLogin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin1', 'admin@example.com', '$2b$10$aqow35c2ttHKOTtzZZCId./LoHAB/zUpB0GlV9mBJXatroRNWAsoK', 'Admin', 'User', 'super_admin', 1, NULL, '2025-04-23 15:35:26.723', '2025-04-23 15:35:26.723');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `addedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `parentId`, `imageUrl`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Electronics', 'Electronic gadgets and devices', NULL, NULL, 1, '2025-04-23 15:35:26.527', '2025-04-23 15:35:26.527'),
(2, 'Clothing', 'Men and women clothing', NULL, NULL, 1, '2025-04-23 15:35:26.543', '2025-04-23 15:35:26.543');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `orderDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `totalAmount` double NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
  `paymentStatus` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  `trackingNumber` varchar(191) DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `orderDate`, `totalAmount`, `status`, `paymentStatus`, `trackingNumber`, `notes`) VALUES
(1, 1, '2025-04-23 15:35:26.731', 629.98, 'processing', 'paid', NULL, NULL),
(2, 3, '2025-04-25 16:42:27.843', 629.98, 'pending', 'pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unitPrice` double NOT NULL,
  `discountAmount` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `orderId`, `productId`, `quantity`, `unitPrice`, `discountAmount`) VALUES
(1, 1, 1, 1, 599.99, 0),
(2, 1, 3, 1, 29.99, 0),
(3, 2, 3, 1, 29.99, 0),
(4, 2, 1, 1, 599.99, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `paymentMethod` varchar(191) NOT NULL,
  `transactionId` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'INR',
  `status` enum('pending','paid','failed','refunded') NOT NULL,
  `paymentDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `razorpayOrderId` varchar(191) DEFAULT NULL,
  `razorpayPaymentId` varchar(191) DEFAULT NULL,
  `razorpaySignature` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `orderId`, `paymentMethod`, `transactionId`, `amount`, `currency`, `status`, `paymentDate`, `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`) VALUES
(1, 1, 'credit_card', 'txn_123456789', 629.98, 'INR', 'paid', '2025-04-23 15:35:26.731', 'order_123456789', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `price` double NOT NULL,
  `discountedPrice` double DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `stockQuantity` int(11) NOT NULL DEFAULT 0,
  `sku` varchar(191) NOT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `additionalImages` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`additionalImages`)),
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `discountedPrice`, `categoryId`, `stockQuantity`, `sku`, `imageUrl`, `additionalImages`, `isFeatured`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Smartphone X', 'Latest smartphone with advanced features', 599.99, NULL, 1, 100, 'ELEC-SMART-X', 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744458600/405494336_5c009976-fa00-4b1e-8935-ebb766b32d6f_mua778.jpg', NULL, 1, 1, '2025-04-23 15:35:26.546', '2025-04-23 15:35:26.546'),
(2, 'Wireless Headphones', 'Noise cancelling wireless headphones', 199.99, NULL, 1, 50, 'ELEC-HEAD-WL', 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744458099/413019665_11eaf1b9-79a1-4ad3-b8a6-db952d75bdd4_yebhbe.jpg', NULL, 0, 1, '2025-04-23 15:35:26.551', '2025-04-23 15:35:26.551'),
(3, 'Men\'s T-Shirt', 'Cotton t-shirt for men', 29.99, NULL, 2, 200, 'CLOTH-TSH-M', 'https://res.cloudinary.com/dy7wyxs7b/image/upload/v1744469802/blank_isolated_white_and_black_t_shirt_front_view_template_z3kvnj.jpg', NULL, 1, 1, '2025-04-23 15:35:26.553', '2025-04-23 15:35:26.553');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(191) DEFAULT NULL,
  `reviewDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isApproved` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shippingdetail`
--

CREATE TABLE `shippingdetail` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `addressLine1` varchar(191) NOT NULL,
  `addressLine2` varchar(191) DEFAULT NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `postalCode` varchar(191) NOT NULL,
  `shippingMethod` varchar(191) DEFAULT NULL,
  `trackingUrl` varchar(191) DEFAULT NULL,
  `estimatedDelivery` datetime(3) DEFAULT NULL,
  `actualDelivery` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shippingdetail`
--

INSERT INTO `shippingdetail` (`id`, `orderId`, `firstName`, `lastName`, `email`, `phoneNumber`, `addressLine1`, `addressLine2`, `city`, `state`, `country`, `postalCode`, `shippingMethod`, `trackingUrl`, `estimatedDelivery`, `actualDelivery`) VALUES
(1, 1, 'John', 'Doe', 'john@example.com', '1234567890', '123 Main St', NULL, 'New York', 'NY', 'USA', '10001', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `firstName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) DEFAULT NULL,
  `phoneNumber` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `postalCode` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `lastLogin` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password_hash`, `firstName`, `lastName`, `phoneNumber`, `address`, `city`, `state`, `country`, `postalCode`, `createdAt`, `updatedAt`, `isActive`, `lastLogin`) VALUES
(1, 'john_doe', 'john@example.com', '$2b$10$qGeaJEHRE0MX4DdoyjUUJuzVpYPIATkBXhAJZa18rsRWyM6ZmitD.', 'John', 'Doe', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-23 15:35:26.636', '2025-04-23 15:35:26.636', 1, NULL),
(2, 'jane_smith', 'jane@example.com', '$2b$10$qGeaJEHRE0MX4DdoyjUUJuzVpYPIATkBXhAJZa18rsRWyM6ZmitD.', 'Jane', 'Smith', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-23 15:35:26.650', '2025-04-23 15:35:26.650', 1, NULL),
(3, 'gangadharanking02', 'gangadharanking02@gmail.com', '$2b$10$w/g4905jAfSzyK2qCZJDqe8RDkuA/VFBpnDs9scZg9Xsz7GhX3sie', 'Gangadharan', 'M', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-24 02:09:22.589', '2025-04-24 02:09:22.589', 1, NULL),
(5, 'testuser', 'testuser@example.com', '$2b$10$yyIEVEv8rcSzSjOVL4mvt.E2a8D09W9QXj1/GQOAgn4CE7GkfADzW', 'Gangadharan', 'M', '09940065254', 'no 9, thirupathi nagar, mangadu', 'Chennai, Tamil Nadu 600122', 'Tamil Nadu', 'India', '600122', '2025-04-26 16:56:00.418', '2025-04-26 17:15:41.832', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `addedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('168bc151-29c4-4ed7-aba7-7003906e07bd', '545b9e88022f8e6190717d6ada0b7ada639d2f879d4fda9a22aafbf035e5d17e', '2025-04-23 15:35:25.780', '20250420151808_init', NULL, NULL, '2025-04-23 15:35:25.325', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_username_key` (`username`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Cart_userId_productId_key` (`userId`,`productId`),
  ADD KEY `Cart_productId_fkey` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Category_parentId_fkey` (`parentId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_userId_fkey` (`userId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_orderId_fkey` (`orderId`),
  ADD KEY `OrderItem_productId_fkey` (`productId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Payment_orderId_fkey` (`orderId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_sku_key` (`sku`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Review_userId_fkey` (`userId`),
  ADD KEY `Review_productId_fkey` (`productId`);

--
-- Indexes for table `shippingdetail`
--
ALTER TABLE `shippingdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ShippingDetail_orderId_fkey` (`orderId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Wishlist_userId_productId_key` (`userId`,`productId`),
  ADD KEY `Wishlist_productId_fkey` (`productId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shippingdetail`
--
ALTER TABLE `shippingdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `shippingdetail`
--
ALTER TABLE `shippingdetail`
  ADD CONSTRAINT `ShippingDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `Wishlist_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
