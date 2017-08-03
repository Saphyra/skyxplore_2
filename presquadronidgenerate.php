<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    for($x = 0; $x < $_REQUEST["squadronnum"]; $x++)
    {
        $idleker = mysqli_query($conn, "SELECT squadronid, squadronname FROM squadrons");
        $ids = [];
        $names = [];
        while($idtomb = mysqli_fetch_assoc($idleker))
        {
            $ids[] = $idtomb["squadronid"];
            $names[] = $idtomb["squadronname"];
        }
        
        do
        {
            $squadid = "squadron";
            for($y = 0; $y < 10; $y++)
            {
                $squadid .= rand(0, 9);
            }
            
        }
        while(in_array($squadid, $ids));
        
        do
        {
            $squadname = "Raj";
            for($y = 0; $y < 10; $y++)
            {
                $squadname .= rand(0, 9);
            }
            
        }
        while(in_array($squadname, $names));
        
        $s["id"] = $squadid;
        $s["name"] = $squadname;
        
        $squadronids[] = $s;
        mysqli_query($conn, "INSERT INTO squadrons (squadronid, squadronname) VALUE('$squadid', '$squadname')");
    }
    
    print json_encode($squadronids);
?>