<?php
    include("connection.php");
    
    $id = $_REQUEST["id"];
    
    $characters = mysqli_query($GLOBALS["conn"], "SELECT charid FROM characters WHERE ownerid='$id'");
    while($character = mysqli_fetch_assoc($characters))
    {
        $charid = $character["charid"];
        if(!mysqli_query($GLOBALS["conn"], "DELETE FROM characters WHERE charid='$charid'")) print 2;
        if(!mysqli_query($GLOBALS["conn"], "DELETE FROM squadrons WHERE ownerid='$charid'")) print 3;
    }
    
    
    mysqli_multi_query($GLOBALS["conn"], "DELETE FROM users WHERE id='$id'; DELETE FROM characters WHERE ownerid='$id'");
    print 1;
?>