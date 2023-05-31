<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('slagrach@gmail.com', 'Заявка на приём');

//Кому отправить
$mail->addAddress('slagrach@gmail.com');

//Тема письма
$mail->Subject = 'Ура! Новая заявка!';

//Тело письма
$body = '<h1>У нас есть заказ!</h1>';

if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Перезвоните срочно по телефону:</strong> ' . $_POST['phone'] . '</p>';
}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
