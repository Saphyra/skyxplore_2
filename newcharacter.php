<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $charname = $_REQUEST["charname"];
    $company = $_REQUEST["company"];
    $ownerid = $_REQUEST["ownerid"];
    $credit = 10000000;
    $diamond = 10000000;
    $level = 1;
    $data = $_REQUEST["data"];
    $shipid = $_REQUEST["shipid"];
    
    
    $ids = [];
    $idleker = mysqli_query($conn, "SELECT charid FROM characters");
    while($idt = mysqli_fetch_assoc($idleker))
    {
        $ids[] = $idt["charid"];
    }
    
    $charid = "char";
    for($x = 0; $x < 10; $x++)
    {
        $charid .= rand(0, 9);
    }
    
    $sql = "INSERT INTO characters (charid, ownerid, charname, credit, diamond, company, level, shipid, characterdata) VALUES('$charid', '$ownerid', '$charname', '$credit', '$diamond', '$company', '$level', '$shipid', '$data')";
    mysqli_query($conn, $sql);
    
    print $charid;
?>