<?php
    include("connection.php");
    
    $input = $_REQUEST["input"];
    
    $lekeres = mysqli_query($GLOBALS["conn"], "SELECT id FROM users WHERE username='$input' OR email='$input'");
    if(mysqli_num_rows($lekeres) != 1)
    {
        print 0;
    }
    else
    {
        $id = mysqli_fetch_assoc($lekeres)["id"];

        $pw = "";
        for($x = 0; $x < 10; $x++)
        {
            $pw .= rand(0, 9);
        }
        
        mysqli_query($GLOBALS["conn"], "UPDATE users SET password='$pw' WHERE id='$id'");
        print 1;
    }
?>