-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2019 at 11:22 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `median_score`
--

CREATE TABLE `median_score` (
  `total_participants` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `median_score`
--

INSERT INTO `median_score` (`total_participants`) VALUES
(211);

-- --------------------------------------------------------

--
-- Table structure for table `updateResults`
--

CREATE TABLE `updateResults` (
  `id` int(11) NOT NULL,
  `score_Record` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `updateResults`
--

INSERT INTO `updateResults` (`id`, `score_Record`) VALUES
(23, 100),
(24, 0),
(25, 0),
(26, 5),
(27, 0),
(28, 0),
(29, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `updateResults`
--
ALTER TABLE `updateResults`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `updateResults`
--
ALTER TABLE `updateResults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
