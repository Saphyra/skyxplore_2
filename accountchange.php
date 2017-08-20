<?php
    include("connection.php");
    
    $id = $_REQUEST["id"];
    
    $code = "";
    for($x = 0; $x < 10; $x++)
    {
        $code .= rand(0, 9);
    }
    
    $data["value"] = $_REQUEST["value"];
    $data["key"] = $_REQUEST["key"];
    $data["code"] = $code;
    
    $data = json_encode($data);
    
    mysqli_query($GLOBALS["conn"], "UPDATE users SET data='$data' WHERE id='$id'");
    print $code;
    
?>