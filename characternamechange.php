<?php
    include("connection.php");
    
    $charid = $_REQUEST["charid"];
    $newcharname = $_REQUEST["newcharname"];
    
    mysqli_query($GLOBALS["conn"], "UPDATE characters SET charname='$newcharname' WHERE charid='$charid'");
?>