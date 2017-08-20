<?php
    include("connection.php");
    
    $charid = $_REQUEST["charid"];
    
    $characterleker = mysqli_query($GLOBALS["conn"], "SELECT * FROM characters WHERE charid='$charid'");
    $squadronleker = mysqli_query($GLOBALS["conn"], "SELECT * FROM squadrons WHERE ownerid='$charid'");
    
    $chartomb = mysqli_fetch_assoc($characterleker);
    foreach($chartomb as $name=>$value)
    {
        $chardata[$name] = $value;
    }
    $chardata["characterdata"] = json_decode($chardata["characterdata"], 1);
    
    $chardata["squadrons"] = [];
    while($squadrontomb = mysqli_fetch_assoc($squadronleker))
    {
        $squadronid = $squadrontomb["squadronid"];
        foreach($squadrontomb as $name=>$value)
        {
            $chardata["squadrons"][$squadronid][$name] = $value;
        }
        $chardata["squadrons"][$squadronid]["squadrondata"] = json_decode($chardata["squadrons"][$squadronid]["squadrondata"], 1);
    }
    
    print json_encode($chardata);
?>