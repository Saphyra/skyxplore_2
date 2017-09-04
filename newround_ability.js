function specialActive(character)
//Képességek használati idejének csökkentése
{
    try
    {
        for(var x in character.extras)
        {
            if(character.extras[x].actualactive) character.extras[x].actualactive--;
        }
        for(var x in character.ability)
        {
            if(character.ability[x].actualactive) character.ability[x].actualactive--;
        }
        
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function activateSet(character)
//Használandó képességek sorba állítása
{
    try
    {
        var corehullStatus = character.ship.actualcorehull / character.ship.corehull * 100;
        
        var hullStatus = 0;
        if(character.equipment.hull)
        {
            var hullenergy = 0;
            var actualhull = 0;
            for(var x in character.equipment.hull)
            {
                hullenergy += character.equipment.hull[x].hullenergy;
                actualhull += character.equipment.hull[x].actualhull;
            }
            hullStatus = actualhull / hullenergy * 100;
        }
        
        var shieldStatus = 0;
        if(character.equipment.shield)
        {
            var shieldenergy = 0;
            var actualshield = 0;
            for(var x in character.equipment.shield)
            {
                shieldenergy += character.equipment.shield[x].shieldenergy;
                actualshield += character.equipment.shield[x].actualshield;
            }
            shieldStatus = actualshield / shieldenergy * 100;
        }
        
        var energyStatus = gameinfo.temp.energy[character.charid].percent;
        
        var attackers = 0;
        var attackerSquadrons = 0;
        var attackerShips = 0;
        for(var x in gameinfo.characters)
        {
            if(gameinfo.characters[x].control.target == character.charid)
            {
                attackers++;
                (gameinfo.characters[x].type == "ship") ? attackerShips++ : attackerSquadrons++;
            }
        }
        
        var shipStatus = (corehullStatus + hullStatus + shieldStatus) / 3 / (attackers + 1);
        
        var activeArr = gameinfo.temp.activeExtra[character.charid];
        switch(character.ship.company)
        {
            case "emf":
                var squadrons = [];
                for(var x in gameinfo.characters)
                {
                    if(gameinfo.characters[x].owner == character.charid && gameinfo.characters[x].place == "space") squadrons.push(x);
                }
                if(attackers && shipStatus < 90 && squadrons.length && !character.ability.emfa1.actualreload && character.ability.emfa1.level && !character.ability.emfa2.actualactive && !character.extras.edi01.actualactive) activeArr.push("emfa1");
                if(attackers && shipStatus < 80 && !character.ability.emfa2.actualreload && character.ability.emfa2.level && character.ability.emfa1.actualactive && activeArr.indexOf("emfa1") < 0  && !character.extras.edi01.actualactive && !character.ability.emfa1.actualactive) activeArr.push("emfa2");
            break;
            case "pdm":
                if(!gameinfo.temp.globalAbilities[character.alliance].pdma1.actualactive && !character.ability.pdma1.actualreload  && character.ability.pdma1.level) activeArr.push("pdma1");
                if(shipStatus > 50 && !character.ability.pdma2.actualreload && character.ability.pdma2.level) activeArr.push("pdma2");
            break;
            case "idf":
                if(attackers && !character.ability.idfa1.actualreload && character.ability.idfa1.level && !character.extras.edi01.actualactive) activeArr.push("idfa1");
                if(character.control.target && !character.ability.idfa2.actualreload && character.ability.idfa2.level) activeArr.push("idfa2");
            break;
            case "mfa":
                if(!gameinfo.temp.globalAbilities[character.alliance].mfaa1.actualactive && !character.ability.mfaa1.actualreload && character.ability.mfaa1.level) activeArr.push("mfaa1");
                
                var enemySquadrons = 0;
                for(var x in gameinfo.characters)
                {
                    var targetCharacter = gameinfo.characters[x];
                    if(targetCharacter.alliance != character.alliance && targetCharacter.type == "squadron" && targetCharacter.place == "space") enemySquadrons = 1;
                }
                
                if(enemySquadrons && !character.ability.mfaa2.actualreload && character.ability.mfaa2.level && character.equipment.rifle) activeArr.push("mfaa2");
            break;
            case "gaa":
                if(character.control.target && shieldStatus < 70 && !character.ability.gaaa1.actualreload && character.ability.gaaa1.level) activeArr.push("gaaa1");
                if(hasActiveAbilities(character.control.target) && !character.ability.gaaa2.actualreload && character.ability.gaaa2.level) activeArr.push("gaaa2");
            break;
            case "cri":
                if(!character.ability.cria1.actualreload && character.ability.cria1.level && energyStatus < 80) activeArr.push("cria1");
                if(character.control.target && !character.ability.cria2.actualreload && character.ability.cria2.level) activeArr.push("cria2");
            break;
        }
        
        if(attackers && shipStatus < 50 && !character.extras.edi01.actualreload) activeArr.push("edi01"); //Elektronikus zavaróimpulzus
        if(attackers && shipStatus < 70 && !character.extras.efi01.actualreload) activeArr.push("efi01"); //Energiamező
        if(hullStatus < 70) activeArr.push("rep"); //Javító robot
        if(energyStatus < 70 && !character.extras.bol01.actualreload && character.equipment.battery) activeArr.push("bol01"); //Akkumulátor túltöltés
        if(attackers && !character.extras.mac01.actualreload) activeArr.push("mac01"); //Mágneses köd
        if(attackerSquadrons && !character.extras.ser01.actualreload && !character.extras.efi01.actualactive) activeArr.push("ser01"); //Rajzavaró elektronsugár
        if(attackers && !character.extras.mdl01.actualreload) activeArr.push("mdl01"); //Rakétaelhárító lézer
        if(character.control.target && !character.extras.pdu01.actualreload) activeArr.push("pdu01"); //Plazma Zavaró Egység
        if(attackers && shieldStatus < 70 && !character.extras.sre01.actualreload) activeArr.push("sre01"); //Pajzsregeneráció Növelés
        if(!character.extras.clo01.actualreload && !character.extras.clo01.actualreload) activeArr.push("clo01") //Álcázó berendezés
        if(negativeEffects(character) && !character.extras.abs01.actualreload && activeArr.length) activeArr.push("abs01"); //Rendszertisztítás
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}
    
    function hasActiveAbilities(targetid)
    //Igaz, ha a célpontnak aktív valamely blokkolandó képessége
    {
        try
        {
            if(!targetid) return null;
            
           var blockableObj = 
           [
                {itemid: "emfa1", type: "ability"},
                {itemid: "emfa2", type: "ability"},
                {itemid: "pdma2", type: "ability"},
                {itemid: "idfa1", type: "ability"},
                {itemid: "idfa2", type: "ability"},
                {itemid: "gaaa1", type: "ability"},
                {itemid: "mfaa2", type: "ability"},
                {itemid: "cria1", type: "ability"},
                {itemid: "cria2", type: "ability"},
                {itemid: "efi01", type: "extras"},
                {itemid: "edi01", type: "extras"},
                {itemid: "abs01", type: "extras"},
                {itemid: "sre01", type: "extras"},
                {itemid: "clo01", type: "extras"},
                {itemid: "bol01", type: "extras"},
                {itemid: "mac01", type: "extras"},
                {itemid: "ser01", type: "extras"},
                {itemid: "rep01", type: "extras"},
                {itemid: "rep02", type: "extras"},
                {itemid: "rep03", type: "extras"},
            ];
            
            var targetCharacter = gameinfo.characters[targetid];
            for(var x in blockableObj)
            {
                var blockable = blockableObj[x];
                if(targetCharacter[blockable.type][blockable.itemid].actualactive) return true;
            }
            
            return false;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function negativeEffects(character)
    //Igaz, ha a hajót negatív képesség éri
    {
        try
        {
            var negativeObj = 
            [
                {itemid: "gaaa2", type: "ability"},
                {itemid: "cria2", type: "ability"},
                {itemid: "pdu01", type: "extras"},
                {itemid: "mdl01", type: "extras"},
            ]
            
            for(var x in negativeObj)
            {
                var negative = negativeObj[x];
                if(character[negative.type][negative.itemid].actualactive) return true;
            }
            
            return false;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }

function activateSpecial(character)
//Aktiválja a kiválasztott felszereléseket
{
    try
    {
        var activeArr = gameinfo.temp.activeExtra[character.charid];
        
        for(var x in activeArr)
        {
            var itemid = activeArr[x];
            
            if(character.ability.gaaa2.actualactive && itemid != "abs01") continue;
            
            if(itemid == "rep")
            {
                for(var y = 1; y <= 3; y++)
                {
                    if(character.extras["rep0" + y].equipped) var specialData = character.extras["rep0" + y];
                }
                if(specialData == undefined) continue;
            }
            else
            {
                var specialData = character.extras[itemid];
                if(specialData == undefined) specialData = character.ability[itemid];
            }
            
            if(specialData == undefined) alert(itemid);
            
            var batteryIndex = batteryIndexChoose(character, specialData.energyusage)
            if(batteryIndex == null) continue;
            
            if(itemid == "emfa1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "emfa2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "pdma1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                gameinfo.temp.globalAbilities[character.alliance][itemid].actualactive = specialData.active;
                gameinfo.temp.globalAbilities[character.alliance][itemid].value = specialData.value;
                gameinfo.temp.globalAbilities[character.alliance][itemid].owner = character.charid;
            }
            else if(itemid == "pdma2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                var targetId = searchLowestCharacter(character);
                if(!targetId) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                gameinfo.characters[targetId].ability.pdma2.actualactive = specialData.active;
                gameinfo.characters[targetId].ability.pdma2.reflect = character.charid;
            }
            else if(itemid == "idfa1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "idfa2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "gaaa1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "gaaa2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                if(!gameinfo.characters[character.control.target]) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                
                disableAbilities(character.control.target, specialData.active);
            }
            else if(itemid == "mfaa1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                gameinfo.temp.globalAbilities[character.alliance][itemid].actualactive = specialData.active;
                gameinfo.temp.globalAbilities[character.alliance][itemid].value = specialData.value;
                gameinfo.temp.globalAbilities[character.alliance][itemid].owner = character.charid;
            }
            else if(itemid == "mfaa2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "cria1")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "cria2")
            {
                if(!specialData.level) continue;
                if(specialData.actualreload) continue;
                if(!gameinfo.characters[character.control.target]) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                
                specialData.actualreload = specialData.reload;
                gameinfo.characters[character.control.target].ability.cria2.actualactive = specialData.active;
            }
            else if(itemid == "efi01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "pdu01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                if(!gameinfo.characters[character.control.target]) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                gameinfo.characters[character.control.target].extras.pdu01.actualactive = specialData.active;
            }
            else if(itemid == "edi01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
                
                targetIdUnset(character.charid);
            }
            else if(itemid == "abs01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
                
                cleanSystems(character);
            }
            else if(itemid == "sre01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "clo01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "bol01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "mac01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "ser01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "mdl01")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
            }
            else if(itemid == "rep01" || itemid == "rep02" || itemid == "rep03")
            {
                if(specialData.actualreload) continue;
                if(!character.ammo[specialData.ammotype] || character.ammo[specialData.ammotype].amount < specialData.ammousage) continue;
                
                energyUse(character, specialData.energyusage, batteryIndex);
                character.ammo[specialData.ammotype].amount -= specialData.ammousage;
                
                specialData.actualreload = specialData.reload;
                specialData.actualactive = specialData.active;
                
                var heal = specialData.level / 10;
                
                if(character.equipment.hull)
                {
                    for(var x in character.equipment.hull)
                    {
                        var hull = character.equipment.hull[x];
                        
                        hull.actualhull += hull.hullenergy * heal;
                        if(hull.actualhull > hull.hullenergy) hull.actualhull = hull.hullenergy;
                    }
                }
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}
    
    function searchLowestCharacter(character)
    //Megkeresi a leginkább sérült szövetségest
    {
        try
        {
            var lowestStatus = 100;
            var lowestId = null;
            for(var x in gameinfo.characters)
            {
                var lowestCharacter = gameinfo.characters[x];
                if(lowestCharacter.charid == character.charid) continue;
                if(lowestCharacter.alliance == character.alliance && lowestCharacter.place == "space" && lowestCharacter.type == "ship")
                {
                    if(lowestCharacter.ability.pdma2.actualactive) continue;
                    if(lowestCharacter.ability.gaaa2.actualactive) continue;
                    
                    var lowestCorehullStatus = lowestCharacter.ship.actualcorehull / lowestCharacter.ship.corehull * 100;
                    var lowestHullStatus = 0;
                    var lowestShieldStatus = 0;
                    var lowestAttackers = 0;
                    
                    
                    if(lowestCharacter.equipment.hull)
                    {
                        var lowestHullenergy = 0;
                        var lowestActualhull = 0;
                        for(var y in lowestCharacter.equipment.hull)
                        {
                            lowestHullenergy += lowestCharacter.equipment.hull[y].hullenergy;
                            lowestActualhull += lowestCharacter.equipment.hull[y].actualhull;
                        }
                        lowestHullStatus = lowestActualhull / lowestHullenergy * 100;
                    }
                    
                    if(lowestCharacter.equipment.shield)
                    {
                        var lowestShieldenergy = 0;
                        var lowestActualshield = 0;
                        for(var y in lowestCharacter.equipment.shield)
                        {
                            lowestShieldenergy += lowestCharacter.equipment.shield[y].shieldenergy;
                            lowestActualshield += lowestCharacter.equipment.shield[y].actualshield;
                        }
                        lowestShieldStatus = lowestActualshield / lowestShieldenergy * 100;
                    }
                    
                    for(var y in gameinfo.characters)
                    {
                        if(gameinfo.characters[y].control.target == lowestCharacter.charid) lowestAttackers++;
                    }
                    
                    var lStatus = (lowestCorehullStatus + lowestHullStatus + lowestShieldStatus) / 3 / (lowestAttackers + 1);
                    
                    if(lowestAttackers && lStatus < lowestStatus)
                    {
                        lowestStatus = lStatus;
                        lowestId = lowestCharacter.charid;
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
            return lowestId;
        }
    }
    
    function disableAbilities(targetId, active)
    {
        try
        {
            var character = gameinfo.characters[targetId];
            character.ability.gaaa2.actualactive = active;
            var blockable = ["emfa1", "emfa2", "pdma1", "pdma2", "idfa1", "idfa2", "gaaa1", "mfaa1", "mfaa2", "cria1", "efi01", "edi01", "abs01", "sre01", "clo01", "bol01", "mac01", "ser01", "rep01", "rep02", "rep03"];
            
            for(var x in gameinfo.temp.globalAbilities[character.alliance])
            {
                var ability = gameinfo.temp.globalAbilities[character.alliance][x];
                
                if(blockable.indexOf(x) > -1 && ability.owner == targetId) ability.actualactive = 0;
            }
            
            for(var x in character.extras)
            {
                if(blockable.indexOf(character.extras[x].itemid) > -1) character.extras[x].actualactive = 0;
            }
            
            for(var x in character.ability)
            {
                if(blockable.indexOf(character.ability[x].itemid) > -1) character.ability[x].actualactive = 0;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function cleanSystems(character)
    {
        try
        {
            var negativeObj = 
            [
                {itemid: "gaaa2", type: "ability"},
                {itemid: "cria2", type: "ability"},
                {itemid: "pdu01", type: "extras"},
                {itemid: "mdl01", type: "extras"},
            ];
            
            for(var x in negativeObj)
            {
                var negative = negativeObj[x];
                character[negative.type][negative.itemid].actualactive = 0;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
function specialCoolDown(character)
//Képességek újratöltési idejének csökkentése
{
    try
    {
        for(var x in character.extras)
        {
            if(character.extras[x].actualreload) character.extras[x].actualreload--;
        }
        for(var x in character.ability)
        {
            if(character.ability[x].actualreload) character.ability[x].actualreload--;
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}