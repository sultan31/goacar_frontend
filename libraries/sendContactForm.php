<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';   


if($_POST) {
    //Fetching variables
    $myName = strip_tags(htmlspecialchars($_POST['con_name']));
    $myEmail = strip_tags(htmlspecialchars($_POST['con_email']));
    $myPhone = strip_tags(htmlspecialchars($_POST['con_phone']));
    $myMsg = strip_tags(htmlspecialchars($_POST['con_msg']));


    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);
    
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                
    $mail->isSMTP();                                            //Send using SMTP
                
    $mail->Host       = 'goacarrentalservices.com';                     //Set the SMTP server to send through
                
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                
    $mail->Username   = 'sales@goacarrentalservices.com';                     //SMTP username
                
    $mail->Password   = 'GoaCarRental@5111';                               //SMTP password
                
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
    //Recipients
    $mail->setFrom('sales@goacarrentalservices.com', 'GoaCarRentalServices');
    $mail->addAddress('goacarrentalcarrental@gmail.com', 'Goa Car Rental Services');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional (For sending to more than one email)
                
    // $mail->addReplyTo($myEmail, $myName);
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');
            
    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
            
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "New Message on GoaCarRentalServices from ".$myName;
     $mail->Body    = '<h1>New Message</h1>'.
    '<p>We have received a new message from <b>'.$myName.'</b></p>'.
    '<h3>Message details - </h3>'.
    '<p>Full Name: '.$myName.'<br>'.
    '<p>Email: '.$myEmail.'<br>'.
    '<p>Phone Number: '.$myPhone.'<br>'.
    '<p>Message: '.$myMsg.'<br>';
          
                      
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            
    if(!$mail->send()){
        $signal = "bad";
        $msg = "Mailer Error: " . $mail->ErrorInfo;
    }else{
        $signal = "ok";
        $msg = "Booking confirmed";
    }
    
    
    $data = array(
        'signal' => $signal,
        'msg' => $msg
        );

    echo json_encode($data);
}
?>