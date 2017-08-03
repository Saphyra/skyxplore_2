<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $email = $_REQUEST["email"];
    
    $idleker = mysqli_query($conn, "SELECT id FROM users");
    
    $ids = [];
    while($idt = mysqli_fetch_assoc($idleker))
    {
        $ids[] = $idt["id"];
    }
    
    do
    {
        $id = "user";
        for($x = 0; $x < 10; $x++)
        {
            $id .= rand(0, 9);
        }
    }
    while(in_array($id, $ids));
    
    $code = "";
    for($x = 0; $x < 10; $x++)
    {
        $code .= rand(0, 9);
    }
    
    
    mysqli_query($conn, "INSERT INTO users (username, password, email, id, code) VALUES('$username', '$password', '$email', '$id', '$code')");
    print 1;
    
?>