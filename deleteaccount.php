<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $id = $_REQUEST["id"];
    
    $characters = mysqli_query($conn, "SELECT charid FROM characters WHERE ownerid='$id'");
    while($character = mysqli_fetch_assoc($characters))
    {
        $charid = $character["charid"];
        if(!mysqli_query($conn, "DELETE FROM characters WHERE charid='$charid'")) print 2;
        if(!mysqli_query($conn, "DELETE FROM squadrons WHERE ownerid='$charid'")) print 3;
    }
    
    
    mysqli_multi_query($conn, "DELETE FROM users WHERE id='$id'; DELETE FROM characters WHERE ownerid='$id'");
    print 1;
?>