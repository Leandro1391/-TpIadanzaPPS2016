-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2016 a las 23:38:29
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `segundoparcial2016`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misproductos`
--
DROP TABLE IF EXISTS `misproductos`;
CREATE TABLE IF NOT EXISTS `misproductos` (
`id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `local` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `localidad` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` decimal(7,2) COLLATE utf8_spanish2_ci NOT NULL,
  `codbar` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `misproductos`
--

INSERT INTO `misproductos` (`id`, `nombre`, `local`, `localidad` , `direccion`, `precio`, `codbar`, `foto`) VALUES
(1, 'cuaderno Ledesma', 'Jumbo', 'Quilmes', 'Av Calchaquí 3950', 90.55, '7791762453090', 'carpeta01.jpg'),
(2, 'pintura verde inglés','Sagitario', 'Quilmes', 'José Craviotto 3693', 110.88, '7792952016972', 'pintura01.jpg'),
(3, 'lavandina ayudín','Walmart', 'Quilmes', 'Av Calchaquí 700', 10.45, '7793253001353', 'lavandina01.jpg'),
(4, 'cuaderno Ledesma Essential', 'Walmart','Avellaneda', 'Carlos Gardel 3900', 80.99, '7791762559099', 'carpeta02.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misusuarios`
--
DROP TABLE IF EXISTS `misusuarios`;
CREATE TABLE IF NOT EXISTS `misusuarios` (
`id` int(11) NOT NULL,
  `correo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `misusuarios`
--

INSERT INTO `misusuarios` (`id`, `correo`, `nombre`, `clave`, `tipo`,`foto`) VALUES
(1, 'user@user.com', 'roger', '123', 'empleado','333333.jpg'),
(2, 'admin@admin.com', 'admin', '321', 'administrador', 'pordefecto.png'),
(4, 'cliente@cliente.com', 'julia', '987', 'cliente',  '888888.jpg'),
(5, 'fox@fox.com', 'michael', 'abcd', 'empleado','444444.jpg'),
(6, 'jobs@jobs.com', 'steve', '987', 'cliente','111111.jpg'),
(7, 'bulzara@bulzara.com', 'freddy', 'qwer', 'cliente', '999999.jpg'),
(8, 'cruise@cruise.com', 'tom', '987', 'cliente', '777777.jpg');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mislocales`
--

DROP TABLE IF EXISTS `mislocales`;
CREATE TABLE IF NOT EXISTS `mislocales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `localidad` varchar(25) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `gerente` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mislocales`
--

INSERT INTO `mislocales` (`id`, `nombre`, `localidad`, `direccion`, `gerente`) VALUES
(2, 'Garbarino','Avellaneda','Av Gral Güemes 897', 'Griselda Gonzalez'),
(4, 'Hoyts', 'Temperley', 'Av Hipólito Yrigoyen 10699', 'Pablo Britos'),
(12, 'Musimundo','Quilmes', 'Av Calchaquí 3950', 'Gastón Gaudio'),
(13, 'McDonalds','Lomas de Zamora', 'Av Hipólito Yrigoyen 8230', 'Anderson Grey'),
(18, 'Compumundo','Quilmes', 'Av Calchaquí 3950', 'Julieta Vanegas'),
(19, 'McDonalds','Avellaneda', 'Av Bartolomé Mitre 633', 'Jesica Grey');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `misproductos`
--
ALTER TABLE `misproductos`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `misusuarios`
--
ALTER TABLE `misusuarios`
 ADD PRIMARY KEY (`id`);

 --
-- Indices de la tabla `mislocales`
--
ALTER TABLE `mislocales`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `misproductos`
--
ALTER TABLE `misproductos`
MODIFY `id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `misusuarios`
--
ALTER TABLE `misusuarios`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mislocales`
--
ALTER TABLE `mislocales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
