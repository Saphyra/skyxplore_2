<?php
    include("connection.php");
    $squadronid = $_REQUEST["squadronid"];
    mysqli_query($GLOBALS["conn"], "DELETE FROM squadrons WHERE squadronid='$squadronid'");
?>