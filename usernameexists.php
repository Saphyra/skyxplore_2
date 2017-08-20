<?php
    include("connection.php");
    
    $username = $_REQUEST["username"];
    $nameleker = mysqli_query($GLOBALS["conn"], "SELECT username FROM users WHERE username='$username'");
    if(mysqli_num_rows($nameleker)) print 1;
    else print 0;
?>