<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $charid = $_REQUEST["charid"];
    
    mysqli_multi_query($conn, "DELETE FROM characters WHERE charid='$charid'; DELETE FROM squadrons WHERE ownerid='$charid'");
?>