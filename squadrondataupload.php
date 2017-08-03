<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $squadronid = $_REQUEST["squadronid"];
    $squadrondata = $_REQUEST["squadrondata"];
    
    mysqli_query($conn, "UPDATE squadrons SET squadrondata='$squadrondata' WHERE squadronid='$squadronid'");
?>