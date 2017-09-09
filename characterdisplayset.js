function characterdisplayset(charid)
//Megjeleníti az adott karakter értékeit
{
    try
    {
        var character = gameinfo.characters[charid];
        if(character.place == "dead")
        {
            document.getElementById(charid).style.display = "none";
            return;
        }
        
        if(character.alliance == "enemy" && character.type == "ship") document.getElementById(charid).addEventListener("click", function(){playerTarget(charid);});
        
        
        cdscorehullset(character);
        cdshullset(character);
        cdsshieldset(character);
        chdenergyset(character);
        
        if(character.type == "ship") ammoStorageSet(character);
        
        if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
        {
            cdsammoset(character);
            if(character.charid == sessionStorage.charid)
            {
                cdscargoset(character);
            }
        }
        
        cdsammouseset(character);
        cdstargetset(character);
        if(character.type == "ship") cdseffectsset(character);
        else cdsSquadronEffectsSet(character);
        
        var playerSquadrons = [], squadronTargeted = 0;
        for(var x in gameinfo.characters) if(gameinfo.characters[x].type == "squadron" && gameinfo.characters[x].owner == sessionStorage.charid) playerSquadrons.push(x);
        for(var x in playerSquadrons) if(gameinfo.characters[playerSquadrons[x]].control.target == charid) squadronTargeted = 1;
        
        if(squadronTargeted) document.getElementById(charid).className = "botdiv squadrontargeted";
        
        if(character.type == "squadron" && character.place != "space" && character.place != "dead") document.getElementById(charid).className = "botdiv inhangar";
        
        if(character.type == "squadron" && character.control.callbackcount)
        {
            document.getElementById("callback" + character.charid).innerHTML = "Visszatér: " + (character.control.callbackcount);
        }
        else if(character.type == "squadron" && character.place != "space" && character.place != "dead")
        {
            document.getElementById("callback" + character.charid).innerHTML = "Hangárban";
        }
        else if(character.type == "squadron")
        {
            document.getElementById("callback" + character.charid).innerHTML = "";
        }
        
        if(gameinfo.characters[sessionStorage.charid].control.targettry == charid)
        {
            document.getElementById(charid).className = "botdiv targeted";
        }
        if(gameinfo.characters[sessionStorage.charid].control.target == charid)
        {
            document.getElementById(charid).className = "botdiv locked";
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function cdscorehullset(character)
    //Magburkolat beállítása
    {
        try
        {
            var container = document.getElementById("corehullbar" + character.charid);

            var corehull = character.ship.corehull;
            var actualcorehull = character.ship.actualcorehull;
            var corehullrate = Math.round(actualcorehull / corehull * 100);
            
            if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
            {
                container.innerHTML = actualcorehull + " / " + corehull;
            }
            else container.innerHTML = corehullrate + "%";
            
            container.style.backgroundSize = corehullrate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdshullset(character)
    {
        try
        {
            var container = document.getElementById("hullbar" + character.charid);

            var hullenergy = 0, actualhull = 0;
            
            if(character.type == "ship") var hulltype = "hull";
            else var hulltype = "squadronhull";
            
            if(character.equipment[hulltype])
            {
                for(var x in character.equipment[hulltype])
                {
                    var hull = character.equipment[hulltype][x];
                    
                    hullenergy += hull.hullenergy;
                    actualhull += hull.actualhull;
                }
            }

            if(hullenergy) var hullrate = Math.round(actualhull / hullenergy * 100);
            else var hullrate = 0;
            
            if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
            {
                container.innerHTML = actualhull + " / " + hullenergy;
            }
            else container.innerHTML = hullrate + "%";
            
            container.style.backgroundSize = hullrate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdsshieldset(character)
    {
        try
        {
            var container = document.getElementById("shieldbar" + character.charid);

            var shieldenergy = 0, actualshield = 0;
            
            if(character.type == "ship") var shieldtype = "shield";
            else var shieldtype = "squadronshield";
            
            if(character.equipment[shieldtype])
            {
                for(var x in character.equipment[shieldtype])
                {
                    var shield = character.equipment[shieldtype][x];
                    
                    shieldenergy += shield.shieldenergy;
                    actualshield += shield.actualshield;
                }
            }
            
            if(shieldenergy) var shieldrate = Math.round(actualshield / shieldenergy * 100);
            else var shieldrate = 0;
            
            if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
            {
                container.innerHTML = actualshield + " / " + shieldenergy;
            }
            else container.innerHTML = shieldrate + "%";
            
            container.style.backgroundSize = shieldrate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function chdenergyset(character)
    {
        try
        {
            var container = document.getElementById("energybar" + character.charid);

            var capacity = 0, actualcapacity = 0;
            
            if(character.equipment.battery)
            {
                for(var x in character.equipment.battery)
                {
                    var battery = character.equipment.battery[x];
                    
                    capacity += battery.capacity;
                    actualcapacity += battery.actualcapacity;
                }
            }
            
            if(capacity) var energyrate = Math.round(actualcapacity / capacity * 100);
            else var energyrate = 0;
            
            if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
            {
                container.innerHTML = actualcapacity + " / " + capacity;
            }
            else container.innerHTML = energyrate + "%";
            
            container.style.backgroundSize = energyrate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdsammoset(character)
    {
        try
        {
            var container = document.getElementById("ammobar" + character.charid);
            
            
            var ammostorage = character.ship.ammostorage;
            var actualammostorage = character.ship.actualammostorage;
            var ammorate = Math.round(actualammostorage / ammostorage * 100);
            
            container.innerHTML = actualammostorage + " / " + ammostorage;
            
            container.style.backgroundSize = ammorate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdscargoset(character)
    {
        try
        {
            var container = document.getElementById("cargobar" + character.charid);
            
            
            var cargo = character.ship.cargo;
            var actualcargo = character.ship.actualcargo;
            var cargorate = Math.round(actualcargo / cargo * 100);
            
            container.innerHTML = actualcargo + " / " + cargo;
            
            container.style.backgroundSize = cargorate + "% 100%";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdsammouseset(character)
    {
        try
        {
            var container = document.getElementById("ammos" + character.charid);
                container.innerHTML = "";
            var control = character.control;
            
            switch(character.type)
            {
                case "ship":
                    var cannonequipped, pulseequipped, rocketlauncherequipped, sablauncherequipped;
                
                    for(var x in character.equipment.cannon)
                    {
                        switch(character.equipment.cannon[x].itemtype)
                        {
                            case "cannon":
                                cannonequipped = 1;
                            break;
                            case "pulse":
                                pulseequipped = 1;
                            break;
                        }
                    }
                    
                    for(var x in character.equipment.rocketlauncher)
                    {
                        switch(character.equipment.rocketlauncher[x].itemtype)
                        {
                            case "rocketlauncher":
                                rocketlauncherequipped = 1;
                            break;
                            case "sablauncher":
                                sablauncherequipped = 1;
                            break;
                        }
                    }
                    
                    if(control.cannonammo && cannonequipped) container.appendChild(document.createTextNode(control.cannonammo.toUpperCase() + " "));
                    if(control.pulseammo && pulseequipped) container.appendChild(document.createTextNode(control.pulseammo.toUpperCase() + " "));
                    if(control.rocketlauncherammo && rocketlauncherequipped) container.appendChild(document.createTextNode(control.rocketlauncherammo.toUpperCase() + " "));
                    if(control.sablauncherammo && sablauncherequipped) container.appendChild(document.createTextNode(control.sablauncherammo.toUpperCase() + " "));
                    if(control.rifleammo && character.equipment.rifle) container.appendChild(document.createTextNode(control.rifleammo.toUpperCase()));
                break;
                case "squadron":
                    var squadroncannonequipped, squadronrifleequipped, squadronpulseequipped;
                    
                    for(var x in character.equipment.squadronweapon)
                    {
                        switch(character.equipment.squadronweapon[x].itemtype)
                        {
                            case "squadroncannon":
                                squadroncannonequipped = 1;
                            break;
                            case "squadronpulse":
                                squadronpulseequipped = 1;
                            break;
                            case "squadronrifle":
                                squadronrifleequipped = 1;
                            break;
                        }
                    }
                    
                    
                    if(control.squadroncannonammo && squadroncannonequipped) container.appendChild(document.createTextNode(control.squadroncannonammo.toUpperCase() + " "));
                    if(control.squadronpulseammo && squadronpulseequipped) container.appendChild(document.createTextNode(control.squadronpulseammo.toUpperCase() + " "));
                    if(control.squadronrifleammo && squadronrifleequipped) container.appendChild(document.createTextNode(control.squadronrifleammo.toUpperCase() + " "));
                break;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdstargetset(character)
    {
        try
        {
            var container = document.getElementById("target" + character.charid);
            
            if(character.control.target)
            {
                container.innerHTML = gameinfo.characters[character.control.target].charname;
            }
            else container.innerHTML = "";
            
            if(character.control.target == sessionStorage.charid) document.getElementById(character.charid).className = "botdiv playerlocked";
            else if(character.charid != sessionStorage.charid) document.getElementById(character.charid).className = "botdiv";
            
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdseffectsset(character)
    {
        try
        {
            var container = document.getElementById("effects" + character.charid);
            
            container.innerHTML = "";
            
            for(var x in gameinfo.temp.globalAbilities[character.alliance])
            {
                var ability = gameinfo.temp.globalAbilities[character.alliance][x]
                if(x != "mfaa1" && ability.actualactive && !character.ability.gaaa2.actualactive)
                {
                    if(container.innerHTML != "") container.innerHTML += ", ";
                        container.innerHTML += x.toUpperCase() + " (" + ability.actualactive + ")";
                }
            }
            
            for(var x in character.extras)
            {
                var extra = character.extras[x];
                    
                    if(extra.actualactive)
                    {
                        if(container.innerHTML != "") container.innerHTML += ", ";
                        container.innerHTML += extra.itemid.toUpperCase() + " (" + extra.actualactive + ")";
                    }
            }
            
            for(var x in character.ability)
            {
                var ability = character.ability[x];
                if(ability.actualactive)
                {
                    if(container.innerHTML != "") container.innerHTML += ", ";
                    container.innerHTML += ability.itemid.toUpperCase() + " (" + ability.actualactive + ")";
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cdsSquadronEffectsSet(character)
    {
        try
        {
            var container = document.getElementById("effects" + character.charid);
            
            container.innerHTML = "";
            
            for(var x in gameinfo.temp.globalAbilities[character.alliance])
            {
                var ability = gameinfo.temp.globalAbilities[character.alliance][x]
                if(x == "mfaa1" && ability.actualactive)
                {
                    if(container.innerHTML != "") container.innerHTML += ", ";
                        container.innerHTML += x.toUpperCase() + " (" + ability.actualactive + ")";
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function playerTarget(targetid)
    {
        try
        {
            var container = document.getElementById("enemyship");
                var child = container.childNodes;
                for(var x in child)
                {
                    if(child[x].className == "botdiv locked" || child[x].className == "botdiv targeted")
                    {
                        if(gameinfo.characters[child[x].id].control.target == sessionStorage.charid)
                        {
                            child[x].className = "botdiv playerlocked";
                        }
                        else child[x].className = "botdiv";
                    }
                }
            
            if(gameinfo.characters[sessionStorage.charid].control.target != targetid)
            {
                gameinfo.characters[sessionStorage.charid].control.target = null;
                gameinfo.characters[sessionStorage.charid].control.targettry = targetid;
            }
            characterdisplayset(targetid);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function ammoStorageSet(character)
    //Frissíti a hajó lőszerraktár értékét
    {
        try
        {
            character.ship.actualammostorage = 0;
            if(character.ammo)
            {
                for(var x in character.ammo)
                {
                    character.ship.actualammostorage += character.ammo[x].amount;
                }
            }
            
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    

function specialBarCreate()
{
    try
    //Elkészíti a játékos által elérhető képességek és felszerelések gombját
    {
        var equipments = gameinfo.characters[sessionStorage.charid].extras;
        var abilities = gameinfo.characters[sessionStorage.charid].ability;
        var container = document.getElementById("usablestatus");
        
        
        for(var x in abilities)
        {
            if(abilities[x].level && abilities[x].owner == gameinfo.characters[sessionStorage.charid].ship.company && abilities[x].itemtype != "passive")
            {
                container.appendChild(specialBar(abilities[x]));
            }
        }
        
        for(var x in equipments)
        {
            if(equipments[x].equipped) container.appendChild(specialBar(equipments[x]));
        }
        
        specialBarDisplay();
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function specialBar(special)
    //Létrehozza a gombot
    {
        try
        {
            var div = document.createElement("DIV");
                div.className = "footerbutton";
                div.id = "special" + special.itemid;
                div.appendChild(document.createTextNode(special.itemid.toUpperCase()));
                var span = document.createElement("SPAN");
                    span.id = "specialspan" + special.itemid;
                    span.style.color = "red";
            div.appendChild(span);
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
    
    function specialBarDisplay()
    //Kijelzi a játékos által elérhető képességeket és felszereléseket
    {
        try
        {
            var container = document.getElementById("usablestatus");
            var nodes = container.childNodes;
            
            var ids = [];
            for(var x = 0; x < nodes.length; x++) ids.push(nodes[x].id);
            
            var specialData = [];
            for(var x in ids)
            {
                specialData.push(isUsable(ids[x].slice(7)));
            }
            
            specialData.sort(function(a, b){return a.status - b.status});
            
            for(var x in specialData)
            {
                var data = specialData[x];
                var node = document.getElementById("special" + data.id);
                container.insertBefore(node, container.childNodes[x]);
                
                nodeDisplaySet(node, data);
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function isUsable(itemid)
        {
            try
            {
                var character = gameinfo.characters[sessionStorage.charid];
                var itemdata = character.extras[itemid];
                var usable = 0;
                if(character.ability.gaaa2.actualactive) usable = 0.5;
                else if(itemdata)
                {
                    if(itemdata.actualreload) usable = 1;
                    if(batteryIndexChoose(character, itemdata.energyusage) == null) usable = 2;
                    if(!character.ammo[itemdata.ammotype] || character.ammo[itemdata.ammotype].amount < itemdata.ammousage) usable = 3;
                    if(itemdata.actualactive) usable = -1;
                }
                else
                {
                    var itemdata = character.ability[itemid];
                    if(itemdata.actualreload) usable = 1;
                    if(batteryIndexChoose(character, itemdata.energyusage) == null) usable = 2;
                    if(itemdata.actualactive)
                    {
                        usable = -1;
                        
                        if(itemdata.itemid == "cria2" || itemdata.itemid == "pdu01" || itemdata.itemid == "mdl01") usable = 0;
                    }
                }
                
                var status = {id: itemid, status: usable, itemdata: itemdata};
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return status;
            }
        }
        
        function nodeDisplaySet(node, data)
        {
            try
            {
                var span = document.getElementById("specialspan" + data.id);
                switch(data.status)
                {
                    case -1:
                        span.innerHTML = " Aktív: " + data.itemdata.actualactive;
                        node.style.borderColor = "purple";
                    break;
                    case 0:
                        node.style.borderColor = "#00ff00";
                        node.onclick = function(){itemUse(data.id);};
                        span.innerHTML = "";
                    break;
                    case 0.5:
                        node.style.borderColor = "black";
                        span.innerHTML = "Blokkolva - " + gameinfo.characters[sessionStorage.charid].ability.gaaa2.actualactive;
                    break;
                    case 1:
                        span.innerHTML = " Tölt: " + data.itemdata.actualreload;
                        node.style.borderColor = "black";
                    break;
                    case 2:
                        span.innerHTML = " Nincs elég energia.";
                        node.style.borderColor = "black";
                    break;
                    case 3:
                        span.innerHTML = " Nincs elég lőszer";
                        node.style.borderColor = "black";
                    break;
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function itemUse(itemid)
            {
                try
                {
                    gameinfo.temp.activeExtra[sessionStorage.charid].push(itemid);
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
function enemyOrderSet()
//Előre teszi azokat az ellenségeket, akik a hajót célozzák
{
    try
    {
        for(var x in gameinfo.characters)
        {
            var character = gameinfo.characters[x];
            
            if(character.alliance == "enemy" && character.control.target == sessionStorage.charid)
            {
                var container = (character.type == "ship") ? document.getElementById("enemyship") : document.getElementById("enemysquadron");
                var node = document.getElementById(character.charid);
                
                container.insertBefore(node, container.childNodes[0]);
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}