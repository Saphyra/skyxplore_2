(function loggedincheck()
{
    try
    {
        if(sessionStorage.id == undefined)
        {
            window.location.href = "index.html";
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
})();

function logout()
//kijelentkezés
{
    try
    {
        document.cookie = "userbame" + sessionStorage.username + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "password=" + sessionStorage.password + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        
        var i;
        for(i in sessionStorage)
        {
            delete sessionStorage[i];
        }
        
        window.location.href = "index.html";
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function characterload()
{
    try
    {
        var request = new XMLHttpRequest();
            request.open("POST", "characterload.php", 0);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send("charid=" + sessionStorage.charid);
            
            window.chardata = JSON.parse(request.responseText);
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function settingsmenu()
{
    try
    {
        var dialogs = document.getElementsByClassName("menucontainer");
        var x = 0;
        for(x; x < dialogs.length; x++)
        {
            dialogs[x].style.display = "none";
        }
        document.getElementById("settingscontainer").style.display = "block";
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function contenttableset()
{
    try
    {
        var div;
        if(div = document.getElementById("contenttable"))
        {
            div.style.height = window.innerHeight - 225;
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function save()
{
    try
    {
        var request = new XMLHttpRequest();
            request.open("POST", "save.php", 1);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send("data=" + JSON.stringify(chardata));
            request.onreadystatechange = function()
            {
                if(request.readyState == 4)
                {
                    if(request.status != 200 || request.responseText != 1)
                    {
                        alert("Error: " + request.responseText);
                    }
                }
            }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}