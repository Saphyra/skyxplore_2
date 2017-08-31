function quickBarControl(type, data)
//Adott eseményre megfelelő utasítást hajt végre
{
    try
    {
        switch(type)
        {
            case "key":
                switch(data)
                {
                    case 27:
                    //Főmenü nyitása / zárása
                        toggleMenu();
                    break;
                    case 48:
                    case 96:
                    //Autoplay indítás / leállítás
                        (gameinfo.autoPlay) ? autoPlay("stop") : autoPlay("start");
                    break;
                    case 49:
                    case 97:
                    //Lőszerlista megnyitása
                        (gameinfo.temp.activebar == "ammo") ? closeBar() : ammoBarLoad();
                    break;
                    case 50:
                    case 98:
                    //Képesség lista megnyitása
                        (gameinfo.temp.activebar == "ability") ? closeBar() : abilityBarLoad();
                    break;
                    case 51:
                    case 99:
                    //felszereléslista megnyitása
                        (gameinfo.temp.activebar == "equipment")? closeBar() : equipmentBarLoad();
                    break;
                    default:
                        //alert(data);
                    break;
                }
            break;
            default:
                alert(type);
            break;
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function toggleMenu()
    //zárja/nyitja a főmenüt
    {
        try
        {
            var container = document.getElementById("settingscontainer");
            if(container.style.display == "block")
            {
                document.getElementById("settingscontainer").style.display = "none";
            }
            else
            {
                document.getElementById("settingscontainer").style.display = "block";
                autoPlay("stop");
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function ammoBarLoad()
    //Lőszerlista betöltése
    {
        try
        {
            gameinfo.temp.activebar = "ammo";
            var container = document.getElementById("barload");
                container.innerHTML = "";
                
                for(var x = 1; x < 4; x++)
                {
                    container.appendChild(ammoBarCreate(x));
                }
                
                var closebutton = document.createElement("DIV");
                    closebutton.className = "footerbutton";
                    closebutton.innerHTML = "X";
                    closebutton.addEventListener("click", function(){container.innerHTML = ""});
            container.appendChild(closebutton);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function ammoBarCreate(level)
        //Lőszerlista készítése
        {
            try
            {
                var amount = 0;
                var ammos = gameinfo.characters[sessionStorage.charid].ammo;
                for(var x in ammos)
                {
                    if(ammos[x].itemtype != "specialammo" && ammos[x].level == level) amount += ammos[x].amount
                }
                
                
                var div = document.createElement("DIV");
                    div.className = "footerbutton";
                    div.innerHTML = "Szint: " + level;
                    var span = document.createElement("SPAN");
                        span.innerHTML = " - (" + amount + ")";
                div.appendChild(span);
                    div.addEventListener("click", function(){gameinfo.temp.playerammolevel = level; closeBar();});
                    if(gameinfo.temp.playerammolevel == level) div.style.borderColor = "purple";
                 
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
        
    function abilityBarLoad()
    {
        try
        {
            gameinfo.temp.activebar = "ability";
            var container = document.getElementById("barload");
                container.innerHTML = "";
            var abilities = gameinfo.characters[sessionStorage.charid].ability;
            
            var count = 0;
            for(var x in abilities)
            {
                if(abilities[x].level && abilities[x].owner == gameinfo.characters[sessionStorage.charid].ship.company && abilities[x].itemtype != "passive")
                {
                    container.appendChild(abilityBarCreate(abilities[x]));
                    count++;
                }
            }
            
            if(!count)
            {
                var noability = document.createElement("DIV");
                    noability.className = "footerbutton";
                    noability.innerHTML = "Nincs elérhető képesség";
                container.appendChild(noability);
                
                setTimeout(function(){if(gameinfo.temp.activebar == "ability") closeBar();}, 2000);
            }
            
            var closebutton = document.createElement("DIV");
                    closebutton.className = "footerbutton";
                    closebutton.innerHTML = "X";
                    closebutton.addEventListener("click", function(){container.innerHTML = ""});
            container.appendChild(closebutton);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function abilityBarCreate(ability)
        {
            try
            {
                var div = document.createElement("DIV");
                    div.className = "footerbutton";
                    div.innerHTML = ability.name;
                    var span = document.createElement("SPAN");
                        span.style.color = "red";
                        var status = isUsable(ability.itemid).status;
                        switch(status)
                        {
                            case -1:
                                span.innerHTML = " Aktív: " + ability.actualactive;
                                div.style.borderColor = "purple";
                            break;
                            case 0:
                                div.style.borderColor = "#00ff00";
                                div.addEventListener("click", function(){itemUse(ability.itemid); closeBar()});
                                span.innerHTML = " (Energiahasználat: " + ability.energyusage + ")";
                            break;
                            case 1:
                                span.innerHTML = " Tölt: " + ability.reload;
                                div.style.borderColor = "black";
                            break;
                            case 2:
                                span.innerHTML = " Nincs elég energia.";
                                div.style.borderColor = "black";
                            break;
                            case 3:
                                span.innerHTML = " Nincs elég lőszer";
                                div.style.borderColor = "black";
                            break;
                        }
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
        
    function equipmentBarLoad()
    {
        try
        {
            gameinfo.temp.activebar = "equipment";
            var container = document.getElementById("barload");
                container.innerHTML = "";
            var equipments = gameinfo.characters[sessionStorage.charid].extras;
            var count = 0;
            for(var x in equipments)
            {
                if(equipments[x].equipped)
                {
                    count++;
                    container.appendChild(equipmentBarCreate(equipments[x]));
                }
            }
            
            if(!count)
            {
                var noability = document.createElement("DIV");
                    noability.className = "footerbutton";
                    noability.innerHTML = "Nincs elérhető felszerelés";
                container.appendChild(noability);
                
                setTimeout(function(){if(gameinfo.temp.activebar == "equipment") closeBar();}, 2000);
            }
            
            var closebutton = document.createElement("DIV");
                    closebutton.className = "footerbutton";
                    closebutton.innerHTML = "X";
                    closebutton.addEventListener("click", function(){container.innerHTML = ""});
            container.appendChild(closebutton);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
        
        function equipmentBarCreate(equipment)
        {
            try
            {
                var div = document.createElement("DIV");
                    div.className = "footerbutton";
                    div.innerHTML = equipment.name;
                    var span = document.createElement("SPAN");
                        span.style.color = "red";
                        var status = isUsable(equipment.itemid).status;
                        switch(status)
                        {
                            case -1:
                                span.innerHTML = " Aktív: " + equipment.actualactive;
                                div.style.borderColor = "purple";
                            break;
                            case 0:
                                div.style.borderColor = "#00ff00";
                                div.addEventListener("click", function(){itemUse(equipment.itemid); closeBar()});
                                span.innerHTML = " (Energiahasználat: " + equipment.energyusage + " - Használható: " + Math.floor(gameinfo.characters[sessionStorage.charid].ammo[equipment.ammotype].amount / equipment.ammousage) + ")";
                            break;
                            case 1:
                                span.innerHTML = " Tölt: " + equipment.reload;
                                div.style.borderColor = "black";
                            break;
                            case 2:
                                span.innerHTML = " Nincs elég energia.";
                                div.style.borderColor = "black";
                            break;
                            case 3:
                                span.innerHTML = " Nincs elég lőszer";
                                div.style.borderColor = "black";
                            break;
                        }
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
        
    function closeBar()
    //Bezárja a megnyitott mezőt
    {
        try
        {
            gameinfo.temp.activebar = null; 
            document.getElementById("barload").innerHTML = "";
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }