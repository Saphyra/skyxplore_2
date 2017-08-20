<?php
    include("connection.php");
    
    $charname = $_REQUEST["charname"];
    $nameleker = mysqli_query($GLOBALS["conn"], "SELECT charname FROM characters WHERE charname='$charname'");
    if(mysqli_num_rows($nameleker)) print 1;
    else print 0;
?>