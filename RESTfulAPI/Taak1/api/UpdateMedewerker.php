<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST'); // gebruik hier het meest toepasselijke HTTP verb. POST of PUT zijn hier ok
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define ('INDEX', true);
// --- Step 0 : connect to db
require 'inc/dbcon.php';
require 'inc/base.php';

// update medewerkers
if(!$stmtproject = $conn->prepare("update medewerker set voornaam = ?, familienaam = ?, specialisatie = ? WHERE medewerker_id = ?")){
    die('{"error":"Prepared Statement failed on prepare","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}

if(!$stmtproject -> bind_param("sssi", htmlentities($postvars['voornaam']), $postvars['familienaam'], $postvars['specialisatie'], $postvars['medewerker_id'])){
    die('{"error":"Prepared Statement bind failed on bind","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}
$stmtproject -> execute();

if($conn->affected_rows == 0) {
    $stmtproject -> close();
    die('{"error":"Prepared Statement failed on execute : no rows affected","errNo":"' . json_encode($conn -> errno) .'","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}
$stmtproject -> close();
die('{"data":"ok","message":"Record added successfully","status":"ok"}');
?>