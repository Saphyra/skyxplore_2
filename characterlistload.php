<?php
    include("connection.php");
    
    $id = $_REQUEST["id"];
    
    $characterlistleker = mysqli_query($GLOBALS["conn"], "SELECT charid, charname, credit, diamond, company, level, shipid FROM characters WHERE ownerid='$id'");
    if(!mysqli_num_rows($characterlistleker))
    {
        print 0;
    }
    else
    {
        while($character = mysqli_fetch_assoc($characterlistleker))
        {
            $characters[] = $character;
        }
        print json_encode($characters);
    }
?>