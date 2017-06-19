-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2017 at 04:19 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasha`
--

-- --------------------------------------------------------

--
-- Table structure for table `translationdictionary`
--

CREATE TABLE `translationdictionary` (
  `id` int(25) NOT NULL,
  `originalText` varchar(75) NOT NULL,
  `translatedText` varchar(75) NOT NULL,
  `originalLang` varchar(10) NOT NULL,
  `translatedLang` varchar(10) NOT NULL,
  `thedate` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `translationdictionary`
--

INSERT INTO `translationdictionary` (`id`, `originalText`, `translatedText`, `originalLang`, `translatedLang`, `thedate`) VALUES
(1, 'hello world', 'hello dunia', 'en', 'sw', '2017-06-19 05:56:25'),
(2, 'hello world', 'czeÅ›Ä‡ Å›wiat', 'en', 'pl', '2017-06-19 05:57:07'),
(3, 'hello world', 'à¨¹à©ˆà¨²à©‹ à¨¸à©°à¨¸à¨¾à¨°', 'en', 'pa', '2017-06-19 05:57:33'),
(4, 'how are you', 'jinsi ni wewe', 'en', 'sw', '2017-06-19 06:04:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `translationdictionary`
--
ALTER TABLE `translationdictionary`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `translationdictionary`
--
ALTER TABLE `translationdictionary`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
