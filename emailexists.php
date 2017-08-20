<?php
    include("connection.php");
    
    $email = $_REQUEST["email"];
    $emailleker = mysqli_query($GLOBALS["conn"], "SELECT email FROM users WHERE email='$email'");
    if(mysqli_num_rows($emailleker)) print 1;
    else print 0;
?>