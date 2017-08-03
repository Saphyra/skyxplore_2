<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $username = $_REQUEST["username"];
    $nameleker = mysqli_query($conn, "SELECT username FROM users WHERE username='$username'");
    if(mysqli_num_rows($nameleker)) print 1;
    else print 0;
?>