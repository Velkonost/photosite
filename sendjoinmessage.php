
<?php
$sendto   = "velkonost@gmail.com"; // Обязательно измените e-mail на свой
$contact = $_POST['contactt'];
$fio = $_POST['fiot'];
$network = $_POST['networkt'];
$about = $_POST['aboutt'];

// Формирование заголовка письма
$subject  = "Новый фотограф для EASYPHOTO";
$headers  = "From: " . 'velkonost@gmail.com' . "\r\n";
$headers .= "Reply-To: ". 'velkonost@gmail.com' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение</h2>\r\n";
$msg .= "<p><strong>ФИО:</strong> ".$fio."</p>\r\n";
$msg .= "<p><strong>Контакт:</strong> ".$contact."</p>\r\n";
$msg .= "<p><strong>Ссылка в соц. сети:</strong> ".$network."</p>\r\n";
$msg .= "<p><strong>О себе:</strong><br> ".$about."</p>\r\n";
$msg .= "</body></html>";
// отправка сообщения
// mail($sendto, $subject, $msg, $headers);
@mail($sendto, $subject, $msg, $headers);
	echo $msg;
// } else {
	// echo "false";
// }
?>