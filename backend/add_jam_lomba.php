<?php
$host = 'mysql-18b48b88-namaandaa72-d95c.l.aivencloud.com';
$port = '22855';
$db = 'defaultdb';
$user = 'avnadmin';
$pass = 'YOUR_DB_PASSWORD';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Check if column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM lombas LIKE 'jam_lomba'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE lombas ADD COLUMN jam_lomba VARCHAR(255) NULL AFTER tanggal_lomba");
        echo "Column jam_lomba added successfully.\n";
    } else {
        echo "Column jam_lomba already exists.\n";
    }
} catch (\PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
