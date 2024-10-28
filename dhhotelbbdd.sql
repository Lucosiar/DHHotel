-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dhhotelbbdd
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dhhotelbbdd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dhhotelbbdd` DEFAULT CHARACTER SET UTF8 ;
USE `dhhotelbbdd` ;

-- -----------------------------------------------------
-- Table `dhhotelbbdd`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dhhotelbbdd`.`Client` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `phone` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `last_login` DATETIME,
  PRIMARY KEY (`idClient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dhhotelbbdd`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dhhotelbbdd`.`Room` (
  `idRoom` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `state` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idRoom`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dhhotelbbdd`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dhhotelbbdd`.`Booking` (
  `idBooking` INT NOT NULL AUTO_INCREMENT,
  `idClientFK` INT NOT NULL,
  `idRoomFK` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `state` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idBooking`),
  INDEX `idClientFK_idx` (`idClientFK` ASC),
  INDEX `idRoomFK_idx` (`idRoomFK` ASC),
  CONSTRAINT `idClientFK`
    FOREIGN KEY (`idClientFK`)
    REFERENCES `dhhotelbbdd`.`Client` (`idClient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idRoomFK`
    FOREIGN KEY (`idRoomFK`)
    REFERENCES `dhhotelbbdd`.`Room` (`idRoom`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dhhotelbbdd`.`Pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dhhotelbbdd`.`Payment` (
  `idPayment` INT NOT NULL AUTO_INCREMENT,
  `idBookingFK` INT NOT NULL,
  `amount` INT NOT NULL,
  `paymentDate` DATE NOT NULL,
  `paymentMethod` VARCHAR(45) NOT NULL,
  `state` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idPayment`),
  INDEX `idBookingFK_idx` (`idBookingFK` ASC),
  CONSTRAINT `idBookingFK`
    FOREIGN KEY (`idBookingFK`)
    REFERENCES `dhhotelbbdd`.`Booking` (`idBooking`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dhhotelbbdd`.`Administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dhhotelbbdd`.`Administrator` (
  `idAdministrator` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(200) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `last_login` DATETIME,
  PRIMARY KEY (`idAdministrator`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
