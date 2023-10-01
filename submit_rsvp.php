<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include 'db_config.php';

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $class = filter_input(INPUT_POST, 'class', FILTER_SANITIZE_STRING);
    $flight = filter_input(INPUT_POST, 'flight', FILTER_SANITIZE_NUMBER_INT);
    $food = filter_input(INPUT_POST, 'food', FILTER_SANITIZE_STRING);

    if ($name && $class && $flight !== false && in_array($food, ['normal', 'vegan', 'kosher', 'halal'])) {
        $query = "INSERT INTO {$table_prefix}rsvp (name, class, flight, food) VALUES (?, ?, ?, ?)";
        $params = [$name, $class, $flight, $food];
        $result = db_query($query, $params);
        if ($result !== false) {
            header('Location: confirmation.html');  // Redirect to confirmation.html
            exit();
        } else {
            echo "Error submitting RSVP.";
        }
    } else {
        echo "Invalid input.";
    }
?>
