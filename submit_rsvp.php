<?php
    include 'db_config.php';  // Assume this file contains your db_connect and db_query functions

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $class = filter_input(INPUT_POST, 'class', FILTER_SANITIZE_STRING);
    $flight = filter_input(INPUT_POST, 'flight', FILTER_SANITIZE_NUMBER_INT);
    $food = filter_input(INPUT_POST, 'food', FILTER_SANITIZE_STRING);

    if ($name && $class && $flight !== false && in_array($food, ['normal', 'vegan', 'kosher', 'halal'])) {
        $query = "INSERT INTO {$table_prefix}rsvp (name, class, flight, food) VALUES (?, ?, ?, ?)";
        $params = [$name, $class, $flight, $food];
        $result = db_query($query, $params);
        if ($result !== false) {
            echo "RSVP submitted successfully.";
        } else {
            echo "Error submitting RSVP.";
        }
    } else {
        echo "Invalid input.";
    }
?>
