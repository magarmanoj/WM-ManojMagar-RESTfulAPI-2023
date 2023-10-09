<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE'); // Use DELETE method for deletion
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

define('INDEX', true);
// --- Step 0: Connect to the database
require 'inc/dbcon.php';
require 'inc/base.php';

// Check if the HTTP request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $projectId = $_REQUEST['project_id'];

    if (!$stmt = $conn->prepare("delete from projects where project_id = ?")) {
        die('{"error":"Prepared Statement failed on prepare","errNo":"' . json_encode($conn->errno) . '","mysqlError":"' . json_encode($conn->error) . '","status":"fail"}');
    }

    if (!$stmt->bind_param("i", $projectId)) {
        die('{"error":"Prepared Statement bind failed on bind","errNo":"' . json_encode($conn->errno) . '","mysqlError":"' . json_encode($conn->error) . '","status":"fail"}');
    }

    // Execute the DELETE query
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        // Deletion was successful
        $stmt->close();
        die('{"data":"ok","message":"Project deleted successfully","status":"ok"}');
    } else {
        // No rows affected, deletion failed
        $stmt->close();
        die('{"error":"No rows affected, deletion failed","status":"fail"}');
    }
} else {
    http_response_code(405); // Method Not Allowed for other HTTP methods
    echo json_encode(array("message" => "Method not allowed"));
}
?>
