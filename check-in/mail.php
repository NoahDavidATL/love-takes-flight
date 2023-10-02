<?php

$to = 'hithere@hey.com';
$subject = '[LoveTakesFlight] New RSVP Registered';
$message = "A new guest, Noah, has checked-in.";
$headers = 'From: support@lovetakesflight2023.com' . "\r\n" .
    'Reply-To: support@lovetakesflight2023.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully.';
} else {
    echo 'Email sending failed.';
}

?>