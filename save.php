<?php
    include("connection.php");
    
    $data = json_decode($_REQUEST["data"], 1);
    
    $charid = $data["charid"];
    $credit = $data["credit"];
    $diamond = $data["diamond"];
    $company = $data["company"];
    $level = $data["level"];
    $shipid = $data["shipid"];
    $characterdata = json_encode($data["characterdata"]);
    
    mysqli_query($GLOBALS["conn"], "UPDATE characters SET credit='$credit', diamond='$diamond', company='$company', level='$level', shipid='$shipid', characterdata='$characterdata' WHERE charid='$charid'");
    
    foreach($data["squadrons"] as $squadronid=>$squaddata)
    {
        $squadronname = $squaddata["squadronname"];
        $squadrondata = json_encode($squaddata["squadrondata"]);
        
        mysqli_query($GLOBALS["conn"], "UPDATE squadrons SET squadronname='$squadronname', squadrondata='$squadrondata' WHERE squadronid='$squadronid'");
    }
    
    print 1;
?>