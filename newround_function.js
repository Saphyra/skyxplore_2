function genEnergySet(character)
//Generátorok működése
{
    try
    {
        var generators = character.equipment.generator;
        for(var x in generators)
        {
            if(character.ability.cria2.actualactive) break;
            character.control.genenergy += generators[x].energyregen;
        }
        
        if(character.extras.bol01.actualactive && character.equipment.battery)
        {
            for(var x in character.equipment.battery)
            {
                character.control.genenergy += character.equipment.battery[x].maxrecharge;
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function energySet(character)
//Hajó energiaállapota
{
    try
    {
        var energy = {percent: 0, batterys: []};
        var batterys = character.equipment.battery;
        
        if(batterys)
        {
            var capacity = 0;
            var actualcapacity = 0;
            for(var x in batterys)
            {
                var battery = batterys[x];
                energy.batterys.push({index: x, actualcapacity: battery.actualcapacity});
                capacity += battery.capacity;
                actualcapacity += battery.actualcapacity;
            }
            
            energy.percent = Math.round(actualcapacity / capacity * 100);
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
    finally
    {
        gameinfo.temp.energy[character.charid] = energy;
    }
}

function targetCharacter(character)
//Célpontválasztás és jelölés
{
    try
    {
        var control = character.control;
        
        if(!control.target && !control.targettry && character.charid != sessionStorage.charid)
        {
            var targets = [];
            var targetsSelf = [];
            for(var x in gameinfo.characters)
            {
                var possibleTarget = gameinfo.characters[x];
                
                if(possibleTarget.type == "ship" && possibleTarget.alliance != character.alliance && possibleTarget.place == "space")
                {
                    targets.push(possibleTarget.charid);
                    if(possibleTarget.control.target == character.charid) targetsSelf.push(possibleTarget.charid);
                }
            }
            
            if(targetsSelf.length)
            {
                control.targettry = targetsSelf[rand(0, targetsSelf.length - 1)];
            }
            else if(targets.length)
            {
                control.targettry = targets[rand(0, targets.length - 1)];
            }
        }
        
        if(control.targettry)
        {
            if(gameinfo.characters[control.targettry].extras.edi01.actualactive) return;
            var attackValue = rand(0, 2000);
            if(character.ship.company == "gaa" && character.ability.gaap.level) attackValue += rand(0, character.ability.gaap.value);
            if(character.extras.clo01.actualactive) attackValue += rand(0, 500);
            if(gameinfo.characters[control.targettry].extras.clo01.actualactive) attackValue -= rand(0, 500);
            
            if(attackValue > 1200)
            {
                control.target = control.targettry;
                control.targettry = null;
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function attack(character)
//támadás
{
    try
    {
        if(!attackCheck(character)) return;
        if(!Object.keys(character.ammo).length) return;
        if(character.ability.emfa2.actualactive || gameinfo.characters[character.control.target].ability.emfa2.actualactive) return;
        ammosSet(character);
        
        if(character.equipment.cannon)
        {
            for(var x in character.equipment.cannon)
            {
                shot(character, character.equipment.cannon[x]);
            }
        }
        
        if(character.equipment.rocketlauncher)
        {
            for(var x in character.equipment.rocketlauncher)
            {
                shot(character, character.equipment.rocketlauncher[x]);
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function attackCheck(character)
    //Botok támadása - alacsony energiával nem támad
    {
        try
        {
            if(character.charid == sessionStorage.charid) return 1;
            
            if(character.equipment.generator && character.equipment.battery && gameinfo.temp.energy[character.charid].percent < 70 && character.control.dmgreceived > 1 && character.control.lastattack)
            {
                return 0;
            }
            else return 1;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function shot(character, weapon)
    //Lövés, lőszer kiválasztása, energialevonás, lőszer levonása
    {
        try
        {
            if(character.control.target == null) return;
            
            switch(weapon.itemtype)
            {
                case "cannon":
                    var ammocontrol = "cannonammo";
                break;
                case "pulse":
                    var ammocontrol = "pulseammo";
                break;
                case "rocketlauncher":
                    var ammocontrol = "rocketlauncherammo";
                break;
                case "sablauncher":
                    var ammocontrol = "sablauncherammo";
                break;
            }
            
            if(character.control[ammocontrol])
            {
                var ammo = character.ammo[character.control[ammocontrol]];
                if(ammo)
                {
                    var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                    var batteryIndex = batteryIndexChoose(character, energyUsage);
                }
                
                while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                {
                    character.control[ammocontrol] = ammoChange(character.control[ammocontrol]);
                    
                    var ammo = character.ammo[character.control[ammocontrol]];
                    if(ammo)
                    {
                        var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                        batteryIndex = batteryIndexChoose(character, energyUsage);
                    }
                    if(character.control[ammocontrol] == null) break;
                }
            }
            
            var reload = weapon.reload;
            if(weapon.slot == "rocketlauncher" && character.ship.company == "idf" && character.ability.idfa2.actualactive)
            {
                reload -= character.ability.idfa2.value;
            }
            var shot = rand(1, reload) - 1;
            if(ammo && !shot)
            {
                energyUse(character, energyUsage, batteryIndex);
                ammo.amount -= weapon.ammousage;
                
                var accuracy = weapon.accuracy;
                
                if(character.extras.pdu01.actualactive)
                {
                    accuracy -= 250;
                }
                if(weapon.slot == "rocketlauncher" && character.extras.mdl01.actualactive)
                {
                    accuracy -= 250;
                }
                
                if(hitSet(accuracy))
                {
                    damage(character, weapon, ammo, "ship");
                }
                
                character.control.lastattack = 1;
			}
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function ammosSet(character, weapon)
        //Kiválasztja az energiaszintnek megfelelő lőszert
        {
            try
            {
                var energyPercent = gameinfo.temp.energy[character.charid].percent;
                
                ammoTypes = 
                {
                    cannon: {ammoType: "cannonball", control: "cannonammo"},
                    pulse: {ammoType: "ioncell", control: "pulseammo"},
                    rocketlauncher: {ammoType: "rocket", control: "rocketlauncherammo"},
                    sablauncher: {ammoType: "sabrocket", control: "sablauncherammo"},
                    rifle: {ammoType: "bullet", control: "rifleammo"},
                };
                
                if(energyPercent < 50) var level = 1;
                else if(energyPercent < 75) var level = 2;
                else var level = 3;
                
                if(character.charid == sessionStorage.charid) level = gameinfo.temp.playerammolevel;
                
                for(var x in ammoTypes)
                {
                    var ammoType = ammoTypes[x];
                    
                    character.control[ammoType.control] = gamedata.search({type: "ammo", itemtype: ammoType.ammoType, level: level});
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function batteryIndexChoose(character, energyUsage)
        //Kiválasztja a használandó akkut / energiatartalékot
        {
            try
            {
				if(character.control.genenergy && character.control.genenergy >= energyUsage) return -1;
                var batterys = gameinfo.temp.energy[character.charid].batterys;
                
                batterys.sort(function(a, b){return a.actualcapacity - b.actualcapacity;});
                
                for(var x in batterys)
                {
                    if(batterys[x].actualcapacity >= energyUsage) return batterys[x].index;
                }
                
                return null;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function ammoChange(ammoid)
        //csökkenti a lőszer szintjét
        {
            try
            {
                var ammodata = gamedata.items[ammoid];
                
                return gamedata.search({type: "ammo", itemtype: ammodata.itemtype, level: ammodata.level - 1});
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function energyUse(character, energyUsage, batteryIndex)
        //energia felhasználása
        {
            try
            {
                if(character.type == "ship" && character.ability.cria1.actualactive)
                {
                    var value = character.ability.cria1.value;
                    energyUsage *= 1 - value / 100;
                }
                energyUsage = Math.round(energyUsage);
                if(batteryIndex == -1) character.control.genenergy -= energyUsage;
                else character.equipment.battery[batteryIndex].actualcapacity -= energyUsage;
                energySet(character);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function hitSet(accuracy)
        //találati esély kiszámolása
        {
            try
            {
                if(rand(0, 1000) < accuracy) return 1;
                else return 0;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function damage(character, weapon, ammo, targetType, strikeBackTarget)
        //sebzést okoz a célpontnak
        {
            try
            {
                var mfaa1Multi = 1;
                if(character.type == "squadron" && targetType != "damageAllSquadrons")
                {
                    var alliance = (character.alliance == "friend") ? "enemy" : "friend";
                    if(gameinfo.temp.globalAbilities[alliance].mfaa1.actualactive)
                    {
                        var value = gameinfo.temp.globalAbilities[alliance].mfaa1.value;
                        mfaa1Multi = 1 - value / 100;
                    }
                }
                
                switch(targetType)
                {
                    case "ship":
                        var dmgMultiplicator = rand(80, 120) / 100;
                        var shieldDamage = weapon.shielddamage * dmgMultiplicator * mfaa1Multi;
                        var hullDamage = weapon.hulldamage * dmgMultiplicator * mfaa1Multi;
                        
                        var targetCharacter = gameinfo.characters[character.control.target];
                        targetCharacter.control.dmgreceived = 0;
                        
                        if(targetCharacter.extras.efi01.actualactive) return;
                        if(targetCharacter.extras.mac01.actualactive)
                        {
                            if(rand(0, 1000) < 250) return;
                        }
                        
                        if(targetCharacter.ship.company == "emf" && targetCharacter.ability.emfa1.actualactive)
                        {
                            var squadrons = [];
                            for(var x in gameinfo.characters)
                            {
                                if(gameinfo.characters[x].owner == targetCharacter.charid && gameinfo.characters[x].place == "space") squadrons.push(x);
                            }
                            
                            if(squadrons.length)
                            {
                                var value = targetCharacter.ability.emfa1.value;
                                squadronSplashDamage(targetCharacter, squadrons, (shieldDamage + hullDamage) / 2);
                                shieldDamage *= 1 - value / 100;
                                hullDamage *= 1 - value /  100;
                            }
                        }
                        
                        if(targetCharacter.ability.pdma2.actualactive)
                        {
                            var reflect = targetCharacter.ability.pdma2.reflect;
                            if(gameinfo.characters[reflect].place == "space")
                            {
                                var value = gameinfo.characters[reflect].ability.pdma2.value;
                                damage(gameinfo.characters[reflect], (shieldDamage + hullDamage) / 2, undefined, "directship");
                                
                                shieldDamage *= 1 - value / 100;
                                hullDamage *= 1 - value / 100;
                            }
                            else
                            {
                                targetCharacter.ability.pdma2.actualactive = 0;
                            }
                        }
                        
                        if(targetCharacter.ship.company == "idf" && targetCharacter.ability.idfa1.actualactive)
                        {
                            var value = targetCharacter.ability.idfa1.value;
                            
                            shieldDamage *= 1 - value / 100;
                            hullDamage *= 1 - value / 100;
                        }
                        
                        var shieldDamageCopy = shieldDamage;
                        var hullDamageCopy = hullDamage;
                        
                        if(character.ship.company == "gaa" && character.ability.gaaa1.actualactive)
                        {
                            gaaa1Recharge(character, character.ability.gaaa1.value, (hullDamageCopy + shieldDamageCopy) / 2);
                        }
                            
                        if(targetCharacter.equipment.shield)
                        {
                            var shieldIndex = rand(0, targetCharacter.equipment.shield.length - 1)
                            var shield = targetCharacter.equipment.shield[shieldIndex];
                            
                            shield.actualshield -= shieldDamageCopy;
                            shield.actualshield = Math.round(shield.actualshield);
                            
                            if(shield.actualshield >= 0) return;
                            else
                            {
                                shieldDamageCopy += shield.actualshield;
                                shield.actualshield = 0;
                                
                                hullDamageCopy *= 1 - shieldDamageCopy  / shieldDamage;
                            }
                        }
                        
                        if(targetCharacter.equipment.hull)
                        {
                            var hullIndex = rand(0, targetCharacter.equipment.hull.length - 1);
                            var hull = targetCharacter.equipment.hull[hullIndex];
                            
                            hull.actualhull -= hullDamageCopy;
                            hull.actualhull = Math.round(hull.actualhull);
                            
                            if(hull.actualhull >= 0) return;
                            else
                            {
                                hullDamageCopy -= hullDamageCopy + hull.actualhull;
                                hull.actualhull = 0;
                            }
                        }
                        
                        targetCharacter.ship.actualcorehull -= hullDamageCopy;
                        targetCharacter.ship.actualcorehull = Math.round(targetCharacter.ship.actualcorehull);
                        
                        if(targetCharacter.ship.actualcorehull <= 0)
                        {
                            death(targetCharacter);
                        }
                    break;
                    case "squadron":
                        var dmgMultiplicator = rand(80, 120) / 100;
                        var damageRec = weapon.squadrondamage * dmgMultiplicator * mfaa1Multi;
                        
                        if(strikeBackTarget == undefined)
                        {
                            var targetCharacter = gameinfo.characters[character.control.target];
                        }
                        else
                        {
                            var targetCharacter = strikeBackTarget;
                        }
                        
                            targetCharacter.control.dmgreceived = 0;
                        
                        if(targetCharacter.equipment.squadronshield)
                        {
                            var shieldIndex = rand(0, targetCharacter.equipment.squadronshield.length - 1);
                            var shield = targetCharacter.equipment.squadronshield[shieldIndex];
                            
                            shield.actualshield -= damageRec;
                            shield.actualshield = Math.round(shield.actualshield);
                            
                            if(shield.actualshield >= 0) return;
                            else
                            {
                                damageRec = Math.abs(shield.actualshield);
                                shield.actualshield = 0;
                            }
                        }
                        
                        if(targetCharacter.equipment.squadronhull)
                        {
                            var hullIndex = rand(0, targetCharacter.equipment.squadronhull.length - 1);
                            var hull = targetCharacter.equipment.squadronhull[hullIndex];

                            hull.actualhull -= damageRec;
                            hull.actualhull = Math.round(hull.actualhull);
                            
                            if(hull.actualhull >= 0) return;
                            else
                            {
                                damageRec = Math.abs(hull.actualhull);
                                hull.actualhull = 0;
                            }
                        }
                        
                        targetCharacter.ship.actualcorehull -= damageRec;
                        targetCharacter.ship.actualcorehull = Math.round(targetCharacter.ship.actualcorehull);
                        
                        if(targetCharacter.ship.actualcorehull <= 0)
                        {
                            death(targetCharacter);
                        }
                    break;
                    case "direct":
                        var damageRec = weapon;
                        
                        character.control.dmgreceived = 0;
                        
                        if(character.equipment.squadronshield)
                        {
                            var shieldIndex = rand(0, character.equipment.squadronshield.length - 1);
                            var shield = character.equipment.squadronshield[shieldIndex];
                            
                            shield.actualshield -= damageRec;
                            shield.actualshield = Math.round(shield.actualshield);
                            
                            if(shield.actualshield >= 0) return;
                            else
                            {
                                damageRec = Math.abs(shield.actualshield);
                                shield.actualshield = 0;
                            }
                        }
                       
                        if(character.equipment.squadronhull)
                        {
                            var hullIndex = rand(0, character.equipment.squadronhull.length - 1);
                            var hull = character.equipment.squadronhull[hullIndex];
                            
                            hull.actualhull -= damageRec;
                            hull.actualhull = Math.round(hull.actualhull);
                            
                            if(hull.actualhull >= 0) return;
                            else
                            {
                                damageRec = Math.abs(hull.actualhull);
                                hull.actualhull = 0;
                            }
                        }
                        
                        character.ship.actualcorehull -= damageRec;
                        character.ship.actualcorehull = Math.round(character.ship.actualcorehull);
                        
                        if(character.ship.actualcorehull <= 0)
                        {
                            death(character);
                        }
                    break;
                    case "directship":
                        var damageRec = weapon;
                        
                        if(character.extras.efi01.actualactive) return;
                        
                        character.control.dmgreceived = 0;
                        if(character.equipment.shield)
                        {
                            var shieldIndex = rand(0, character.equipment.shield.length - 1);
                            var shield = character.equipment.shield[shieldIndex];
                            
                            shield.actualshield -= damageRec;
                            shield.actualshield = Math.round(shield.actualshield);
                            
                            if(shield.actualshield >= 0) return;
                            else
                            {
                                damageRec = Math.abs(shield.actualshield);
                                shield.actualshield = 0;
                            }
                        }
                        
                        if(character.equipment.hull)
                        {
                            var hullIndex = rand(0, character.equipment.hull.length - 1);
                            var hull = character.equipment.hull[hullIndex];
                            
                            hull.actualhull -= damageRec;
                            hull.actualhull = Math.round(hull.actualhull);
                            
                            if(hull.actualhull >= 0) return;
                            else
                            {
                                damageRec = Math.abs(hull.actualhull);
                                hull.actualhull = 0;
                            }
                        }
                        
                        character.ship.actualcorehull -= damageRec;
                        character.ship.actualcorehull = Math.round(character.ship.actualcorehull);
                        
                        if(character.ship.actualcorehull <= 0)
                        {
                            death(character);
                        }
                    break;
                    case "damageAllSquadrons":
                        var dmgMultiplicator = rand(80, 120) / 100;
                        var damageRec = weapon.squadrondamage * dmgMultiplicator * mfaa1Multi;
                        
                        character.control.dmgreceived = 0;
                        
                        if(character.equipment.squadronshield)
                        {
                            var shieldIndex = rand(0, character.equipment.squadronshield.length - 1);
                            var shield = character.equipment.squadronshield[shieldIndex];
                            
                            shield.actualshield -= damageRec;
                            shield.actualshield = Math.round(shield.actualshield);
                            
                            if(shield.actualshield >= 0) return;
                            else
                            {
                                damageRec = Math.abs(shield.actualshield);
                                shield.actualshield = 0;
                            }
                        }
                        
                        if(character.equipment.squadronhull)
                        {
                            var hullIndex = rand(0, character.equipment.squadronhull.length - 1);
                            var hull = character.equipment.squadronhull[hullIndex];

                            hull.actualhull -= damageRec;
                            hull.actualhull = Math.round(hull.actualhull);
                            
                            if(hull.actualhull >= 0) return;
                            else
                            {
                                damageRec = Math.abs(hull.actualhull);
                                hull.actualhull = 0;
                            }
                        }
                        
                        character.ship.actualcorehull -= damageRec;
                        character.ship.actualcorehull = Math.round(character.ship.actualcorehull);
                        
                        if(character.ship.actualcorehull <= 0)
                        {
                            death(character);
                        }
                    break;
                }
                
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function squadronSplashDamage(targetCharacter, squadrons, squadronDamage)
            //EMFA1 képesség megoszló sebzés
            {
                try
                {
                    squadronDamage /= squadrons.length;
                    for(var x in squadrons)
                    {
                        damage(gameinfo.characters[squadrons[x]], squadronDamage, undefined, "direct");
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function gaaa1Recharge(character, value, damage)
            {
                try
                {
                    var recharge = damage * value / 100;
                    
                    if(character.equipment.shield)
                    {
                        var shields = character.equipment.shield;
                        shields.sort(function(a, b){return a.actualshield - b.actualshield});
                        
                        var shield = shields[0];
                        shield.actualshield += recharge;
                        if(shield.actualshield > shield.shieldenergy) shield.actualshield = shield.shieldenergy;
                        shield.actualshield = Math.round(shield.actualshield);
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function death(character)
            //A megadott karakter státuszát meghalt-ra állítja
            {
                try
                {
                    if(character.charid == sessionStorage.charid) playerDead();
                    character.place = "dead";
                    for(var x in gameinfo.characters)
                    {
                        if(gameinfo.characters[x].owner == character.charid) death(gameinfo.characters[x]);
                        if(gameinfo.characters[x].control.target == character.charid) gameinfo.characters[x].control.target = null;
                        if(gameinfo.characters[x].control.targettry == character.charid) gameinfo.characters[x].control.targettry = null;
                    }
                    
                    for(var x in gameinfo.temp.globalAbilities[character.alliance])
                    {
                        var ability = gameinfo.temp.globalAbilities[character.alliance][x];
                        if(ability.owner == character.charid) ability.actualactive = 0;
                    }
                    
                    if(character.type == "ship") loot(character);
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
function shieldRecharge(character)
//Tölti a hajó pajzsait
{
    try
    {
        var shields = character.equipment.shield
        if(shields == undefined) shields = character.equipment.squadronshield;
        if(shields == undefined) return;
        
        var needRecharge = [];
        for(var x in shields)
        {
            var shieldStatus = shields[x].actualshield / shields[x].shieldenergy;
            if(shieldStatus < 1)
            {
                needRecharge.push({shieldIndex: x, shieldStatus: shieldStatus})
            }
        }
        
        needRecharge.sort(function(a, b){return a.shieldStatus - b.shieldStatus});
        
        for(var x in needRecharge)
        {
            var shield = shields[needRecharge[x].shieldIndex];
            
            var batteryIndex = batteryIndexChoose(character, shield.energyusage);
            
            var multiplicator = 1;
            
            if(character.control.dmgreceived > 2) multiplicator *= 5;
            if(gameinfo.temp.globalAbilities[character.alliance].pdma1.actualactive)
            {
                multiplicator *= (100 + gameinfo.temp.globalAbilities[character.alliance].pdma1.value) / 100;
            }
            if(character.type == "ship" && character.extras.sre01.actualactive) multiplicator *= 5;
            
            if(batteryIndex != null)
            {
                energyUse(character, shield.energyusage, batteryIndex);
                shield.actualshield += shield.recharge * multiplicator;
                if(shield.actualshield > shield.shieldenergy) shield.actualshield = shield.shieldenergy;
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function batteryRecharge(character)
//Tölti a hajó akkumulátorait
{
    try
    {
        var batterys = character.equipment.battery;
        if(batterys == undefined || !character.control.genenergy) return;
        
        var needRecharge = [];
        for(var x in batterys)
        {
            var batteryStatus = batterys[x].actualcapacity / batterys[x].capacity
            if(batteryStatus < 1)
            {
                needRecharge.push({batteryIndex: x, batteryStatus: batteryStatus});
            }
        }
        
        needRecharge.sort(function(a, b){return b.batteryStatus - a.batteryStatus;});
        
        for(var x in needRecharge)
        {
            if(!character.control.genenergy) break;
            var battery = batterys[needRecharge[x].batteryIndex];
            
            var maxRecharge = battery.maxrecharge;
            if(battery.capacity - battery.actualcapacity < maxRecharge) maxRecharge = battery.capacity - battery.actualcapacity;
            
            character.control.genenergy -= maxRecharge;
            battery.actualcapacity += maxRecharge;
        }
        
        energySet(character);
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function damageAllSquadrons(character)
//mfaa2 képesség
{
    try
    {
        if(!character.equipment.rifle) return;
        
        for(var x in gameinfo.characters)
        {
            var targetCharacter = gameinfo.characters[x];
            
            if(targetCharacter.place != "space" || targetCharacter.type != "squadron" || targetCharacter.alliance == character.alliance) continue;
            
            for(var y in character.equipment.rifle)
            {
                if(targetCharacter.place == "dead") break;
                
                var weapon = character.equipment.rifle[y];
                
                if(character.control.rifleammo)
                {
                    var ammo = character.ammo[character.control.rifleammo];
                    if(ammo)
                    {
                        var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                        var batteryIndex = batteryIndexChoose(character, energyUsage);
                    }
                    
                    while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                    {
                        character.control.rifleammo = ammoChange(character.control.rifleammo);
                        var ammo = character.ammo[character.control.rifleammo];
                        if(ammo)
                        {
                            var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                            var batteryIndex = batteryIndexChoose(character, energyUsage);
                        }
                        
                        if(character.control.rifleammo == null) break;
                    }
                    
                    var shot = rand(1, weapon.reload) - 1;
                    
                    if(ammo && !shot)
                    {
                        energyUse(character, energyUsage, batteryIndex);
                        ammo.amount -= weapon.ammousage;
                        
                        if(hitSet(weapon.accuracy))
                        {
                            damage(targetCharacter, weapon, ammo, "allsquadrons");
                        }
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

function reCallSet(character)
//Vezérli a raj visszatérését
{
    try
    {
        if(reCallValueSet(character) || character.control.callbackcount)
        {
            character.control.callbackcount += 1;
            if(character.control.dmgreceived > 2) character.control.callbackcount += 1;
        }
        else
        {
            character.control.callbackcount = 0;
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function reCallValueSet(character)
    //Figyeli, hogy a rajnak szüksége van-e visszatérésre
    {
        try
        {
            var ammoPercent = character.ship.actualammostorage / character.ship.ammostorage * 100;
            if(ammoPercent < 10)
            {
                return 1;
            }
            
            if(character.equipment.battery && gameinfo.temp.energy[character.charid].percent < 10)
            {
                return 1;
            }
            
            var coreHullPercent = character.ship.actualcorehull / character.ship.corehull * 100;
            if(coreHullPercent < 50)
            {
                return 1;
            }
              
            if(character.equipment.squadronhull)
            {
                var actualHull = 0;
                var hullEnergy = 0;
                for(var x in character.equipment.squadronhull)
                {
                    var hull = character.equipment.squadronhull[x];
                    
                    actualHull += hull.actualhull;
                    hullEnergy += hull.hullenergy;
                }
                
                var hullPercent = actualHull / hullEnergy * 100;
                if(hullPercent < 50)
                {
                    return 1;
                }
            }
            return 0;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
function reCall(character)
//Hangárba viszi a rajt
{
    try
    {
        if(character.control.callbackcount > 4)
        {
            var owner = gameinfo.characters[character.owner];
            
            character.control.callbackcount = 0;
            
            var hangars = [];
            for(var x in owner.equipment.hangar)
            {
                if(owner.equipment.hangar[x].squadronplace) hangars.push({hangarIndex: x, repair: owner.equipment.hangar[x].repair});
            }
            
            hangars.sort(function(a, b){return b.repair - a.repair});
            hangarIndex = hangars[0].hangarIndex
            
            owner.equipment.hangar[hangarIndex].squadronplace--;
            character.place = hangarIndex;
            character.control.target = null;
            character.control.targettry = null;
            targetIdUnset(character.charid);
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function targetIdUnset(id)
    //Eltávolítja az összes jelölést a megadott karakterről
    {
        try
        {
            for(var x in gameinfo.characters)
            {
                if(gameinfo.characters[x].control.target == id) gameinfo.characters[x].control.target = null;
                if(gameinfo.characters[x].control.targettry == id) gameinfo.characters[x].control.targettry = null;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
function squadronTarget(character)
//Beállítja a raj célpontját
{
    try
    {
        var owner = gameinfo.characters[character.owner];
        
        if(!character.control.target && !character.control.targettry)
        {
            var weapons = {cannon: 0, rifle: 0};
            if(character.equipment.squadronweapon)
            {
                for(x in character.equipment.squadronweapon)
                {
                    switch(character.equipment.squadronweapon[x].itemtype)
                    {
                        case "squadroncannon":
                        case "squadronpulse":
                            weapons.cannon += 1;
                        break;
                        case "squadronrifle":
                            weapons.rifle += 1;
                        break;
                    }
                }
            }
            else return;
            
            var attackerShips = ownerAttackers(owner.charid, "ship");
            var attackerSquadrons = ownerAttackers(owner.charid, "squadron");
            
            if(owner.control.target && weapons.cannon)
            {
                character.control.targettry = owner.control.target;
            }
            else if(weapons.cannon && attackerShips)
            {
                character.control.targettry == attackerShips[rand(0, attackerShips.length - 1)];
            }
            else if(weapons.rifle && attackerSquadrons)
            {
                character.control.targettry = attackerSquadrons[rand(0, attackerSquadrons.length - 1)];
            }
            else if(weapons.cannon <= weapons.rifle && weapons.rifle)
            {
                character.control.targettry = squadronTargetChoose(character, "squadron");
            }
            
            if(!character.control.targettry && weapons.cannon)
            {
                character.control.targettry = squadronTargetChoose(character, "ship");
            }
        }
        
        if(character.control.targettry)
        {
            if(gameinfo.characters[character.control.targettry].type == "ship" && gameinfo.characters[character.control.targettry].extras.edi01.actualactive) return;
            
            var attackValue = rand(0, 2000);
            if(gameinfo.characters[character.control.targettry].type == "ship" && gameinfo.characters[character.control.targettry].extras.clo01.actualactive) attackValue -= rand(0, 500);
            
            if(attackValue > 1500)
            {
                character.control.target = character.control.targettry;
                character.control.targettry = null;
            }
        }
        
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function ownerAttackers(ownerid, type)
    //Kilistázza az owner támadó csatahajókat vagy rajokat
    {
        try
        {
            var attackers = [];
            for(var x in gameinfo.characters)
            {
                if(gameinfo.characters[x].type == type && gameinfo.characters[x].control.target == ownerid) attackers.push(gameinfo.characters[x].charid);
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            if(!attackers.length) return null;
            else return attackers;
        }
    }
    
    function squadronTargetChoose(character, type)
    //Jelöl egy rajt, ha van jelölhető
    {
        try
        {
            var possibleTargets = [];
            for(var x in gameinfo.characters)
            {
                if(gameinfo.characters[x].type == type && gameinfo.characters[x].alliance != character.alliance && gameinfo.characters[x].place == "space") possibleTargets.push(gameinfo.characters[x].charid);
            }
            
            if(!possibleTargets.length) return null;
            else return possibleTargets[rand(0, possibleTargets.length - 1)];
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
function squadronAttack(character)
//Raj támadás
{
    try
    {
        var owner = gameinfo.characters[character.owner];
        if(!Object.keys(owner.ammo)) return;
        if(gameinfo.characters[character.control.target].type == "ship" && gameinfo.characters[character.control.target].ability.emfa2.actualactive) return;
        squadronAmmosSet(character);
        
        
        var weapons = {cannon: [], rifle: []};
        
        for(var x in character.equipment.squadronweapon)
        {
            switch(character.equipment.squadronweapon[x].itemtype)
            {
                case "squadroncannon":
                case "squadronpulse":
                    weapons.cannon.push(character.equipment.squadronweapon[x]);
                break;
                case "squadronrifle":
                    weapons.rifle.push(character.equipment.squadronweapon[x]);
                break;
            }
        }
        
        squadronShot(character, owner, weapons);
    }
    catch(err)
    {
        alert(character.control.target);
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function squadronAmmosSet(character)
    //Beállítja a raj energiaszintjének megfelelő lőszert
    {
        try
        {
            var energyPercent = gameinfo.temp.energy[character.charid].percent;
            
            var ammoTypes = 
            {
                squadroncannon: {ammoType: "cannonball", control: "squadroncannonammo"},
                squadronpulse: {ammoType: "ioncell", control: "squadronpulseammo"},
                squadronrifle: {ammoType: "bullet", control: "squadronrifleammo"},
            }
                
              
            if(energyPercent < 50) var level = 1;
            else if(energyPercent < 75) var level = 2;
            else var level = 3;
            
            if(character.owner == sessionStorage.charid) level = gameinfo.temp.playerammolevel;
            
            for(var x in ammoTypes)
            {
                var ammoType = ammoTypes[x];
                
                character.control[ammoType.control] = gamedata.search({type: "ammo", itemtype: ammoType.ammoType, level: level});
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function squadronShot(character, owner, weapons)
    //Raj lövés
    {
        try
        {
            var attacked = 0;
            
            if(gameinfo.characters[character.control.target].place != "space")
            {
                character.control.target = null;
                character.control.targettry = null;
                return;
            }
            
            switch(gameinfo.characters[character.control.target].type)
            {
                case "ship":
                    if(gameinfo.characters[character.control.target].extras.ser01.actualactive) return;
                    for(var x in weapons.cannon)
                    {
                        if(character.control.target == null) return;
                        var weapon = weapons.cannon[x];
                        if(character.ship.actualammostorage < weapon.ammousage) continue;
                        
                        switch(weapon.itemtype)
                        {
                            case "squadroncannon":
                                var ammoControl = "squadroncannonammo";
                            break;
                            case "squadronpulse":
                                var ammoControl = "squadronpulseammo";
                            break;
                        }
                        
                        if(character.control[ammoControl])
                        {
                            var ammo = owner.ammo[character.control[ammoControl]];
                            if(ammo)
                            {
                                var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                var batteryIndex = batteryIndexChoose(character, energyUsage);
                            }
                            
                            while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                            {
                                character.control[ammoControl] = ammoChange(character.control[ammoControl]);
                                
                                var ammo = owner.ammo[character.control[ammoControl]];
                                if(ammo)
                                {
                                    var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                    batteryIndex = batteryIndexChoose(character, energyUsage);
                                }
                                if(character.control[ammoControl] == null) break;
                            }
                        }
                        
                        var shot = rand(1, weapon.reload) - 1;
                        if(ammo && !shot)
                        {
                            energyUse(character, energyUsage, batteryIndex);
                            ammo.amount -= weapon.ammousage;
                            character.ship.actualammostorage -= weapon.ammousage;
                            
                            if(hitSet(weapon.accuracy))
                            {
                                damage(character, weapon, ammo, "ship");
                            }
                            
                            character.control.lastattack = 1;
                            attacked = 1;
                        }
                    }
                    if(attacked) strikeBack(character, "ship");
                break;
                case "squadron":
                    for(var x in weapons.rifle)
                    {
                        if(character.control.target == null) return;
                        var weapon = weapons.rifle[x];
                        if(character.ship.actualammostorage < weapon.ammousage) continue;
                        
                        if(character.control.squadronrifleammo)
                        {
                            var ammo = owner.ammo[character.control.squadronrifleammo];
                            if(ammo)
                            {
                                var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                var batteryIndex = batteryIndexChoose(character, energyUsage);
                            }
                            
                            while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                            {
                                character.control.squadronrifleammo = ammoChange(character.control.squadronrifleammo);
                                var ammo = owner.ammo[character.control.squadronrifleammo];
                                if(ammo)
                                {
                                    var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                    var batteryIndex = batteryIndexChoose(character, energyUsage);
                                }
                                
                                if(character.control.squadronrifleammo == null) break;
                            }
                        }
                        
                        var shot = rand(1, weapon.reload) - 1;
                        if(ammo && !shot)
                        {
                            energyUse(character, energyUsage, batteryIndex);
                            ammo.amount -= weapon.ammousage;
                            character.ship.actualammostorage -= weapon.ammousage;
                            
                            if(hitSet(weapon.accuracy))
                            {
                                damage(character, weapon, ammo, "squadron");
                            }
                            
                            character.control.lastattack = 1;
                            attacked = 1;
                        }
                    }
                    if(attacked) strikeBack(character, "squadron");
                break;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function strikeBack(character, type)
        {
            try
            {
                var targetCharacter = gameinfo.characters[character.control.target];
                if(!targetCharacter || targetCharacter.place == "dead") return;
                
                switch(type)
                {
                    case "ship":
                        if(targetCharacter.equipment.rifle)
                        {
                            for(var x in targetCharacter.equipment.rifle)
                            {
                                if(character.place == "dead") return;
                                
                                var weapon = targetCharacter.equipment.rifle[x];
                                
                                if(targetCharacter.control.rifleammo)
                                {
                                    var ammo = targetCharacter.ammo[targetCharacter.control.rifleammo];
                                    if(ammo)
                                    {
                                        var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                        var batteryIndex = batteryIndexChoose(targetCharacter, energyUsage);
                                    }
                                    
                                    while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                                    {
                                        targetCharacter.control.rifleammo = ammoChange(targetCharacter.control.rifleammo);
                                        var ammo = targetCharacter.ammo[targetCharacter.control.rifleammo];
                                        if(ammo)
                                        {
                                            var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                            var batteryIndex = batteryIndexChoose(targetCharacter, energyUsage);
                                        }
                                        
                                        if(targetCharacter.control.rifleammo == null) break;
                                    }
                                }
                                
                                var shot = rand(1, weapon.reload) - 1;
                                if(ammo && !shot)
                                {
                                    energyUse(targetCharacter, energyUsage, batteryIndex);
                                    ammo.amount -= weapon.ammousage;
                                    
                                    var accuracy = weapon.accuracy;
                                    if(character.type == "ship" && character.extras.pdu01.actualactive)
                                    {
                                        accuracy -= 250;
                                    }
                                    
                                    if(hitSet(accuracy))
                                    {
                                        damage(targetCharacter, weapon, ammo, "squadron", character);
                                    }
                                }
                                
                            }
                        }
                    break;
                    case "squadron":
                        var owner = gameinfo.characters[targetCharacter.owner];
                        if(!owner.ammo) return;
                        if(targetCharacter.equipment.squadronweapon)
                        {
                            for(var x in targetCharacter.equipment.squadronweapon)
                            {
                                var weapon = targetCharacter.equipment.squadronweapon[x];
                                if(weapon.itemtype == "squadronrifle")
                                {
                                    if(targetCharacter.ship.actualammostorage < weapon.ammousage) continue;
                                    
                                    if(targetCharacter.control.squadronrifleammo)
                                    {
                                        var ammo = owner.ammo[targetCharacter.control.squadronrifleammo];
                                        if(ammo)
                                        {
                                            var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                            var batteryIndex = batteryIndexChoose(targetCharacter, energyUsage);
                                        }
                                        
                                        while(ammo == undefined || batteryIndex == null || ammo.amount < weapon.ammousage)
                                        {
                                            targetCharacter.control.squadronrifleammo = ammoChange(targetCharacter.control.squadronrifleammo);
                                            var ammo = owner.ammo[targetCharacter.control.squadronrifleammo];
                                            if(ammo)
                                            {
                                                var energyUsage = weapon.energyusage * ammo.energymultiplicator;
                                                var batteryIndex = batteryIndexChoose(targetCharacter, energyUsage);
                                            }
                                            
                                            if(targetCharacter.control.squadronrifleammo == null) break;
                                        }
                                        
                                        var shot = rand(1, weapon.reload) - 1;
                                        if(ammo && !shot)
                                        {
                                            energyUse(targetCharacter, energyUsage, batteryIndex);
                                            ammo.amount -= weapon.ammousage;
                                            character.ship.actualammostorage -= weapon.ammousage;
                                            
                                            if(hitSet(weapon.accuracy))
                                            {
                                                damage(targetCharacter, weapon, ammo, "squadron", character);
                                            }
                                        }
                                    }
                                }
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
        
function takeOff(character)
{
    try
    {
        if(takeOffCheck(character))
        {
            gameinfo.characters[character.owner].equipment.hangar[character.place].squadronplace++;
            character.place = "space";
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function takeOffCheck(character)
    {
        try
        {
            var ammoPercent = character.ship.actualammostorage / character.ship.ammostorage * 100;
            if(ammoPercent < 90) return 0;
            
            if(character.equipment.battery)
            {
                if(gameinfo.temp.energy[character.charid].percent < 90 && gameinfo.temp.energy[character.owner].percent > 20) return 0;
                if(gameinfo.temp.energy[character.charid].percent < 50 && gameinfo.temp.energy[character.owner].percent < 20) return 0;
            }
            
            if(character.equipment.squadronhull)
            {
                var hullEnergy = 0;
                var actualHull = 0;
                for(var x in character.equipment.squadronhull)
                {
                    hullEnergy += character.equipment.squadronhull[x].hullenergy;
                    actualHull += character.equipment.squadronhull[x].actualhull;
                }
                
                if(actualHull / hullEnergy * 100 < 90) return 0;
            }
            
            if(character.equipment.squadronshield)
            {
                var shieldEnergy = 0;
                var actualShield = 0;
                for(var x in character.equipment.squadronshield)
                {
                    shieldEnergy += character.equipment.squadronshield[x].shieldenergy;
                    actualShield += character.equipment.squadronshield[x].actualshield;
                }
                
                if(actualShield / shieldEnergy * 100 < 90) return 0;
            }
     
            if(character.ship.actualcorehull / character.ship.corehull * 100 < 90) return 0;
            
            return 1;
         }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function repair(character)
    {
        try
        {
            var hangar = gameinfo.characters[character.owner].equipment.hangar[character.place];
            
            character.ship.actualcorehull += character.ship.corehull * hangar.repair;
            if(character.ship.actualcorehull > character.ship.corehull) character.ship.actualcorehull = character.ship.corehull;
            
            character.ship.actualammostorage += character.ship.ammostorage * hangar.repair;
            if(character.ship.actualammostorage > character.ship.ammostorage) character.ship.actualammostorage = character.ship.ammostorage;
            
            if(character.equipment.squadronhull)
            {
                for(var x in character.equipment.squadronhull)
                {
                    var hull = character.equipment.squadronhull[x];
                    hull.actualhull += hull.hullenergy * hangar.repair;
                    if(hull.actualhull > hull.hullenergy) hull.actualhull = hull.hullenergy;
                }
            }
            
            if(character.equipment.battery)
            {
                var owner = gameinfo.characters[character.owner];
                for(var x in character.equipment.battery)
                {
                    var battery = character.equipment.battery[x];
                    if(battery.actualcapacity < battery.capacity)
                    {
                        var difference = battery.capacity - battery.actualcapacity;
                        if(difference > battery.capacity * hangar.repair) difference = battery.capacity * hangar.repair;
                        
                        var energyUsage = difference / 2;
                        var batteryIndex = batteryIndexChoose(owner, energyUsage);
                        if(batteryIndex != null)
                        {
                            battery.actualcapacity += difference;
                            energyUse(owner, energyUsage, batteryIndex);
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