<?php

    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';   

if($_POST) {

    //Fetching variables
    $carType = strip_tags(htmlspecialchars($_POST['carType']));
    $pickupLoc = strip_tags(htmlspecialchars($_POST['pickLocation']));
    $dropLoc = strip_tags(htmlspecialchars($_POST['dropLocation']));
    $pickDateTime = strip_tags(htmlspecialchars($_POST['pickDateTime']));
    $dropDateTime = strip_tags(htmlspecialchars($_POST['dropDateTime']));
    $name = strip_tags(htmlspecialchars($_POST['name']));
    $phone = strip_tags(htmlspecialchars($_POST['phone']));
    $email = strip_tags(htmlspecialchars($_POST['email']));
    $code = strip_tags(htmlspecialchars($_POST['inputCode']));


    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);
    
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                
    $mail->isSMTP();                                            //Send using SMTP
                
    $mail->Host       = 'goacarrentalservices.in';                     //Set the SMTP server to send through
                
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                
    $mail->Username   = 'sales@goacarrentalservices.in';                     //SMTP username
                
    $mail->Password   = 'GoaCarRental@5111';                               //SMTP password
                
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
    //Recipients
    $mail->setFrom('sales@goacarrentalservices.in', 'GoaCarRentalServices');
    $mail->addAddress('goacarrentalservices@gmail.com', 'Goa Car Rental Services');     //Add a recipient
    
    // $mail->addAddress('ellen@example.com');               //Name is optional (For sending to more than one email)
                
    $mail->addReplyTo($email, $name);
    // $mail->addCC('jsultan1250@gmail.com');
    // $mail->addBCC('bcc@example.com');
            
    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
            
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "New Booking from ".$name;
     $mail->Body    = 
    '<h1>New booking Confirmed</h1>'.
    '<p>We have received a new booking under the name <b>'.$name.'</b></p>'.
    '<h3>Booking details - </h3>'.
    '<p>Vehicle Type: '.$carType.'<br>'.
    'Pick-up Location: '.$pickupLoc.'<br>'.
    'Drop-off Location: '.$dropLoc.'<br>'.
    'Pick-up Date and Time: '.$pickDateTime.'<br>'.
    'Drop-off Date and Time: '.$dropDateTime.'</p>'.
    '<h3>Personal details - </h3>'.
    '<p>Full Name: '.$name.'<br>'.
    'Phone Number: '.$phone.'<br>'.
    'Email: '.$email.'<br>'.
    '<h3>Token Code - '.$code.'</h3><br>';
          
                      
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