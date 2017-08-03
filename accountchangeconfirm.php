<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $id = $_REQUEST["id"];
    
    $dataleker = mysqli_query($conn, "SELECT data FROM users WHERE id='$id'");
    
    $data = json_decode(mysqli_fetch_assoc($dataleker)["data"], 1);
    
    $value = $data["value"];
    $key = $data["key"];
    
    mysqli_multi_query($conn, "UPDATE users SET $key='$value' WHERE id='$id'; UPDATE users SET data='' WHERE id='$id'");
    
?>