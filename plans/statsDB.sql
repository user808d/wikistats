CREATE DATABASE IF NOT EXISTS `wikistats_db`;
use `wikistats_db`;

GRANT ALL ON `wikistats_db`.* to 'wstatsuser'@'localhost' identified by 'WikiStats15!';

CREATE TABLE IF NOT EXISTS Fields
(
        fieldID SMALLINT NOT NULL AUTO_INCREMENT,
	fieldName VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (fieldID)
);

CREATE TABLE IF NOT EXISTS Users
(
	email VARCHAR(30) NOT NULL UNIQUE,
	pwHash CHAR(40) NOT NULL,
	city VARCHAR(30),
	state CHAR(2),
	zip INT,
	position VARCHAR(30),
	website VARCHAR(50),
	fieldID SMALLINT NOT NULL,
        FOREIGN KEY ( fieldID ) REFERENCES Fields (fieldID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
	PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Types
(
	typeID SMALLINT NOT NULL AUTO_INCREMENT,
	typeName VARCHAR(10) NOT NULL,
	PRIMARY KEY (typeID)
);

CREATE TABLE IF NOT EXISTS Articles
(
	articleID SMALLINT NOT NULL AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL UNIQUE,
        pubDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	email VARCHAR(30) NOT NULL,
        FOREIGN KEY ( email ) REFERENCES Users (email) ON DELETE CASCADE,
	PRIMARY KEY (articleID)
);

CREATE TABLE IF NOT EXISTS Stats
(
	statsID SMALLINT NOT NULL AUTO_INCREMENT,
        articleID SMALLINT NOT NULL,
	typeID SMALLINT NOT NULL,
	tableName VARCHAR(100) NOT NULL,
        FOREIGN KEY ( articleID ) REFERENCES Articles (articleID) ON DELETE CASCADE,
        FOREIGN KEY ( typeID ) REFERENCES Types (typeID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
	PRIMARY KEY (statsID, articleID)
);

CREATE TABLE IF NOT EXISTS Edits
(
	email VARCHAR(30) NOT NULL,
	articleID SMALLINT NOT NULL,
	editDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ( articleID ) REFERENCES Articles (articleID) ON DELETE CASCADE,
        FOREIGN KEY ( email ) REFERENCES Users (email) ON DELETE CASCADE,
	PRIMARY KEY (email, articleID)
);

CREATE TABLE IF NOT EXISTS Abstracts
(
	abstractID SMALLINT NOT NULL AUTO_INCREMENT,
	content VARCHAR(10000),
	articleID SMALLINT NOT NULL,
        FOREIGN KEY ( articleID ) REFERENCES Articles (articleID) ON DELETE CASCADE,
	PRIMARY	KEY (abstractID)
);

CREATE TABLE IF NOT EXISTS URLReferences
(
	urlReference VARCHAR(50) NOT NULL,
	articleID SMALLINT NOT NULL,
        FOREIGN KEY ( articleID ) REFERENCES Articles (articleID) ON DELETE CASCADE,
	PRIMARY KEY (urlReference, articleID)
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
