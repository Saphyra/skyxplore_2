<?php
    include("connection.php");
    
    $id = $_REQUEST["id"];
    
    mysqli_query($GLOBALS["conn"], "UPDATE users SET code='' WHERE id='$id'");
?>