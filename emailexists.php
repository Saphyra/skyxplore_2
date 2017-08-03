<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $email = $_REQUEST["email"];
    $emailleker = mysqli_query($conn, "SELECT email FROM users WHERE email='$email'");
    if(mysqli_num_rows($emailleker)) print 1;
    else print 0;
?>