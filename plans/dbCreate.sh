#!/bin/bash

echo -e "\nCopying .csv files to /tmp/"
cp *.csv /tmp/

echo -e "\nDropping old database..."
mysql -u root -p -e "drop database wikistats_db"

echo -e "\nCreating new database..."
mysql -u root -p < statsDB.sql

echo -e "\nPopulating database with content..."
mysql -u root -p < dbContent.sql

echo -e "\n[ Done ]"
