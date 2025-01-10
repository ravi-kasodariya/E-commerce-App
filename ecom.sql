-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 16, 2024 at 05:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `productId`, `userId`, `quantity`, `status`, `createdAt`, `updatedAt`) VALUES
(11, 2, 1, 1, 'Delivered', '2024-12-12 18:26:00', '2024-12-12 19:53:38'),
(12, 1, 1, 1, 'Delivered', '2024-12-12 18:48:15', '2024-12-12 19:50:27'),
(15, 4, 1, 1, 'Delivered', '2024-12-12 18:57:17', '2024-12-12 19:59:27'),
(17, 1, 5, 1, 'Delivered', '2024-12-12 20:29:22', '2024-12-12 20:32:37'),
(18, 2, 5, 1, 'Delivered', '2024-12-12 20:32:28', '2024-12-12 20:32:37');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `detailedDescription` longtext DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `category`, `type`, `image`, `price`, `discount`, `description`, `detailedDescription`, `sellerId`, `createdAt`, `updatedAt`) VALUES
(1, 'Trucks Transform To Robot Toys', 'Steel', NULL, 'https://d3dxkzk9npnkec.cloudfront.net/uploads/images/202403/img_x500_65ece126326e06-72761904-72150581.webp', 90, NULL, 'Toys For 5 Year Old Boys - 5 Year Old Boy Toys - 5 In 1 Stem Toys For Boys 4-6, Take Apart Trucks Transform To Robot Toys For Ages 5-7 6-8 Building T', '5 Military Vehicles in 1 Peace Defender Robot There are 5 vehicles in the box and come with easy to follow instructions. The robot toy building sets consists of 5 take-a-part vehicles, all cars can be completely dismantled into car parts and transform into a big robot or assemble into five separate cars. These kids toys encourage both solo and collaborative play allowing the little boys and girls to promote teamwork and patience. It is an ideal Christmas gifts for kids.\nRobot Sounds & Flashing Lights Appeal to Kids Once completed the robot, there is a button on the top of robot head that kids can press and active the flashing lights and realistic robot sounds, these STEM toys attract kids to construct and enhances imagination and creative play. Besides, all cars have movable wheels for kids to push and go. Just push the cars toys forward slightly then it will go on its own and coast for quite a long distance.\n', 1, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(2, 'Dancing Robots', 'Steel', NULL, 'https://samstoy.in/cdn/shop/files/Children-Electric-Dancing-Robots-for-Kids-Toy-Rock-Light-Music-Early-Education-Walking-Hot-Seller-Toys-Boys-Girls-Babys-Toddlers-samstoy-in-2505.jpg?v=1724871447', 99.99, NULL, 'Children Electric Dancing Robots for Kids Toy Rock Light Music Early Education Walking Hot Seller Toys Boys Girls Babys Toddlers', 'This Children’s Electric Dancing Robot is a fun and engaging toy designed for kids of all ages, including toddlers, boys, and girls. It features vibrant lights, cheerful music, and dynamic dance moves that captivate young minds and bring hours of entertainment. This robot not only walks but also rocks to the beat, making it an interactive companion for early education and creative play. Built with safe, durable materials, it encourages movement, rhythm, and imaginative exploration. A hot-selling favorite, it’s the perfect gift to spark joy and excitement in children while enhancing their sensory and motor skills.', 1, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(3, 'Eco Panda Magic Car', 'Fiber', NULL, 'https://samstoy.in/cdn/shop/files/Eco-Panda-Magic-Car-Sam-s-Toys-World-samstoy-in-529.jpg?v=1724876175&width=823', 20, NULL, 'Magic car is for children above the . This Magic car is a kind of ride on which is certified and is made up of BPA-free plastic to ensure safety. It is strong, sturdy, and durable and runs with bearing function. ', 'Magic car is for children above the . This Magic car is a kind of ride on which is certified and is made up of BPA-free plastic to ensure safety. It is strong, sturdy, and durable and runs with bearing function. No pedal, no gears, no electricity is required to run this Ride-OnMagic car, It is manufactured with such mechanism that the rider just needs to rotate the steering left and right to move ahead. This Ride-OnMagic car has good space on the seat for 1 rider at a time. The seat is broader than usual for the comfort and safety of rider. It is convenient to carry where ever you go. A smooth and perfect Magic Car for your toddlers. Designed for the utmost comfort of the baby with optimum height and round edges so as not to cause any injury to the kid.', 1, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(4, 'House Building      Blocks', 'Plastic', NULL, 'https://snooplay.in/cdn/shop/products/z1_67a7c6b7-4ac9-45c2-8a13-3d0a7cd68dc7.png?v=1675184709', 102.75, NULL, 'A set of colorful building blocks to give form houses. Nurtures and develops skills in various fields like. Technology by developing fine and gross motor skills needed for future applications.', 'Perfect gift for children to cultivate their creativity and cooperation skills. Children can use these blocks to build exciting robots, giraffes, reptiles, houses and more. Blocks are a benefit for the children because they encourage interaction and imagination. A smooth edge can protect the kids and be easy for them to grasp. Endless creative combinations teach spatial thinking. Enhance the children\'s ability, imagination and creativity, stimulate basic building techniques and inspire kids\' creativity and imagination. Children receive creative stimulation by making their designs with blocks. Totally harmless for your child with nontoxic plastic material used. Gift your little one with the exiting Puzzles Blocks sets which will take your child to his dream world. These sets will improve your Child\'s creative and imagination skills which will enhance his/her thoughts.', 2, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(5, 'Remote-Controlled Racing Car', 'Plastic', NULL, 'https://goyalskart.com/cdn/shop/files/61pfdiw1_XL._SX522_27486ced-9b5c-4058-b33b-2a7f1009dd69.jpg?v=1696327990&width=1445', 100, NULL, 'A fast and stylish remote-controlled car built for indoor and outdoor fun. Ideal for young car enthusiasts and beginners.', 'This Remote-Controlled Racing Car delivers thrilling high-speed action with easy-to-use controls. Its sleek design and powerful motor make it perfect for races on any surface. Built from sturdy, impact-resistant material, it’s durable and safe for kids. The rechargeable battery offers extended playtime for non-stop fun. A great gift to improve hand-eye coordination and spark excitement in young racers.', 2, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(6, 'Plush Stuffed Animal Toy', 'Soft Toy', NULL, 'https://m.media-amazon.com/images/I/51zuLUfuL1L.jpg', 15, NULL, 'A soft and cuddly stuffed animal toy for endless hugs and comfort. Great for toddlers and children as a cozy bedtime companion.', 'This Plush Stuffed Animal Toy is a lovable companion, made from ultra-soft, hypoallergenic materials. Its cute and comforting design provides kids with a sense of security and joy. Perfect for cuddles during bedtime, playtime, or traveling, it’s lightweight and easy to carry. Durable stitching ensures it can withstand daily adventures. A thoughtful gift to brighten a child’s day and encourage nurturing play.', 2, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(7, 'Musical Keyboard Piano Toy', 'Plastic', NULL, 'https://jupiterx.artbees.net/toys-shop/wp-content/uploads/sites/261/2019/07/product7.png', 88, NULL, 'A colorful musical piano toy with interactive keys and fun sound effects. Perfect for introducing kids to the joy of music.', 'The Musical Keyboard Piano Toy is an engaging way to introduce children to music and rhythm. With bright colors, interactive keys, and multiple sound effects, it keeps kids entertained while enhancing their auditory skills. Made from durable, non-toxic materials, it’s safe for little hands to explore. Lightweight and portable, it’s perfect for home or travel. A fantastic educational toy to foster creativity and a love for music from an early age.', 2, '2024-12-11 23:48:17', '2024-12-11 23:48:17'),
(8, 'Pull-Back Dinosaur Cars', 'Plastic', NULL, 'https://m.media-amazon.com/images/I/61NOpgKmgyL.jpg', 20.5, NULL, 'A fun set of pull-back cars in the shape of dinosaurs, blending creativity with excitement. Ideal for boys and girls who love dinosaurs and vehicles.', 'The Pull-Back Dinosaur Cars combine two favorite themes: dinosaurs and cars! Each car features a dinosaur-inspired design and operates with a simple pull-back mechanism for easy use. Built from durable, child-safe materials, they are designed to handle hours of play. These cars encourage imaginative play, motor skill development, and cooperative games with friends. A great gift for young adventurers who love action-packed toys with a prehistoric twist.', 2, '2024-12-11 23:48:17', '2024-12-11 23:48:17');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `rating` float DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `rating`, `review`, `productId`, `userId`, `orderId`, `createdAt`, `updatedAt`) VALUES
(2, 5, 'GGG', 1, 1, 12, '2024-12-11 19:18:57', '2024-12-12 21:17:05'),
(10, 4, 'abcsfsdfaaa', 2, 1, NULL, '2024-12-11 20:39:46', '2024-12-12 18:27:13'),
(12, 3, 'ABC', 1, 5, NULL, '2024-12-12 20:29:04', '2024-12-12 20:29:04'),
(13, 4, 'Test', 4, 1, 15, '2024-12-12 21:16:07', '2024-12-12 21:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `phone`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'ABC Company', '8899665522', 'flipcart@gmail.com', NULL, NULL),
(2, 'Amazone', '1122554477', 'amazone@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20210806175646-users.js'),
('20210806175647-sellers.js'),
('20210806175648-products.js'),
('20241210193233-orders.js'),
('20241210193252-reviews.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userType`, `email`, `firstName`, `lastName`, `password`, `profilePic`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'User', 'vaibhav@gmail.com', 'vaibhav', 'patel', '$2b$10$EqxZnF6.hd959JHBqgBP..H2XLRmL03EH8/mydcxralxwb2i8lF/6', NULL, '8877889988', '2024-12-10 19:01:20', '2024-12-10 19:01:20'),
(4, 'User', 'yash@gmail.com', 'yash', 'patel', '$2b$10$iPNu37AvFVSfuPpGKmernuayzXgYoMOo7mwwz0AOajUsNmT3UeRPC', NULL, '8866559922', '2024-12-12 20:27:40', '2024-12-12 20:27:40'),
(5, 'User', 'shrddha@gmail.com', 'shrddha', 'patel', '$2b$10$AYTtuNsJK4wVuyGT2cFqa.Dzr1CaW5oVqpNEoNb5uLUpQCevVMBPa', NULL, '7755331155', '2024-12-12 20:28:30', '2024-12-12 20:28:30'),
(6, 'User', 'ravi@gmail.com', 'ravi', 'patel', '$2b$10$ic/bGMq.heok6PVpXHcWBeXMfk0B2Dy8XKjLA1GAd2m3McMuhx8wW', NULL, '8877995566', '2024-12-16 15:34:33', '2024-12-16 15:34:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sellerId` (`sellerId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
