<?php
    if(isset($_GET["load"]))
    {
        $pagename = $_GET["load"] . ".html";
    }
    else $pagename = "welcome" . ".html";
    
    if(isset($_GET["page"]))
    {
        $pagename .= "#" . $_GET["page"];
    }
?>

<HTML>
    <HEAD>
        <TITLE>Súgó - SkyXplore</TITLE>
        
        <META charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="common.css">
    </HEAD>
    
    <STYLE>
    
    </STYLE>
    
    <FRAMESET cols='250, *' framespacing='0'>
        <FRAME name='menu' src='menu.html' noresize='noresize'>
        
        </FRAME>
        <FRAME name='content' src='<?php print $pagename; ?>' noresize='noresize'>
        
        </FRAME>
    </FRAMESET>
</HTML>