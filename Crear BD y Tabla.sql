CREATE SCHEMA `bd_hallcross`;

-------------------------------------------------------------------

use bd_hallcross;

-------------------------------------------------------------------

CREATE TABLE `evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `fecha` DATE NOT NULL,
  `descripcion` VARCHAR(800) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_evento`));