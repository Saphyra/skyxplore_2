<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    $squadronid = $_REQUEST["squadronid"];
    mysqli_query($conn, "DELETE FROM squadrons WHERE squadronid='$squadronid'");
?>