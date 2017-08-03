<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $charname = $_REQUEST["charname"];
    $leker = mysqli_query($conn, "SELECT * FROM characters WHERE charname='$charname'");
    if(mysqli_num_rows($leker)) print 0;
    else print 1;
?>