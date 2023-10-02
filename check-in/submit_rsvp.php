<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    foreach ($data as $guest) {
        if (!isset($guest['name']) || !isset($guest['ticketType'])) {
            echo 'Error: Missing data for one or more guests.';
            continue;  // Skip to the next iteration if any data is missing
        }

        $name = $guest['name'];
        $ticketType = $guest['ticketType'];
        $specialMeals = isset($guest['specialMeals']) ? $guest['specialMeals'] : null;
        $interestInFlightSimulator = isset($guest['interestInFlightSimulator']) ? $guest['interestInFlightSimulator'] : null;

        $query = "INSERT INTO phpbb_rsvp (name, class, food, flight, timestamp) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";
        $params = [$name, $ticketType, $specialMeals, $interestInFlightSimulator];

        if (!db_update($query, $params)) {
            echo 'Error: Database update failed for guest: ' . $name;
        } else {
            if ($specialMeals == null) {
                $specialMeals = "Buffet";
            }
            $interestInFlightSimulator = 1 ? 'Yes' : 'No';
            $to = 'hithere@hey.com';
            $subject = '[LoveTakesFlight] New RSVP Registered';
            $message = "A new guest, $name, has checked-in ($ticketType, $specialMeals, $interestInFlightSimulator).";
            $headers = 'From: support@lovetakesflight2023.com' . "\r\n" .
                'Reply-To: support@lovetakesflight2023.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

            if (mail($to, $subject, $message, $headers)) {
                echo 'Email sent successfully.';
            } else {
                echo 'Email sending failed.';
            }
        }
    }

    echo 'success';
} else {
    echo 'Error: Invalid or missing data.';
}
?>
