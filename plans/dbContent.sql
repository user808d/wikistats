use wikistats_db;
SET sql_mode='ANSI_QUOTES';

-- Chart Types
INSERT INTO Types (typeName) VALUES ('Bar');
INSERT INTO Types (typeName) VALUES ('Line');
INSERT INTO Types (typeName) VALUES ('Pie');
INSERT INTO Types (typeName) VALUES ('Column');


INSERT INTO Fields (fieldName) VALUES ('Statistics');

INSERT INTO Users (email, pwHash, city, state, zip, position, website, fieldID) VALUES ('statuser@test.com', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Rolla', 'MO', 65401, 'Student', 'http://math.mst.edu', (SELECT fieldID FROM Fields WHERE fieldName = 'Statistics') );


-- Article Data: College Major Salaries

INSERT INTO Articles (title, email) VALUES ('College Major Salaries','statuser@test.com');

INSERT INTO Abstracts (articleID, content) VALUES ((SELECT articleID FROM Articles WHERE title = 'College Major Salaries'), 'On average, a college graduate with a bachelor\'s degree earned $30,000 more per year than a high school graduate, or about $500,000 more over a lifetime, as of Apr. 2013. While college-educated people do stand a better chance of landing a job than those who don\'t go to secondary school, the time it takes to pay back the money laid out for a degree is growing, causing many to question the efficacy of attending college.');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'College Major Salaries'), 'http://ncsesdata.nsf.gov/recentgrads/2010/');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'College Major Salaries'), 'http://www.bls.gov/emp/ep_chart_001.htm/');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'College Major Salaries'), 'http://college-education.procon.org/');

CREATE TABLE stats_GraduateSalaries ( id INT NOT NULL AUTO_INCREMENT, Major_Field VARCHAR(255) NOT NULL, Median_Salary INT NOT NULL, Standard_Error INT NOT NULL, PRIMARY KEY (id) );

LOAD DATA INFILE '/tmp/Graduate Salaries.csv' INTO TABLE stats_GraduateSalaries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (Major_Field, Median_Salary, Standard_Error) SET ID=DEFAULT;

INSERT INTO Stats (articleID, typeID, tableName) VALUES ((SELECT articleID FROM Articles WHERE title='College Major Salaries'), (SELECT typeID FROM Types WHERE typeName='Bar'), 'stats_GraduateSalaries');


-- Article Data: G-20 GINI Coefficients

INSERT INTO Articles (title, email) VALUES ('G-20 GINI Coefficients','statuser@test.com');

INSERT INTO Abstracts (articleID, content) VALUES ((SELECT articleID FROM Articles WHERE title = 'G-20 GINI Coefficients'), 'The Gini coefficient measures the extent to which the distribution of income or consumption expenditure among individuals or households within an economy deviates from a perfectly equal distribution. A Lorenz curve plots the cumulative percentages of total income received against the cumulative number of recipients, starting with the poorest individual or household. The Gini coefficient measures the area between the Lorenz curve and a hypothetical line of absolute equality, expressed as a percentage of the maximum area under the line. Thus a Gini coefficient of 0 represents perfect equality, while an coefficient of 100 implies perfect inequality. The following data represents the GINI coefficients of most of the worlds major G-20 member economies.');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'G-20 GINI Coefficients'), 'http://data.worldbank.org/indicator/SI.POV.GINI/');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'G-20 GINI Coefficients'), 'https://g20.org/about-g20/g20-members/');

CREATE TABLE stats_GiniCoeff ( id INT NOT NULL AUTO_INCREMENT, Year SMALLINT NOT NULL, Argentina FLOAT(4,2) DEFAULT NULL, Australia FLOAT(4,2) DEFAULT NULL, Brazil FLOAT(4,2) DEFAULT NULL, Canada FLOAT(4,2) DEFAULT NULL, China FLOAT(4,2) DEFAULT NULL, France FLOAT(4,2) DEFAULT NULL, Germany FLOAT(4,2) DEFAULT NULL, India FLOAT(4,2) DEFAULT NULL, Indonesia FLOAT(4,2) DEFAULT NULL, Italy FLOAT(4,2) DEFAULT NULL, Mexico FLOAT(4,2) DEFAULT NULL, "Russian Federation" FLOAT(4,2) DEFAULT NULL, "South Africa" FLOAT(4,2) DEFAULT NULL, Turkey FLOAT(4,2) DEFAULT NULL, "United Kingdom" FLOAT(4,2) DEFAULT NULL, "United States" FLOAT(4,2) DEFAULT NULL, PRIMARY KEY (id) );

