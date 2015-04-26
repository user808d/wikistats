<?php

/*
	Developer: Lance Pendergrass
	File: dbAdapter.php
	Desc: PHP mySQL database hanndler.
	Makes use of newer PHP Data Objects (PDOs)
*/

$debug = false;

// http://127.0.0.1/dbAdapter.php?function=x&y=z
if( $debug ) print_r($_GET);

// Database Constants (to be relocated)
define("DB_SERVER", "localhost");
define("DB_USER", "statsuser");
define("DB_PASS", "StatsWiki15!");
define("DB_NAME", "stats_db");

// Set JSON MIME Type
header("Content-type: application/json");

// Create PDO Data Source Name
$dsn = 'mysql:host=' . DB_SERVER . ';dbname=' . DB_NAME;

// Create DB Connection
try { $db = new PDO($dsn, DB_USER, DB_PASS); }
catch(PDOException $e) { die('DB Connection Failed:' . $e); }

// For sanitizing input
function cleanInput( $data ) {
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}


/* QUERY DEFINITIONS */

// Insert new field name
createField() {

	global $db, $debug;
	
	$query = 'INSERT INTO Field (fieldName) VALUES (:fieldName)';

	if( isSet( $_GET['fieldName'] ) ) {
			
		$fieldName = cleanInput( $_GET['fieldName'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':fieldName', $fieldName, PDO::PARAM_STR);
	
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

// Insert new graph type
createGraphType() {

	global $db, $debug;
	
	$query = 'INSERT INTO graphType (typeName) VALUES (:typeName)';

	if( isSet( $_GET['typeName'] ) ) {
			
		$typeName = cleanInput( $_GET['typeName'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':typeName', $typeName, PDO::PARAM_STR);
	
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

// Insert new user
createUser() {

	global $db, $debug;
	
	$query = 'INSERT INTO User (email, pwHash, city, state, zip, position, website, fieldID)'
	 . 'VALUES (:email, :pwHash, :city, :stateAbr, :zip, :position, :website, (SELECT fieldID'
	  . ' from Field WHERE name = :fieldName ) )';
	
	// If all paramters are set...
	if( isSet($_GET['email']) and isSet($_GET['pwHash']) and isSet($_GET['city']) and 
		isSet($_GET['stateAbr']) and isSet($_GET['zip']) and isSet($_GET['position']) and 
		isSet($_GET['website']) and isSet($_GET['fieldName']) ) {
		
		//...sanitize them...
		$email = cleanInput( $_GET['email'] );
		$pwHash = cleanInput( $_GET['pwHash'] );
		$city = cleanInput( $_GET['city'] );
		$stateAbr = cleanInput( $_GET['stateAbr'] );
		$zip = cleanInput( $_GET['zip'] );
		$position = cleanInput( $_GET['position'] );
		$website = cleanInput( $_GET['website'] );
		$fieldName = cleanInput( $_GET['fieldName'] );
	
		//...bind them to the query...
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':pwHash', $pwHash, PDO::PARAM_STR);
		$stmt->bindParam(':city', $city, PDO::PARAM_STR);
		$stmt->bindParam(':stateAbr', $stateAbr, PDO::PARAM_STR);
		$stmt->bindParam(':zip', $zip, PDO::PARAM_INT);
		$stmt->bindParam(':position', $position, PDO::PARAM_STR);
		$stmt->bindParam(':website', $website, PDO::PARAM_STR);
		$stmt->bindParam(':fieldName', $fieldName, PDO::PARAM_STR);
	
		//...and execute
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );	  
}

//create a new stat entry
createStat() {

	global $db, $debug;
	
	$query = 'INSERT INTO Stats (tableName, typeID) VALUES (:tableName, (SELECT typeID '
	 . 'FROM graphType WHERE typeName = :typeName))';

	if( isSet($_GET['tableName']) and isSet($_GET['typeName']) ) {
			
		$tableName = cleanInput( $_GET['tableName'] );
		$typeName = cleanInput( $_GET['typeName'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':tableName', $tableName, PDO::PARAM_STR);
		$stmt->bindParam(':typeName', $typeName, PDO::PARAM_STR);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create a new article entry
createArticle() {

	global $db, $debug;
	
	$query = 'INSERT INTO Article (authorEmail, statsID) VALUES (:authorEmail, :statsID)';

	if( isSet($_GET['authorEmail']) and isSet($_GET['statsID']) ) {
			
		$authorEmail = cleanInput( $_GET['authorEmail'] );
		$statsID = cleanInput( $_GET['statsID'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':authorEmail', $authorEmail, PDO::PARAM_STR);
		$stmt->bindParam(':statsID', $statsID, PDO::PARAM_INT);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create an edit log
createEdit() {

	global $db, $debug;
	
	$query = 'INSERT INTO Edits (authorEmail, articleID, editDate) '
	 . 'VALUES (:authorEmail, :articleID, NOW())';

	if( isSet($_GET['authorEmail']) and isSet($_GET['articleID']) ) {
			
		$authorEmail = cleanInput( $_GET['authorEmail'] );
		$articleID = cleanInput( $_GET['articleID'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':authorEmail', $authorEmail, PDO::PARAM_STR);
		$stmt->bindParam(':articleID', $articleID, PDO::PARAM_INT);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create an Abstract entry
createAbstract() {

	global $db, $debug;
	
	$query = 'INSERT INTO Abstracts (content, articleID) VALUES (:content, :articleID)';

	if( isSet($_GET['content']) and isSet($_GET['articleID']) ) {
			
		$content = cleanInput( $_GET['content'] );
		$articleID = cleanInput( $_GET['articleID'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':content', $content, PDO::PARAM_STR);
		$stmt->bindParam(':articleID', $articleID, PDO::PARAM_INT);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create a URL Reference
createReference() {

	global $db, $debug;
	
	$query = 'INSERT INTO Reference (articleID, urlReference) VALUES (:articleID, :urlReference)';

	if( isSet($_GET['articleID']) and isSet($_GET['urlReference']) ) {
			
		$articleID = cleanInput( $_GET['articleID'] );
		$urlReference = cleanInput( $_GET['urlReference'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':articleID', $articleID, PDO::PARAM_INT);
		$stmt->bindParam(':urlReference', $urlReference, PDO::PARAM_STR);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create a 3D Graph Entry
create3DGraph() {

	global $db, $debug;
	
	$query = 'INSERT INTO 3D (X, Y, Z) VALUES (:x, :y, :z)';

	if( isSet($_GET['x']) and isSet($_GET['y']) and isSet($_GET['z']) ) {
			
		$x = cleanInput( $_GET['x'] );
		$y = cleanInput( $_GET['y'] );
		$z = cleanInput( $_GET['z'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':x', $x, PDO::PARAM_INT);
		$stmt->bindParam(':y', $y, PDO::PARAM_INT);
		$stmt->bindParam(':z', $z, PDO::PARAM_INT);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}

//create a Line Graph Entry
createLineGraph() {

	global $db, $debug;
	
	$query = 'INSERT INTO Line (X, Y, Color) VALUES (:x, :y, :color)';

	if( isSet($_GET['x']) and isSet($_GET['y']) and isSet($_GET['color']) ) {
			
		$x = cleanInput( $_GET['x'] );
		$y = cleanInput( $_GET['y'] );
		$color = cleanInput( $_GET['color'] );
	
		$stmt = $db->prepare( $query );
		$stmt->bindParam(':x', $x, PDO::PARAM_INT);
		$stmt->bindParam(':y', $y, PDO::PARAM_INT);
		$stmt->bindParam(':color', $color, PDO::PARAM_STR);
		
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);			
	}
	
	if( $debug ) print( json_encode( $results ) );
	
	return json_encode( $results );
}


/* MAIN ENTRY LOGIC */

// Determine which query to invoke
if( isset( $_GET['function'] ) ) {

	$function = cleanInput( $_GET['function'] );
	
	if( $function == 'createField' )
		return createField();
		
	elseif($function == 'createGraphType')
		return createGraphType();
		
	elseif($function == 'createArticle')
		return createArticle();
		
	elseif($function == 'createEdit')
		return createEdit();
		
	elseif($function == 'createAbstract')
		return createAbstract();
		
	elseif($function == 'createReference')
		return createReference();
		
	elseif($function == 'create3DGraph')
		return create3DGraph();
		
	elseif($function == 'createLineGraph')
		return createLineGraph();
		
	//elseif...other query request
}


// Close DB Connection
$db = null;

?>
