-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-03-2023 a las 15:50:05
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tercertiempo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrators`
--

DROP TABLE IF EXISTS `administrators`;
CREATE TABLE IF NOT EXISTS `administrators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrators`
--

INSERT INTO `administrators` (`id`, `user`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3'),
(2, 'Matias', '06098bbde90f356c3a7cddcdfcf92eee');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` text COLLATE utf8mb4_general_ci NOT NULL,
  `cuerpo` text COLLATE utf8mb4_general_ci NOT NULL,
  `img_id` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `cuerpo`, `img_id`) VALUES
(10, 'Inauguración de la pagina', 'Bienvenidos a todos', 'lkwfpuk8bwufovmx9rbp'),
(7, 'Campeones del torneo 2022', 'Felicitaciones campeones', 'g79etjumprhpj1gskybh'),
(8, 'Temporada de verano', 'Aprovecha el 15% de descuento en este verano', 'be83qhrphjhlg7acrfu4'),
(11, 'Escuelita de futbol', 'Veni a la escuelita todos los sábados a partir de las 10hs', ''),
(12, 'Campeones del mundo ', 'Felicitaciones a todos los campeones del mundo', 'd6ii0znpjcqpjuidbuca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` int NOT NULL,
  `telefono` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `nombre`, `apellido`, `dni`, `telefono`) VALUES
(27, 'Bochini', '06098bbde90f356c3a7cddcdfcf92eee', 'Ricardo', 'Bochini', 123456, 1111111),
(25, 'prueba2', 'c893bad68927b457dbed39460e6afd62', 'prueba', 'prueba', 1234, 1111111),
(26, 'MatiasK', '455ca0195da18525b7f69ced381f6333', 'Matias', 'Kuzma', 39919442, 1111111);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
