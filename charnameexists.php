<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $charname = $_REQUEST["charname"];
    $nameleker = mysqli_query($conn, "SELECT charname FROM characters WHERE charname='$charname'");
    if(mysqli_num_rows($nameleker)) print 1;
    else print 0;
?>