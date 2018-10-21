<?php
// Email Submit
// Note: filter_var() requires PHP >= 5.2.0
if ( isset($_POST['email']) && isset($_POST['name']) && isset($_POST['message']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {

	// detect & prevent header injections
	$test = "/(content-type|bcc:|cc:|to:)/i";
	foreach ($_POST as $key => $val) {
		if (preg_match($test, $val)) {
			exit;
		}
	}

	$to = "digitalentertainment84@gmail.com";	// receiver of the email
    $subject = "You have a message.";			// subject of the email
	$message = '
	<html>
		<head>
			<title>Your Site Contact Form</title>
		</head>
		<body>
			<h3>Name: <span style="font-weight: normal;">' . $_POST['name'] . '</span></h3>
			<h3>Email: <span style="font-weight: normal;">' . $_POST['email'] . '</span></h3>
			<div>
				<h3 style="margin-bottom: 5px;">Comment:</h3>
				<div>' . $_POST['message'] . '</div>
			</div>
		</body>
	</html>';

	// E-mail sending function
	mail($to, $subject, $message);

}
?>