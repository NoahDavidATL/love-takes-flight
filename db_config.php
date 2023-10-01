<?php
    $dbms = 'mysql';
    $table_prefix = 'phpbb_';
    $dbhost = 'localhost';
    $dbname = 'fftrealm_fftrealm';
    $dbuser = 'fftrealm_realm';
    $dbpasswd = '9s&&ypWFUbSPcMATUw';

    define('PHPBB_INSTALLED', true);

    function db_connect() {
        global $dbhost, $dbname, $dbuser, $dbpasswd;

        $conn = new mysqli($dbhost, $dbuser, $dbpasswd, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    function db_query($query, $params = []) {
        $conn = db_connect();

        $stmt = $conn->prepare($query);
        if ($stmt === false) {
            trigger_error($conn->error, E_USER_ERROR);
            return false;
        }

        if (!empty($params)) {
            $types = str_repeat('s', count($params));
            $stmt->bind_param($types, ...$params);
        }

        if (!$stmt->execute()) {
            trigger_error($stmt->error, E_USER_ERROR);
            $stmt->close();
            $conn->close();
            return false;
        }

        $result = $stmt->get_result();
        if ($result === false) {
            trigger_error($stmt->error, E_USER_ERROR);
            $stmt->close();
            $conn->close();
            return false;
        }

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $stmt->close();
        $conn->close();
        return $data;
    }

    function db_update($query, $params = []) {
        return db_query($query, $params);
    }
?>
