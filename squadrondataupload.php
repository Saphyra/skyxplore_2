<?php
    include("connection.php");
    
    $squadronid = $_REQUEST["squadronid"];
    $squadrondata = $_REQUEST["squadrondata"];
    
    mysqli_query($GLOBALS["conn"], "UPDATE squadrons SET squadrondata='$squadrondata' WHERE squadronid='$squadronid'");
?>