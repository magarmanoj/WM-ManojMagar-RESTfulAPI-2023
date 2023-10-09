<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define ('INDEX', true);
require 'inc/base.php';
require 'inc/dbcon.php';

if(!$stmtMedewerker  = $conn->prepare("insert into medewerker (voornaam, familienaam, specialisatie) value (?, ?, ?)")){
    die('{"error": "Prepared statement failed on prepare", "errNo":"' .json_encode($conn->errno). '","mysqlError":"'.json_encode($conn->error).'","status":"fail"}');
}

if (!$stmtProject = $conn->prepare("insert into projects (naam, code, beschrijving) VALUES (?, ?, ?)")) {
    die('{"error": "Prepared statement failed on prepare", "errNo":"' . json_encode($conn->errno) . '","mysqlError":"' . json_encode($conn->error) . '","status":"fail"}');
}


if ($stmtMedewerker->bind_param("sss", htmlentities($postvars['voornaam'], $postvars['familienaam'], $postvars['specialisatie']))) {
    die('{"error": "Prepared statement failed on prepare", "errNo":"' . json_encode($conn->errno) . '","mysqlError":"' . json_encode($conn->error) . '","status":"fail"}');
}

if ($stmtProject->bind_param("sss", htmlentities($postvars['naam'], $postvars['code'], $postvars['beschrijving']))) {
    die('{"error": "Prepared statement failed on prepare", "errNo":"' . json_encode($conn->errno) . '","mysqlError":"' . json_encode($conn->error) . '","status":"fail"}');
}

// $stmtProject -> execute();
$stmtMedewerker -> execute();

if($conn->affected_rows == 0) {
    // add failed
    $stmtMedewerker -> close();
    $stmtProject -> close();
    die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}
// added
$stmtMedewerker -> close();
// $stmtProject -> close();
// antwoord met een ok -> kijk na wat je in de client ontvangt
die('{"data":"ok","message":"Record added successfully","status":"ok"}');

?>