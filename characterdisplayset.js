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
        
        if(character.charid == sessionStorage.charid || character.owner == sessionStorage.charid)
        {
            cdsammoset(character);
            if(character.charid == sessionStorage.charid)
            {
                cdscargoset(character);
                ammobarborderset();
            }
        }
        
        cdstargetset(character);
        if(character.type == "ship") cdseffectsset(character);
        
        
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
    
    function cdstargetset(character)
    {
        try
        {
            var container = document.getElementById("target" + character.charid);
            
            if(character.control.target)
            {
                container.innerHTML = gameinfo.characters[character.control.target].charname;
                
                if(character.control.target == sessionStorage.charid) document.getElementById(character.charid).className = "botdiv playerlocked";
                else if(character.charid != sessionStorage.charid) document.getElementById(character.charid).className = "botdiv";
            }
            else container.innerHTML = "";
            
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