<?php
    include("connection.php");
    
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    
    $userleker = mysqli_query($GLOBALS["conn"], "SELECT * FROM users WHERE username='$username' AND password='$password'");
    if(!mysqli_num_rows($userleker)) print 0;
    else
    {
        $usertomb = mysqli_fetch_assoc($userleker);
        print json_encode($usertomb);
    }
?>