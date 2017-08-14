function quickbarsetupset()
{
    try
    {
        for(var num = 1; num <= 5; num++)
        {
            var name = chardata.characterdata.quickbar[num].name;
            if(name == "") name = "Nincs beállítva";
            
            document.getElementById("quickbarset" + num).innerHTML = num + " - " + name;
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function quickbarsetupchoose(type)
    {
        try
        {
            var container = document.getElementById("quickbarsetupchoosecontainer");
                container.innerHTML = "";
                switch(type)
                {
                    case "weapontypes":
                        document.getElementById("quickbarsetupmenutitle").innerHTML = "Fegyverek";
                        var weaponarr =
                        [
                            {name: "Ágyú", control: "cannonammo"},
                            {name: "Pulzuságyú", control: "pulseammo"},
                            {name: "Rakétakilövő", control: "rocketlauncherammo"},
                            {name: "SAB Rakétakilövő", control: "sablauncherammo"},
                            {name: "Gépágyú", control: "rifleammo"},
                            {name: "Raj Ágyú", control: "squadroncannonammo"},
                            {name: "Raj Pulzuságyú", control: "squadronpulseammo"},
                            {name: "Raj Gépágyú", control: "squadronrifleammo"},
                        ]
                        
                        for(var x in weaponarr)
                        {
                            container.appendChild(quickbarsetupweapon(weaponarr[x]));
                        }
                    break;
                    default:
                        alert("Ismeretlen");
                    break;                   
                }
            document.getElementById("quickbarsetupchoose").style.display = "block";
            document.getElementById("quickbarsetupchooseexit").onclick = function(){document.getElementById("quickbarsetupchoose").style.display = "none";};
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
        
        function quickbarsetupweapon(weapon)
        {
            try
            {
                var div = document.createElement("DIV");
                    div.className = "menubar";
                    var button = document.createElement("BUTTON");
                        button.innerHTML = weapon.name;
                        button.onclick = function(){quickbarsetupammos(weapon.control)};
                div.appendChild(button);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return div;
            }
        }
        
            function quickbarsetupammos(control)
            {
                try
                {
                    var container = document.getElementById("quickbarsetupchoosecontainer");
                        container.innerHTML = "";
                        document.getElementById("quickbarsetupmenutitle").innerHTML = "Lőszerek";
                        
                        switch(control)
                        {
                            case "cannonammo":
                            case "squadroncannonammo":
                                var ammotype = "cannonball";
                            break;
                            case "pulseammo":
                            case "squadronpulseammo":
                                var ammotype = "ioncell";
                            break;
                            case "rocketlauncherammo":
                                var ammotype = "rocket";
                            break;
                            case "sabblauncherammo":
                                var ammotype = "sabrocket";
                            break;
                            case "rifleammo":
                            case "squadronrifleammo":
                                var ammotype = "bullet";
                            break;
                        }
                        
                        var ammos = gamedata.search({type: "ammo", itemtype: ammotype});
                        
                        for(var x in ammos)
                        {
                            container.appendChild(quickbarsetupammo(ammos[x], control));
                        }
                        
                    document.getElementById("quickbarsetupchoose").style.display = "block";
                    document.getElementById("quickbarsetupchooseexit").onclick = function(){quickbarsetupchoose("weapontypes");};
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
                
                function quickbarsetupammo(ammoid, control)
                {
                    try
                    {
                        var div = document.createElement("DIV");
                            div.className = "menubar";
                            var button = document.createElement("BUTTON");
                                button.innerHTML = gamedata.items[ammoid].name  
                                button.onclick = function(){quickbarassign(ammoid, control)};
                        div.appendChild(button);
                    }
                    catch(err)
                    {
                        alert(arguments.callee.name + err.name + ": " + err.message);
                    }
                    finally
                    {
                        return div;
                    }
                }
                
                    function quickbarassign(ammoid, control)
                    {
                        try
                        {
                            alert(control + " setted to " + ammoid + "at quickbar " + gameinfo.activebar);
                        }
                        catch(err)
                        {
                            alert(arguments.callee.name + err.name + ": " + err.message);
                        }
                    }
                
function quickbarload()
{
    try
    {
        var quickbarcontainer = document.getElementById("choosecontainer");
            quickbarcontainer.appendChild(ammosbarcreate());
            
            var abilitybar, equipmentbar;
            if(abilitybar = abilitybarcreate()) quickbarcontainer.appendChild(abilitybar);
            if(equipmentbar = equipmentbarcreate()) quickbarcontainer.appendChild(equipmentbar);
            
            for(var x = 1; x <= 5; x++)
            {
                quickbarcontainer.appendChild(quickbarcreate(x));
            }
        
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function quickbarcontrol(type, target)
{
    try
    {
        if(type == "key")
        {
            switch(target.which)
            {
                case 48:
                    switch(gameinfo.quickbarsession)
                    {
                        case "idle":
                        case "weapontypes":
                            type = "toggle";
                            target = "weapontypes";
                        break;
                        case "ammochoose":
                            type = "toggle";
                            target = gameinfo.openedbar;
                        break;
                    }
                break;
                case 81:
                    switch(gameinfo.quickbarsession)
                    {
                        case "idle":
                        case "abilitytypes":
                            type = "toggle";
                            target = "abilitytypes";
                        break;
                    }
                break;
                case 87:
                    switch(gameinfo.quickbarsession)
                    {
                        case "idle":
                        case "equipmenttypes":
                            type = "toggle";
                            target = "equipmenttypes";
                        break;
                    }
                break;
                case 27:
                    var container = document.getElementById("settingscontainer");
                    if(container.style.display == "block")
                    {
                        container.style.display = "none";
                        document.getElementById("quickbarsetup").style.display = "none";
                        document.getElementById("quickbaractionchoose").style.display = "none";
                        document.getElementById("quickbarsetupchoose").style.display = "none";
                    }
                    else
                    {
                        container.style.display = "block";
                    }
                break;
                default:
                    if(target.which >= 49 && target.which <= 53)
                    {
                        quickbaruse(target.which - 48);
                    }
                break;
            }
        }
        
        switch(type)
        {
            case "toggle":
                if(target == "weapontypes")
                {
                    if(gameinfo.quickbarsession == "idle" || gameinfo.quickbarsession == "weapontypes" || gameinfo.quickbarsession == "ammochoose")
                    {
                        var weapontypes = document.getElementById("weapontypes");
                        if(weapontypes.style.display == "block")
                        {
                            if(gameinfo.openedbar) quickbarcontrol("toggle", gameinfo.openedbar);
                            weapontypes.style.display = "none";
                            gameinfo.quickbarsession = "idle";
                            document.getElementById("ammochoosebutton").style.borderColor = "white";
                        }
                        else if(weapontypes.style.display == "none")
                        {
                            weapontypes.style.display = "block";
                            gameinfo.quickbarsession = "weapontypes";
                            document.getElementById("ammochoosebutton").style.borderColor = "red";
                        }
                    }
                }
                else if(target == "abilitytypes")
                {
                    if(gameinfo.quickbarsession == "idle" || gameinfo.quickbarsession == "abilitytypes")
                    {
                        var abilitytypes = document.getElementById("abilitytypes");
                        if(!abilitytypes) return;
                        if(abilitytypes.style.display == "block")
                        {
                            abilitytypes.style.display = "none";
                            gameinfo.quickbarsession = "idle";
                            document.getElementById("abilitytypesbutton").style.borderColor = "white";
                        }
                        else if(abilitytypes.style.display == "none")
                        {
                            abilitytypes.style.display = "block";
                            gameinfo.quickbarsession = "abilitytypes";
                            document.getElementById("abilitytypesbutton").style.borderColor = "red";
                        }
                    }
                    
                }
                else if(target == "equipmenttypes")
                {
                    if(gameinfo.quickbarsession == "idle" || gameinfo.quickbarsession == "equipmenttypes")
                    {
                        var equipmenttypes = document.getElementById("equipmenttypes");
                        if(!equipmenttypes) return;
                        if(equipmenttypes.style.display == "block")
                        {
                            equipmenttypes.style.display = "none";
                            gameinfo.quickbarsession = "idle";
                            document.getElementById("equipmenttypesbutton").style.borderColor = "white";
                        }
                        else if(equipmenttypes.style.display == "none")
                        {
                            equipmenttypes.style.display = "block";
                            gameinfo.quickbarsession = "equipmenttypes";
                            document.getElementById("equipmenttypesbutton").style.borderColor = "red";
                        }
                    }
                    
                }
                else
                {
                    var ammotypes = document.getElementById("ammotypes" + target);
                    if(ammotypes.style.display == "block")
                    {
                        ammotypes.style.display = "none";
                        gameinfo.quickbarsession = "weapontypes";
                        document.getElementById(target + "button").style.borderColor = "white";
                        gameinfo.openedbar = null;
                        
                    }
                    else if(ammotypes.style.display == "none")
                    {
                        if(gameinfo.openedbar) quickbarcontrol("toggle", gameinfo.openedbar);
                        ammotypes.style.display = "block";
                        gameinfo.quickbarsession = "ammochoose";
                        document.getElementById(target + "button").style.borderColor = "red";
                        gameinfo.openedbar = target;
                    }
                }
            break;
        }
        
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function ammosbarcreate()
    {
        try
        {
            var div = document.createElement("DIV");
                div.id = "ammochoose";
                div.className = "choose";
                var button = document.createElement("BUTTON");
                    button.style.width = "auto";
                    button.innerHTML = "0 - Lőszer";
                    button.className = "quickbarbutton";
                    button.id = "ammochoosebutton";
                    button.onclick = function(){quickbarcontrol("toggle", "weapontypes");};
            div.appendChild(button);
                    
                
                    var weapontypesdiv = document.createElement("DIV");
                        weapontypesdiv.className = "weapontypes";
                        weapontypesdiv.id = "weapontypes";
                        weapontypesdiv.style.display = "none";
                    
                        var weapontypes = weapontypeset();
                        var num = 1;
                        for(var weapontype in weapontypes)
                        {
                            weapontypesdiv.appendChild(weaponbarcreate(weapontype, num));
                            num++;
                        }
                        
                        var closediv = document.createElement("DIV");
                            closediv.className = "weapontype";
                            var closebutton = document.createElement("BUTTON");
                                closebutton.className = "quickbarbutton";
                                closebutton.innerHTML = "0 - Bezár";
                                closebutton.onclick = function(){quickbarcontrol("toggle", "weapontypes");};
                        closediv.appendChild(closebutton);
                    weapontypesdiv.appendChild(closediv);
            div.appendChild(weapontypesdiv);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
        function weapontypeset()
        {
            try
            {
                var charid = sessionStorage.charid;
                var charequip = gameinfo.characters[charid].equipment;
                var weapontypes = {};
                
                if(charequip.cannon)
                {
                    for(var x in charequip.cannon)
                    {
                        weapontypes[gamedata.items[charequip.cannon[x].itemid].itemtype] = 1;
                    }
                }
                
                if(charequip.rocketlauncher)
                {
                    for(var x in charequip.rocketlauncher)
                    {
                        weapontypes[gamedata.items[charequip.rocketlauncher[x].itemid].itemtype] = 1;
                    }
                }
                
                if(charequip.rifle) weapontypes.rifle = 1;
                
                
                
                var characters = [];
                for(var x in chardata.squadrons)
                {
                    characters.push(x);
                }
                
                
                for(var x in characters)
                {
                    var charid = characters[x];
                    
                    var charequip = gameinfo.characters[charid].equipment;
                    if(charequip.squadronweapon)
                    {
                        for(var x in charequip.squadronweapon)
                        {
                            weapontypes[gamedata.items[charequip.squadronweapon[x].itemid].itemtype] = 1;
                        }
                    }
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return weapontypes;
            }
        }
        
        function weaponbarcreate(weapontype, num)
        {
            try
            {
                var weaponobj = 
                {
                    cannon: {name: "Ágyú", ammos: ["cab01", "cab02", "cab03"]},
                    pulse: {name: "Pulzuságyú", ammos: ["ioc01", "ioc02", "ioc03"]},
                    rocketlauncher: {name: "Rakétakilövő", ammos: ["roc01", "roc02", "roc03"]},
                    sablauncher: {name: "SAB Rakétakilövő", ammos: ["sro01", "sro02", "sro03"]},
                    rifle: {name: "Gépágyú", ammos: ["bul01", "bul02", "bul03"]},
                    squadroncannon: {name: "Raj Ágyú", ammos: ["cab01", "cab02", "cab03"]},
                    squadronpulse: {name: "Raj Pulzuságyú", ammos: ["ioc01", "ioc02", "ioc03"]},
                    squadronrifle: {name: "Raj Gépágyú", ammos: ["bul01", "bul02", "bul03"]},
                };
                
                var weapondata = weaponobj[weapontype];
                
                var div = document.createElement("DIV");
                    div.id = "weapontype" + weapontype;
                    div.className = "weapontype";
                    var button = document.createElement("BUTTON");
                        button.className = "quickbarbutton";
                        button.innerHTML = num + " - " + weapondata.name;
                        button.id = weapontype + "button";
                        button.onclick = function(){quickbarcontrol("toggle", weapontype);};
                div.appendChild(button);
                    
                        var ammotypes = document.createElement("DIV");
                            ammotypes.className = "ammotypes";
                            ammotypes.id = "ammotypes" + weapontype;
                            ammotypes.style.display = "none";
                            
                            var num = 1;
                            for(var x = 0; x < weapondata.ammos.length; x++)
                            {
                                var ammo = weapondata.ammos[x];
                                if(gameinfo.characters[sessionStorage.charid].ammo[ammo])
                                {
                                    if(gameinfo.characters[sessionStorage.charid].ammo[ammo].amount)
                                    {
                                        ammotypes.appendChild(ammobarcreate(ammo, num, weapontype));
                                        num++;
                                    }
                                }
                            }
                    div.appendChild(ammotypes);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return div;
            }
        }
        
            function ammobarcreate(ammo, num, weapontype)
            {
                try
                {
                    var amount = gameinfo.characters[sessionStorage.charid].ammo[ammo].amount;
                    var div = document.createElement("DIV");
                        div.className = "ammotype";
                        var button = document.createElement("BUTTON");
                            button.id = weapontype + ammo;
                            button.className = "quickbarbutton";
                            button.innerHTML = num + " - " + ammo.toUpperCase() + " (" + amount + ")";
                            button.onclick = function(){ammochange(ammo, weapontype);};
                    div.appendChild(button);
                        
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return div;
                }
            }
            
                function ammochange(ammo, weapontype)
                {
                    try
                    {
                        var weaponobj = 
                        {
                            cannon: "cannonammo",
                            pulse: "pulseammo",
                            rocketlauncher: "rocketlauncherammo",
                            sablauncher: "sablauncherammo",
                            rifle: "rifleammo",
                            squadroncannon: "squadroncannonammo",
                            squadronpulse: "squadronpulseammo",
                            squadronrifle: "squadronrifleammo",
                        }
                        
                        switch(weapontype)
                        {
                            case "cannon":
                            case "pulse":
                            case "rocketlauncher":
                            case "sablauncher":
                            case "rifle":
                                gameinfo.characters[sessionStorage.charid].control[weaponobj[weapontype]] = ammo;
                                gameinfo.temp.playerammos[weapontype] = ammo;
                            break;
                            case "squadroncannon":
                            case "squadronpulse":
                            case "squadronrifle":
                                gameinfo.temp.playerammos[weapontype] = ammo;
                                for(var x in gameinfo.characters)
                                {
                                    if(gameinfo.characters[x].owner == sessionStorage.charid)
                                    {
                                        gameinfo.characters[x].control[weaponobj[weapontype]] = ammo;
                                    }
                                }
                            break;
                        }
                        quickbarcontrol("toggle", "weapontypes");
                        ammobarborderset();
                    }
                    catch(err)
                    {
                        alert(arguments.callee.name + err.name + ": " + err.message);
                    }
                }
                
                    function ammobarborderset()
                    {
                        try
                        {
                            var nodes = document.getElementsByClassName("quickbarbutton");
                            for(var x in nodes)
                            {
                                nodes[x].className = "quickbarbutton";
                            }
                            for(var x in gameinfo.temp.playerammos)
                            {
                                if(gameinfo.temp.playerammos[x])
                                {
                                    document.getElementById(x + gameinfo.temp.playerammos[x]).className = "quickbarbutton selectedammo";
                                }
                            }
                        }
                        catch(err)
                        {
                            alert(arguments.callee.name + err.name + ": " + err.message);
                        }
                    }
                
    function abilitybarcreate()
    {
        try
        {
            var abilities = gameinfo.characters[sessionStorage.charid].ability;
            var company = gameinfo.characters[sessionStorage.charid].ship.company;
            
            var dispabilities = []
            for(var x in abilities)
            {
                if(abilities[x].owner == company && abilities[x].level) dispabilities.push(abilities[x]);
            }
            
            if(!dispabilities.length) return null;
            
            var div = document.createElement("DIV");
                div.id = "abilitychoose";
                div.className = "choose";
                var button = document.createElement("BUTTON");
                    button.style.width = "auto";
                    button.innerHTML = "Q - Képesség";
                    button.className = "quickbarbutton";
                    button.onclick = function(){quickbarcontrol("toggle", "abilitytypes");};
                    button.id = "abilitytypesbutton";
            div.appendChild(button);
                var abilitytypesdiv = document.createElement("DIV");
                    abilitytypesdiv.className = "weapontypes";
                    abilitytypesdiv.id = "abilitytypes";
                    abilitytypesdiv.style.display = "none";
                       
            var num = 1;
            for(var x in dispabilities)
            {
                abilitytypesdiv.appendChild(abilitytypescreate(dispabilities[x], num));
                num++;
            }
            
            div.appendChild(abilitytypesdiv)
            
                    var closediv = document.createElement("DIV");
                        closediv.className = "weapontype";
                        var closebutton = document.createElement("BUTTON");
                            closebutton.className = "quickbarbutton";
                            closebutton.innerHTML = "Q - Bezár";
                            closebutton.onclick = function(){quickbarcontrol("toggle", "abilitytypes");};
                    closediv.appendChild(closebutton);
                abilitytypesdiv.appendChild(closediv);
            div.appendChild(abilitytypesdiv);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
        function abilitytypescreate(ability, num)
        {
            try
            {
                var div = document.createElement("DIV");
                    div.className = "weapontype";
                    var button = document.createElement("BUTTON");
                        button.className = "quickbarbutton";
                        button.innerHTML = num + " - " + gamedata.abilities[ability.itemid].name;
                        button.onclick = function(){};
                div.appendChild(button);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return div;
            }
        }
        
    function equipmentbarcreate()
    {
        try
        {
            var equipments = gameinfo.characters[sessionStorage.charid].extras;
            
            var dispequipments = []
            for(var x in equipments)
            {
                if(equipments[x].equipped == 1)
                {
                    dispequipments.push(equipments[x]);
                }
            }
            
            if(!dispequipments.length) return null;
            
            var div = document.createElement("DIV");
                div.id = "equipmentchoose";
                div.className = "choose";
                var button = document.createElement("BUTTON");
                    button.style.width = "auto";
                    button.innerHTML = "W - Felszerelés";
                    button.className = "quickbarbutton";
                    button.onclick = function(){quickbarcontrol("toggle", "equipmenttypes");};
                    button.id = "equipmenttypesbutton";
            div.appendChild(button);
                var equipmenttypesdiv = document.createElement("DIV");
                    equipmenttypesdiv.className = "weapontypes";
                    equipmenttypesdiv.id = "equipmenttypes";
                    equipmenttypesdiv.style.display = "none";
                       
            var num = 1;
            for(var x in dispequipments)
            {
                equipmenttypesdiv.appendChild(equipmenttypescreate(dispequipments[x], num));
                num++;
            }
            
            div.appendChild(equipmenttypesdiv)
            
                    var closediv = document.createElement("DIV");
                        closediv.className = "weapontype";
                        var closebutton = document.createElement("BUTTON");
                            closebutton.className = "quickbarbutton";
                            closebutton.innerHTML = "W - Bezár";
                            closebutton.onclick = function(){quickbarcontrol("toggle", "equipmenttypes");};
                    closediv.appendChild(closebutton);
                equipmenttypesdiv.appendChild(closediv);
            div.appendChild(equipmenttypesdiv);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
        function equipmenttypescreate(equipment, num)
        {
            try
            {
                var div = document.createElement("DIV");
                    div.className = "weapontype";
                    var button = document.createElement("BUTTON");
                        button.className = "quickbarbutton";
                        button.innerHTML = num + " - " + gamedata.items[equipment.itemid].name;
                        button.onclick = function(){};
                div.appendChild(button);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return div;
            }
        }
        
    function quickbarcreate(num)
    {
        try
        {
            var div = document.createElement("DIV");
                div.className = "choose";
                var button = document.createElement("BUTTON");
                    button.style.width = "auto";
                    button.innerHTML = num + " - QUICKBAR";
                    button.className = "quickbarbutton";
                    button.onclick = function(){quickbaruse(num)};
            div.appendChild(button);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
    function quickbaruse(barid)
    {
        try
        {
            alert(barid);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }