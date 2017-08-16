function genEnergySet(character)
//Generátorok működése
{
    try
    {
        var generators = character.equipment.generator;
        for(var x in generators)
        {
            character.control.genenergy += generators[x].energyregen;
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
            if(rand(0, 2000) > 800)
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

        if(character.charid != sessionStorage.charid) ammosSet(character);
        
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
        
        ammoStorageSet(character);
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
            
            if(character.equipment.generator && character.equipment.battery && gameinfo.temp.energy[character.charid].percent < 70 && character.control.dmgreceived > 1 && !character.control.lastattack)
            {
                return 0;
                alert("A karakter nem támad");
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
            
            var shot = rand(1, weapon.reload) - 1;
            if(ammo && !shot)
            {
                energyUse(character, energyUsage, batteryIndex);
                ammo.amount -= weapon.ammousage;
                
                if(hitSet(weapon.accuracy))
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
        
        function damage(character, weapon, ammo, targetType)
        //sebzést okoz a célpontnak
        {
            try
            {
                var dmgMultiplicator = rand(80, 120) / 100;
                var shieldDamage = weapon.shielddamage * dmgMultiplicator;
                var hullDamage = weapon.hulldamage * dmgMultiplicator;
                var shieldDamageCopy = shieldDamage;
                var hullDamageCopy = hullDamage;
                
                var targetCharacter = gameinfo.characters[character.control.target];
                    targetCharacter.control.dmgreceived = 0;
                    
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
                    character.place = "dead";
                    if(character.type == "ship")
                    {
                        for(var x in gameinfo.characters)
                        {
                            if(gameinfo.characters[x].owner == character.charid) death(gameinfo.characters[x]);
                            if(gameinfo.characters[x].control.target == character.charid) gameinfo.characters[x].control.target = null;
                            if(gameinfo.characters[x].control.targettry == character.charid) gameinfo.characters[x].control.targettry = null;
                        }
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
        function ammoStorageSet(character)
        {
            try
            {
                character.ship.actualammostorage = 0;
                if(character.ammo)
                {
                    for(var x in character.ammo) character.ship.actualammostorage += character.ammo[x].amount;
                }
                
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
            
function shieldRecharge(character)
{
    try
    {
        var shields = character.equipment.shield
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