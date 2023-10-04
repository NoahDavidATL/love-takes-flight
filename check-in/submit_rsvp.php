<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db/db_config.php';

$data = json_decode(file_get_contents("php://input"), true);

$action = $data['action'];
$guests = $data['guests'];

if ($action && $guests) {
    foreach ($guests as $guest) {
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

        if ($specialMeals == null) {
            $specialMeals = "Buffet";
        }
        if ($interestInFlightSimulator == 0) {
            $interestInFlightSimulator = 'No';
        } else {
            $interestInFlightSimulator = 'Yes';
        }
        $to = 'hithere@hey.com';
        $subject = '[LoveTakesFlight] New RSVP';
        $message = "$name has checked-in (Ticket: $ticketType, Meal: $specialMeals, Flight Sim: $interestInFlightSimulator).";
        if ($action === 'decline') {
            $subject = '[LoveTakesFlight] RSVP Declined';
            $message = "$name has declined (Ticket: $ticketType, Meal: $specialMeals, Flight Sim: $interestInFlightSimulator).";
        }
        $headers = 'From: support@lovetakesflight2023.com' . "\r\n" .
            'Reply-To: support@lovetakesflight2023.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);

        if (!db_update($query, $params)) {
            echo 'Error: Database update failed for guest: ' . $name;
        }
    }

    echo 'success';
} else {
    echo 'Error: Invalid or missing data.';
}
?>
