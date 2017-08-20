<?php
    include("connection.php");
    
    $charname = $_REQUEST["charname"];
    $leker = mysqli_query($GLOBALS["conn"], "SELECT * FROM characters WHERE charname='$charname'");
    if(mysqli_num_rows($leker)) print 0;
    else print 1;
?>