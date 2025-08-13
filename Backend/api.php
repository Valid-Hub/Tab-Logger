<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");
require_once "config.php";

$method = $_SERVER["REQUEST_METHOD"];
$action = $_GET["action"] ?? "";

$inputData = json_decode(file_get_contents("php://input"), true);

if ($method === "POST" && $action === "addVisited") {
    $browser_name = $inputData["browser_name"] ?? "";
    $page_title = $inputData["page_title"] ?? "";
    $page_url = $inputData["page_url"] ?? "";

    $stmt = $pdo->prepare("INSERT INTO visited_pages (browser_name, page_title, page_url) VALUES (?, ?, ?)");
    $stmt->execute([$browser_name, $page_title, $page_url]);

    echo json_encode(["status" => "success", "message" => "Visited page added"]);
}
elseif ($method === "POST" && $action === "addDeleted") {
    $browser_name = $inputData["browser_name"] ?? "";
    $page_title = $inputData["page_title"] ?? "";
    $page_url = $inputData["page_url"] ?? "";

    $stmt = $pdo->prepare("INSERT INTO deleted_pages (browser_name, page_title, page_url) VALUES (?, ?, ?)");
    $stmt->execute([$browser_name, $page_title, $page_url]);

    echo json_encode(["status" => "success", "message" => "Deleted page added"]);
}
elseif ($method === "GET" && $action === "getVisited") {
    $stmt = $pdo->query("SELECT * FROM visited_pages ORDER BY id DESC");
    $data = $stmt->fetchAll();
    echo json_encode($data);
}
elseif ($method === "GET" && $action === "getDeleted") {
    $stmt = $pdo->query("SELECT * FROM deleted_pages ORDER BY id DESC");
    $data = $stmt->fetchAll();
    echo json_encode($data); 
}
elseif ($method === "GET" && $action === "getBrowsersFromDeleted") {
    $stmt = $pdo->prepare("SELECT DISTINCT browser_name FROM deleted_pages ORDER BY browser_name ASC");
    $stmt->execute();
    $browsers = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($browsers);
}
elseif ($method === "GET" && $action === "getBrowsersFromVisited") {
    $stmt = $pdo->prepare("SELECT DISTINCT browser_name FROM visited_pages ORDER BY browser_name ASC");
    $stmt->execute();
    $browsers = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($browsers);
}
else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}
