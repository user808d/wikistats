CREATE DATABASE IF NOT EXISTS `wikistats_db`;
use `wikistats_db`;

GRANT ALL ON `wikistats_db`.* to 'wstatsuser'@'localhost' identified by 'WikiStats15!';

CREATE TABLE IF NOT EXISTS Fields
(
        fieldID SMALLINT AUTO_INCREMENT,
	fieldName VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (fieldID)
);

CREATE TABLE IF NOT EXISTS Users
(
	email VARCHAR(30) NOT NULL UNIQUE,
	pwHash CHAR(40),
	city VARCHAR(30),
	state CHAR(2),
	zip INT,
	position VARCHAR(30),
	website VARCHAR(50),
	fieldID SMALLINT NOT NULL REFERENCES Fields,
	PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Types
(
	typeID SMALLINT NOT NULL AUTO_INCREMENT,
	typeName VARCHAR(10) NOT NULL,
	PRIMARY KEY (typeID)
);

CREATE TABLE IF NOT EXISTS Stats
(
	statsID SMALLINT NOT NULL AUTO_INCREMENT,
        articleID SMALLINT NOT NULL REFERENCES Articles,
	typeID SMALLINT NOT NULL REFERENCES Types,
	tableName VARCHAR(100),
	PRIMARY KEY (statsID, articleID)
);

CREATE TABLE IF NOT EXISTS Articles
(
	articleID SMALLINT NOT NULL AUTO_INCREMENT,
	statsID SMALLINT REFERENCES Stats,
        title VARCHAR(30),
	authorEmail VARCHAR(30) NOT NULL REFERENCES Users(email),
	PRIMARY KEY (articleID)
);

CREATE TABLE IF NOT EXISTS Edits
(
	authorEmail VARCHAR(30) NOT NULL REFERENCES Users(email),
	articleID SMALLINT NOT NULL REFERENCES Articles,
	editDate DATE,
	PRIMARY KEY (authorEmail, articleID)
);

CREATE TABLE IF NOT EXISTS Abstracts
(
	abstractID SMALLINT NOT NULL AUTO_INCREMENT,
	content VARCHAR(10000),
	articleID SMALLINT NOT NULL REFERENCES Articles,
	PRIMARY	KEY (abstractID)
);

CREATE TABLE IF NOT EXISTS URLReferences
(
	articleID SMALLINT NOT NULL REFERENCES Articles,
	urlReference VARCHAR(50) NOT NULL,
	PRIMARY KEY (articleID, urlReference)
);

CREATE TABLE IF NOT EXISTS 3D
(
	ID SMALLINT NOT NULL AUTO_INCREMENT,
	X INT NOT NULL,
	Y INT NOT NULL,
	Z INT NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Pie
(
        ID SMALLINT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Line
(
	ID SMALLINT NOT NULL AUTO_INCREMENT,
	X INT NOT NULL,
	Y INT NOT NULL,
	Color VARCHAR(10),
	PRIMARY KEY (ID)
);