<?php
    include("connection.php");
    
    $charid = $_REQUEST["charid"];
    
    mysqli_multi_query($GLOBALS["conn"], "DELETE FROM characters WHERE charid='$charid'; DELETE FROM squadrons WHERE ownerid='$charid'");
?>