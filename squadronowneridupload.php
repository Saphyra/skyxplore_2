<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $ownerid = $_REQUEST["ownerid"];
    $squadronid = $_REQUEST["squadronid"];
    
    mysqli_query($conn, "UPDATE squadrons SET ownerid='$ownerid' WHERE squadronid='$squadronid'");
?>