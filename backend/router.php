<?php
/**
 * RecruiterMS — API Router
 * 
 * Simple PHP router for clean URL routing.
 * Run with: php -S localhost:8000 backend/router.php
 */

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove trailing slash
$uri = rtrim($uri, '/');

// Route map
$routes = [
    // Auth routes
    'POST /api/auth/signup'               => __DIR__ . '/api/auth/signup.php',
    'POST /api/auth/login'                => __DIR__ . '/api/auth/login.php',
    'GET /api/auth/verify-email'          => __DIR__ . '/api/auth/verify-email.php',
    'POST /api/auth/resend-verification'  => __DIR__ . '/api/auth/resend-verification.php',
];

// Check exact match
$routeKey = "{$method} {$uri}";
if (isset($routes[$routeKey])) {
    require $routes[$routeKey];
    exit;
}

// Handle CORS preflight for all routes
if ($method === 'OPTIONS') {
    require_once __DIR__ . '/helpers/response.php';
    setCorsHeaders();
    exit;
}

// 404 — Route not found
http_response_code(404);
header('Content-Type: application/json');
echo json_encode([
    'success' => false,
    'message' => "Route not found: {$method} {$uri}"
]);
