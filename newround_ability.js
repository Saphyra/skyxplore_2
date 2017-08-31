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
                if(attackers && shipStatus < 90 && !character.ability.emfa1.reload) activeArr.push("emfa1");
                if(attackers && shipStatus < 80 && !character.ability.emfa2.reload) activeArr.push("emfa2");
            break;
            case "pdm":
                if(!gameinfo.temp.globalAbilities[character.alliance].pdma1.actualactive && !character.ability.pdma1.reload) activeArr.push("pdma1");
                if(shipStatus > 50 && !character.ability.pdma2.reload) activeArr.push("pdma2");
            break;
            case "idf":
                if(attackers && !character.ability.idfa1.reload) activeArr.push("idfa1");
                if(character.control.target && !character.ability.idfa2.reload) activeArr.push("idfa2");
            break;
            case "mfa":
                if(!gameinfo.temp.globalAbilities[character.alliance].mfaa1.actualactive && !character.ability.mfaa1.reload) activeArr.push("mfaa1");
                
                var enemySquadrons = 0;
                for(var x in gameinfo.characters)
                {
                    var targetCharacter = gameinfo.characters[x];
                    if(targetCharacter.alliance != character.alliance && targetCharacter.type == "squadron" && targetCharacter.place == "space") enemySquadrons = 1;
                }
                
                if(enemySquadrons && !character.ability.mfaa2.reload) activeArr.push("mfaa2");
            break;
            case "gaa":
                if(character.control.target && shieldStatus < 70 && !character.ability.gaaa1.reload) activeArr.push("gaaa1");
                if(hasActiveAbilities(character.control.target) && !character.ability.gaaa2.reload) activeArr.push("gaaa2");
            break;
            case "cri":
                if(!character.ability.cria1.reload) activeArr.push("cria1");
                if(character.control.target && !character.ability.cria2.reload) activeArr.push("cria2");
            break;
        }
        
        if(attackers && shipStatus < 50 && !character.extras.edi01.reload) activeArr.push("edi01"); //Elektronikus zavaróimpulzus
        if(attackers && shipStatus < 70 && !character.extras.efi01.reload) activeArr.push("efi01"); //Energiamező
        if(hullStatus < 70) activeArr.push("rep"); //Javító robot
        if(energyStatus < 70 && !character.extras.bol01.reload) activeArr.push("bol01"); //Akkumulátor túltöltés
        if(attackers && !character.extras.mac01.reload) activeArr.push("mac01"); //Mágneses köd
        if(attackerSquadrons && !character.extras.ser01.reload) activeArr.push("ser01"); //Rajzavaró elektronsugár
        if(attackers && !character.extras.mdl01.reload) activeArr.push("mdl01"); //Rakétaelhárító lézer
        if(character.control.target && !character.extras.pdu01.reload) activeArr.push("pdu01"); //Plazma Zavaró Egység
        if(attackers && shieldStatus < 70 && !character.extras.sre01.reload) activeArr.push("sre01"); //Pajzsregeneráció Növelés
        if(!character.extras.clo01.reload && !character.extras.clo01.reload) activeArr.push("clo01") //Álcázó berendezés
        if(negativeEffects(character) && !character.extras.abs01.reload) activeArr.push("abs01"); //Rendszertisztítás
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
            {
                
            };
            
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
    
    function negativeEffects(characters)
    //Igaz, ha a hajót negatív képesség éri
    {
        try
        {
            var negativeObj = 
            {
                
            };
            
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
{
    try
    {
        
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

    function searchLowestCharacter(character)
    {
        try
        {
            var lowestStatus = 100;
            var lowestId = null;
            for(var x in gameinfo.characters)
            {
                var lowestCharacter = gameinfo.characters[x];
                if(lowestCharacter.alliance = character.alliance && lowestCharacter.place == "space" && lowestCharacter.type == "ship")
                {
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