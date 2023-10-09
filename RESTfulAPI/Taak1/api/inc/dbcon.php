<?php
if (!defined('INDEX')) {
   header("HTTP/1.1 404 Not Found");
    die('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL /www/api/inc/dbcon.php was not found on this server.</p>
</body></html>');
}
// Create connection strings
$servername = "ID416105_RESTFulApi.db.webhosting.be";
$username = "ID416105_RESTFulApi"; // username (zie Hosting)
$password = "testpass1"; // paswoord DATABANK (zie hosting)
$dbname = "ID416105_RESTFulApi"; // naam databank (zie hosting ; zelf gekozen)

$conn = mysqli_connect($servername, $username, $password, $dbname) or die(mysqli_connect_error());
mysqli_set_charset($conn, 'utf8mb4'); // mysqli extension
// de 2e parameter is de collation voor de connectie (hoe tekst standaard moet worden gehanteerd)
?>
?