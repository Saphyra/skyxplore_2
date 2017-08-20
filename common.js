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

function rand(min, max)
//A két megadott érték közti számot dob ki
{
    try
    {
        if(typeof min != typeof 1 || typeof max != typeof 1) return NaN;
        var num = Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
    finally
    {
        return num;
    }
}

function getrule(ruleName)
{
    ruleName = ruleName.toLowerCase();
    var styleSheet;
    var i, ii;
    var cssRule = false;
    var cssRules;
    if(document.styleSheets)
    {
        for(i = 0; i < document.styleSheets.length; i++)
        {
            styleSheet = document.styleSheets[i];
            if(!styleSheet.href)
            {
                if(styleSheet.cssRules)
                {
                    cssRules = styleSheet.cssRules;
                }
                else
                {
                    cssRules = styleSheet.rules;
                }
                if(cssRules)
                {
                    for(ii = 0; ii < cssRules.length; ii++)
                    {
                        cssRule = cssRules[ii];
                        if(cssRule)
                        {
                            if(cssRule.selectorText)
                            {
                                console.log(cssRule.selectorText);
                                if(cssRule.selectorText.toLowerCase() == ruleName)
                                {
                                    return cssRule;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

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