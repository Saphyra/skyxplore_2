<?php
    include("connection.php");
    
    $ownerid = $_REQUEST["ownerid"];
    $squadronname = $_REQUEST["squadronname"];
    $squadrondata = json_decode($_REQUEST["squadrondata"], 1);
    
    $squadronleker = mysqli_query($GLOBALS["conn"], "SELECT squadronid, squadronname FROM squadrons");
    $squadronids = [];
    $squadronnames = [];
    while($squadrontomb = mysqli_fetch_assoc($squadronleker))
    {
        $squadronids[] = $squadrontomb["squadronid"];
        $squadronnames[] = $squadrontomb["squadronname"];
    }
    
        if(in_array($squadronname, $squadronnames))
        {
            print 0;
            exit;
        }
    
        do
        {
            $squadronid = "squadron";
            for($x = 0; $x < 10; $x++)
            {
                $squadronid .= rand(0, 9);
            }
        }
        while(in_array($squadronid, $squadronids));
        
    $squadrondata["squadronid"] = $squadronid;
    
    $squadrondata = json_encode($squadrondata);
    
    mysqli_query($GLOBALS["conn"], "INSERT INTO squadrons (ownerid, squadronid, squadronname, squadrondata) VALUES('$ownerid', '$squadronid', '$squadronname', '$squadrondata')");
    print $squadronid;
    
?>