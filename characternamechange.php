<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $charid = $_REQUEST["charid"];
    $newcharname = $_REQUEST["newcharname"];
    
    mysqli_query($conn, "UPDATE characters SET charname='$newcharname' WHERE charid='$charid'");
?>