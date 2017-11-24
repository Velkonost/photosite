
<?php
$sendto   = "velkonost@gmail.com"; // Обязательно измените e-mail на свой
$contact = $_POST['contact'];
$type = $_POST['type'];
$hoursAmount = $_POST['hoursAmount'];
$pplAmount = $_POST['pplAmount'];
$total = $_POST['total'];
// Формирование заголовка письма
$subject  = "Новый закакз для EASYPHOTO";
$headers  = "From: " . strip_tags($contact) . "\r\n";
$headers .= "Reply-To: ". strip_tags($contact) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение</h2>\r\n";
$msg .= "<p><strong>Тип услуги:</strong> ".$type."</p>\r\n";
$msg .= "<p><strong>Кол-во часов:</strong> ".$hoursAmount."</p>\r\n";
$msg .= "<p><strong>Кол-во людей:</strong> ".$pplAmount."</p>\r\n";
$msg .= "<p><strong>Сумма:</strong><br> ".$total."</p>\r\n";
$msg .= "</body></html>";
 echo $msg;
// отправка сообщения
// mail($sendto, $subject, $msg, $headers);
// if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
// } else {
	// echo "false";
// }
?>