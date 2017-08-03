<?php
    $conn = mysqli_connect("localhost", "root", "", "skyxplore2");
    
    $id = $_REQUEST["id"];
    
    mysqli_query($conn, "UPDATE users SET code='' WHERE id='$id'");
?>