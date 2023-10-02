<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include 'db_config.php';

    $data = json_decode(file_get_contents("php://input"), true);

    if ($data) {
        foreach ($data as $guest) {
            $name = $guest['name'];
            $ticketType = $guest['ticketType'];
            $specialMeals = $guest['specialMeals'];
            $interestInFlightSimulator = $guest['interestInFlightSimulator'];

            // Assuming you have a table named 'phpbb_rsvp' with columns as mentioned
            $query = "INSERT INTO phpbb_rsvp (name, class, food, flight) VALUES (?, ?, ?, ?)";
            $params = [$name, $ticketType, $specialMeals, $interestInFlightSimulator];

            if (!db_update($query, $params)) {
                echo 'Error: Database update failed.';
                exit;
            }
        }

        echo 'success';
    } else {
        echo 'Error: Invalid or missing data.';
    }
?>
