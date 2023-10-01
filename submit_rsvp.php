<?php
    include 'db_config.php';  // Assume this file contains your db_connect and db_query functions

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $class = filter_input(INPUT_POST, 'class', FILTER_SANITIZE_STRING);
    $dinner = filter_input(INPUT_POST, 'dinner', FILTER_SANITIZE_NUMBER_INT);

    if ($name && $class && $dinner !== false) {
        $query = "INSERT INTO {$table_prefix}rsvp (name, class, dinner) VALUES (?, ?, ?)";
        $params = [$name, $class, $dinner];
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