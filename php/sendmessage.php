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

	$url = "https://api.elasticemail.com/v2/email/send?";
	$url .= "apikey=70d5ac62-9fa5-498e-9a5c-a74e58187d3c";   // replace with your api key
	$url .= "&subject=Message";
	$url .= "&from=".urlencode($_POST['email']);
	$url .= "&fromName=".urlencode($_POST['name']);
	$url .= "&to=digitalentertainment84@gmail.com";          // replace with your email address
	$url .= "&bodyText=".urlencode($_POST['message']);
	$url .= "&charset=utf-8";
	$data = array('key1' => 'value1', 'key2' => 'value2');

	// use key 'http' even if you send the request to https://...
	$options = array(
		'http' => array(
			'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
			'method'  => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	if ($result === FALSE) { /* Handle error */ }

	var_dump($result);



}
?>