LOAD DATA INFILE '/tmp/G20 Gini Coefficient.csv' INTO TABLE stats_GiniCoeff FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (Year, Argentina, Australia, Brazil, Canada, China, France, Germany, India, Indonesia, Italy, Mexico, "Russian Federation", "South Africa", Turkey, "United Kingdom", "United States") SET ID=DEFAULT;

INSERT INTO Stats (articleID, typeID, tableName) VALUES ((SELECT articleID FROM Articles WHERE title='G-20 GINI Coefficients'), (SELECT typeID FROM Types WHERE typeName='Line'), 'stats_GiniCoeff');


-- Article Data: World Population

INSERT INTO Articles (title, email) VALUES ('World Population','statuser@test.com');

INSERT INTO Abstracts (articleID, content) VALUES ((SELECT articleID FROM Articles WHERE title = 'World Population'), 'The world population is the total number of living humans on Earth. The United States Census Bureau estimates that the world population exceeded 7 billion on March 12, 2012. In June 2013, the Population Division of the United Nations Department of Economic and Social Affairs estimated the world population at approximately 7.2 billion. Some analysts have questioned the sustainability of further world population growth, highlighting the growing pressures on the environment, global food supplies, and energy resources.');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'World Population'), 'http://www.worldometers.info/world-population/');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'World Population'), 'http://www.bbc.com/news/world-15459643/');

CREATE TABLE stats_WorldPopulation ( id INT NOT NULL AUTO_INCREMENT, Country VARCHAR(100) NOT NULL, Population INT NOT NULL, PRIMARY KEY (id) );

LOAD DATA INFILE '/tmp/World Population.csv' INTO TABLE stats_WorldPopulation FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (Country, Population) SET ID=DEFAULT;

INSERT INTO Stats (articleID, typeID, tableName) VALUES ((SELECT articleID FROM Articles WHERE title='World Population'), (SELECT typeID FROM Types WHERE typeName='Pie'), 'stats_WorldPopulation');


-- Article Data: Property Crime

INSERT INTO Articles (title, email) VALUES ('Property Crime','statuser@test.com');

INSERT INTO Abstracts (articleID, content) VALUES ((SELECT articleID FROM Articles WHERE title = 'Property Crime'), 'Property crime is a category of crime that includes, among other crimes, burglary, larceny, theft, motor vehicle theft, arson, shoplifting, and vandalism. Property crime involves the taking of property, and does not involve force or threat of force against a victim. In 2010, the rate of property crime was estimated at 2,941.9 per 100,000 inhabitants, a 3.3 percent decrease when compared with the rate in 2009. The 2010 property crime rate was 12.1 percent lower than the 2006 rate and 19.6 percent below the 2001 rate.');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'Property Crime'), 'http://www.bjs.gov/content/dtdata.cfm');

INSERT INTO URLReferences (articleID, urlReference) VALUES ((SELECT articleID FROM Articles WHERE title = 'Property Crime'), 'http://www.fbi.gov/about-us/cjis/ucr/crime-in-the-u.s/2010/crime-in-the-u.s.-2010/property-crime');

CREATE TABLE stats_USPropertyCrime ( id INT NOT NULL AUTO_INCREMENT, Year YEAR(4) NOT NULL, Total INT NOT NULL, Burglary INT NOT NULL, Larceny INT NOT NULL, Auto INT NOT NULL, PRIMARY KEY (id) );

LOAD DATA INFILE '/tmp/US Crime Estimates.csv' INTO TABLE stats_USPropertyCrime FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (Year, Total, Burglary, Larceny, Auto) SET ID=DEFAULT;

INSERT INTO Stats (articleID, typeID, tableName) VALUES ((SELECT articleID FROM Articles WHERE title='Property Crime'), (SELECT typeID FROM Types WHERE typeName='Line'), 'stats_USPropertyCrime');

INSERT INTO Edits (email, articleID) VALUES ('statuser@test.com', (SELECT articleID FROM Articles WHERE title = 'Property Crime'));
