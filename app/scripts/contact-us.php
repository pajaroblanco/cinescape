<?php
/**
 * Created by IntelliJ IDEA.
 * User: Brandon
 * Date: 7/6/2016
 * Time: 3:39 PM
 */

$recaptcha_secret_key = '6LdLdiQTAAAAAETW1z71aqfByGQbfDHYae53RvrB';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

$captcha = "";
if (isset($request['g-recaptcha-response']))
    $captcha = $request['g-recaptcha-response'];

if (!$captcha) {
    http_response_code(400);
    die('');
}

$opts = array('https' =>
    array(
        'method'  => 'POST',
        //'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => ''
    )
);

$context  = stream_context_create($opts);

// handling the captcha and checking if it's ok
$response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$recaptcha_secret_key."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"], false, $context), true);
//var_dump($response);

// if the captcha is cleared with google, send the mail and echo ok.
if ($response["success"] === true) {
    // send the actual mail
    //@mail($email_to, $subject, $finalMsg);

    echo "ok";
}
else {
    http_response_code(500);
    echo "not ok";
}