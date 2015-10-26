<?php

$to = 'contact@nks-flowers.fr';

$email_subject = "[nks-flowers.fr]";
$email_address = $_POST['email'];

//--------
// from simple email form - news
//--------

/* subscribe form */
$subscribe = $_POST['subscribe'];
if( ! empty($subscribe))
{
  if( empty($email_address))
  {
  	echo "{'resultat' : 'KO'}";
  	return false;
  }

  $email_subject .= ' Nouvelle souscription';
  $email_body = "Nouvelle subscription : " . $email_address;
  $headers = "From: noreply@nks-flowers.fr\n";
  $headers .= "Reply-To: $email_address";
  mail($to,$email_subject,$email_body,$headers);
  echo "{'resultat' : 'OK'}";
  return true;
}

//--------
// from contact form
//--------
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message']))
   {
  	echo "{'resultat' : 'KO'}";
  	return false;
   }

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Create the email and send the message
$email_subject .= ' Contact site';
$email_body = "Nom: ".$name."\n\nEmail: ".$email_address."\n\nTelephone: ".$phone."\n\nMessage:\n".$message;
$headers = "From: noreply@nks-flowers.fr\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
echo "{'resultat' : 'OK'}";
return true;
?>
