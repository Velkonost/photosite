
<?php
$sendto   = "velkonost@gmail.com"; // Обязательно измените e-mail на свой
$contact = $_POST['contactt'];
$type = $_POST['typet'];
$hoursAmount = $_POST['hoursAmountt'];
$pplAmount = $_POST['pplAmountt'];
$total = $_POST['totalt'];
// Формирование заголовка письма
$subject  = "Новый заказ для EASYPHOTO";
$headers  = "From: " . 'velko2nost@gmail.com' . "\r\n";
$headers .= "Reply-To: ". 'vel2konost@gmail.com' . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение</h2>\r\n";
$msg .= "<p><strong>Тип услуги:</strong> ".$type."</p>\r\n";
$msg .= "<p><strong>Кол-во часов:</strong> ".$hoursAmount."</p>\r\n";
$msg .= "<p><strong>Кол-во людей:</strong> ".$pplAmount."</p>\r\n";
$msg .= "<p><strong>Сумма:</strong> ".$total."</p>\r\n";
$msg .= "<p><strong>Контакт:</strong> ".$contact."</p>\r\n";
$msg .= "</body></html>";
// отправка сообщения
// mail($sendto, $subject, $msg, $headers);
@mail($sendto, $subject, $msg, $headers);
	echo $msg;
// } else {
	// echo "false";
// }
?>