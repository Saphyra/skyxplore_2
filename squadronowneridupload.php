<?php
    include("connection.php");
    
    $ownerid = $_REQUEST["ownerid"];
    $squadronid = $_REQUEST["squadronid"];
    
    mysqli_query($GLOBALS["conn"], "UPDATE squadrons SET ownerid='$ownerid' WHERE squadronid='$squadronid'");
?>