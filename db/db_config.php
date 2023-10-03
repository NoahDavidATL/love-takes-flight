<?php
$dbms = 'mysql';
$table_prefix = 'phpbb_';
$dbhost = 'localhost';
$dbname = 'fftrealm_fftrealm';
$dbuser = 'fftrealm_realm';
$dbpasswd = '9s&&ypWFUbSPcMATUw';
$dsn = "$dbms:host=$dbhost;dbname=$dbname;charset=utf8";

function db_connect()
{
    global $dsn, $dbuser, $dbpasswd;

    try {
        return new PDO($dsn, $dbuser, $dbpasswd, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        trigger_error("Database connection failed: " . $e->getMessage(), E_USER_ERROR);
    }
}

function db_query($query, $params = [])
{
    $conn = db_connect();
    if (!$conn) return false;

    try {
        $stmt = $conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        trigger_error("Database query failed: " . $e->getMessage(), E_USER_ERROR);
    }
}

function db_update($query, $params = [])
{
    return db_query($query, $params);
}
