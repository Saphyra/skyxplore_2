function charactergenerate(level, alliance)
//Botot generál
{
    try
    {
        var botdata = {};
        
        botdata.alliance = alliance;
        botdata.type = "ship";
        botdata.place = "space";
        botdata.charid = chgidset();
        botdata.charname = botdata.charid // nameset();
        botdata.company = chgcompanyset();
        botdata.characterdata = {};
            botdata.characterdata.abilities = chgabilityset(level);
        var botequipment = chgequipmentset(botdata.company, level);
            botdata.characterdata.ship = botequipment.ship;
            botdata.level = botdata.characterdata.ship.level;
            botdata.characterdata.equipment = botequipment.equipment;
        
        botdata.squadrons = {};
        var squadronplace = chgsquadronplaceset(botdata.characterdata.equipment);
            
            var squadronlevel, squadron;
            for(var x = 0; x < squadronplace; x++)
            {
                if(squadronlevel = chgequipmentlevelset10(botdata.characterdata.ship.maxsquadronlevel))
                {
                    squadron = chgsquadrongenerate(botdata, squadronlevel);
                    botdata.squadrons[squadron.squadronid] = squadron;
                }
            }
            
        botdata.characterdata.ammo = chgammoset(botdata);
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
    finally
    {
        return botdata;
    }
}

    function chgidset()
    {
        try
        {
            var ids = [];
            if(gameinfo.characters != undefined)
            {
                for(var x in gameinfo.characters)
                {
                    ids.push(x);
                }
            }
            
            do
            {
                var id = "bot";
                for(var x = 0; x < 10; x++)
                {
                    id += rand(0, 9);
                }
            }
            while(ids.indexOf(id) > -1);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return id;
        }
    }
    
    function chgcompanyset()
    {
        try
        {
            switch(rand(1, 6))
            {
                case 1:
                    var company = "emf";
                break;
                case 2:
                    var company = "pdm";
                break;
                case 3:
                    var company = "idf";
                break;
                case 4:
                    var company = "gaa";
                break;
                case 5:
                    var company = "mfa";
                break;
                case 6:
                    var company = "cri";
                break;
                default:
                    var company = null;
                break;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return company;
        }
    }
    
    function chgabilityset(level)
    {
        try
        {
            var abilities = gamedata.abilities;
            charabilities = {};
            
            var ability;
            for(var x in abilities)
            {
                ability = abilities[x];
                charabilities[x] = new chgability(ability, level);
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return charabilities;
        }
    }
    
        function chgability(abilitydata, level)
        {
            try
            {
                this.itemid = abilitydata.itemid;
                this.level = chgabilitylevelset(abilitydata.maxlevel, level);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function chgabilitylevelset(maxlevel, shiplevel)
            {
                try
                {
                    shiplevel = Number(shiplevel);
                    var rate = rand(1, 1000);
                    var level;
                    switch(maxlevel)
                    {
                        case 5:
                            switch(shiplevel)
                            {
                                case 1:
                                    if(rate <= 400) level = 0;
                                    else if(rate <= 700) level = 1;
                                    else if(rate <= 850) level = 2;
                                    else if(rate <= 950) level = 3;
                                    else if(rate <= 999) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 2:
                                    if(rate <= 300) level = 0;
                                    else if(rate <= 600) level = 1
                                    else if(rate <= 800) level = 2;
                                    else if(rate <= 950) level = 3;
                                    else if(rate <= 995) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 3:
                                    if(rate <= 200) level = 0;
                                    else if(rate <= 400) level = 1;
                                    else if(rate <= 700) level = 2;
                                    else if(rate <= 900) level = 3;
                                    else if(rate <= 990) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 4:
                                    if(rate < 175) level = 0;
                                    else if(rate < 350) level = 1;
                                    else if(rate < 550) level = 2;
                                    else if(rate < 850) level = 3;
                                    else if(rate < 985) level = 4;
                                    else if(rate < 1000) level = 5;
                                break;
                                case 5:
                                    if(rate <= 150) level = 0;
                                    else if(rate <= 300) level = 1;
                                    else if(rate <= 600) level = 2;
                                    else if(rate <= 900) level = 3;
                                    else if(rate <= 975) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 6:
                                    if(rate <= 125) level = 0;
                                    else if(rate <= 250) level = 1;
                                    else if(rate <= 400) level = 2;
                                    else if(rate <= 800) level = 3;
                                    else if(rate <= 950) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 7:
                                    if(rate <= 100) level = 0;
                                    else if(rate <= 225) level = 1;
                                    else if(rate <= 400) level = 2;
                                    else if(rate <= 700) level = 3;
                                    else if(rate <= 900) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 8:
                                    if(rate <= 75) level = 0;
                                    else if(rate <= 125) level = 1;
                                    else if(rate <= 250) level = 2;
                                    else if(rate <= 500) level = 3;
                                    else if(rate <= 850) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 9:
                                    if(rate <= 50) level = 0;
                                    else if(rate <= 100) level = 1;
                                    else if(rate <= 200) level = 2;
                                    else if(rate <= 350) level = 3;
                                    else if(rate <= 750) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                                case 10:
                                    if(rate <= 10) level = 0;
                                    else if(rate <= 50) level = 1;
                                    else if(rate <= 150) level = 2;
                                    else if(rate <= 300) level = 3;
                                    else if(rate <= 600) level = 4;
                                    else if(rate <= 1000) level = 5;
                                break;
                            }
                        break;
                        case 10:
                            switch(shiplevel)
                            {
                                case 1:
                                    if(rate <= 250) level = 0;
                                    else if(rate <= 550) level = 1;
                                    else if(rate <= 750) level = 2;
                                    else if(rate <= 850) level = 3;
                                    else if(rate <= 925) level = 4;
                                    else if(rate <= 950) level = 5;
                                    else if(rate <= 970) level = 6;
                                    else if(rate <= 985) level = 7;
                                    else if(rate <= 995) level = 8;
                                    else if(rate <= 999) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 2:
                                    if(rate <= 150) level = 0;
                                    else if(rate <= 350) level = 1;
                                    else if(rate <= 650) level = 2;
                                    else if(rate <= 800) level = 3;
                                    else if(rate <= 900) level = 4;
                                    else if(rate <= 945) level = 5;
                                    else if(rate <= 965) level = 6;
                                    else if(rate <= 980) level = 7;
                                    else if(rate <= 990) level = 8;
                                    else if(rate <= 995) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 3:
                                    if(rate <= 150) level = 0;
                                    else if(rate <= 250) level = 1;
                                    else if(rate <= 400) level = 2;
                                    else if(rate <= 700) level = 3;
                                    else if(rate <= 850) level = 4;
                                    else if(rate <= 900) level = 5;
                                    else if(rate <= 930) level = 6;
                                    else if(rate <= 955) level = 7;
                                    else if(rate <= 975) level = 8;
                                    else if(rate <= 990) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 4:
                                    if(rate <= 75) level = 0;
                                    else if(rate <= 175) level = 1;
                                    else if(rate <= 300) level = 2;
                                    else if(rate <= 450) level = 3;
                                    else if(rate <= 750) level = 4;
                                    else if(rate <= 850) level = 5;
                                    else if(rate <= 890) level = 6;
                                    else if(rate <= 925) level = 7;
                                    else if(rate <= 955) level = 8;
                                    else if(rate <= 980) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 5:
                                    if(rate <= 25) level = 0;
                                    else if(rate <= 75) level = 1;
                                    else if(rate <= 150) level = 2;
                                    else if(rate <= 250) level = 3;
                                    else if(rate <= 350) level = 4;
                                    else if(rate <= 650) level = 5;
                                    else if(rate <= 750) level = 6;
                                    else if(rate <= 850) level = 7;
                                    else if(rate <= 920) level = 8;
                                    else if(rate <= 960) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 6:
                                    if(rate <= 10) level = 0;
                                    else if(rate <= 25) level = 1;
                                    else if(rate <= 50) level = 2;
                                    else if(rate <= 100) level = 3;
                                    else if(rate <= 175) level = 4;
                                    else if(rate <= 275) level = 5;
                                    else if(rate <= 600) level = 6;
                                    else if(rate <= 800) level = 7;
                                    else if(rate <= 900) level = 8;
                                    else if(rate <= 950) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 7:
                                    if(rate <= 5) level = 0;
                                    else if(rate <= 10) level = 1;
                                    else if(rate <= 20) level = 2;
                                    else if(rate <= 35) level = 3;
                                    else if(rate <= 55) level = 4;
                                    else if(rate <= 120) level = 5;
                                    else if(rate <= 250) level = 6;
                                    else if(rate <= 550) level = 7;
                                    else if(rate <= 750) level = 8;
                                    else if(rate <= 900) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 8:
                                    if(rate <= 5) level = 0;
                                    else if(rate <= 15) level = 1;
                                    else if(rate <= 50) level = 2;
                                    else if(rate <= 85) level = 3;
                                    else if(rate <= 135) level = 4;
                                    else if(rate <= 170) level = 5;
                                    else if(rate <= 225) level = 6;
                                    else if(rate <= 400) level = 7;
                                    else if(rate <= 700) level = 8;
                                    else if(rate <= 850) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 9:
                                    if(rate <= 5) level = 0;
                                    else if(rate <= 15) level = 1;
                                    else if(rate <= 25) level = 2;
                                    else if(rate <= 45) level = 3;
                                    else if(rate <= 75) level = 4;
                                    else if(rate <= 135) level = 5;
                                    else if(rate <= 210) level = 6;
                                    else if(rate <= 300) level = 7;
                                    else if(rate <= 500) level = 8;
                                    else if(rate <= 800) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                                case 10:
                                    if(rate <= 1) level = 0;
                                    else if(rate <= 5) level = 1;
                                    else if(rate <= 10) level = 2;
                                    else if(rate <= 20) level = 3;
                                    else if(rate <= 40) level = 4;
                                    else if(rate <= 80) level = 5;
                                    else if(rate <= 160) level = 6;
                                    else if(rate <= 320) level = 7;
                                    else if(rate <= 500) level = 8;
                                    else if(rate <= 700) level = 9;
                                    else if(rate <= 1000) level = 10;
                                break;
                            }
                        break;
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return level;
                }
            }
            
    function chgequipmentset(company, shiplevel)
    {
        try
        {
            var botequipment = {};
            var shipshearch = {company: company, level: shiplevel};
            var shipid = gamedata.search(shipshearch);
            
            botequipment.ship = new chgshipdataset(shipid);
            botequipment.equipment = new chgequipment(shipid, botequipment.ship);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return botequipment;
        }
    }
    
        function chgshipdataset(shipid)
        {
            try
            {
                var shipdata = gamedata.items[shipid];
                
                for(var x in shipdata)
                {
                    this[x] = shipdata[x];
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function chgequipment(shipid, shipdata)
        {
            try
            {
                var equipmentlist = [];
                
                    equipmentlist.push(new chgequipadd(shipid, "ship"));
                
                
                
                var effects = chgeffectlist("extender");
                var equippedeffect = [];
                
                var extenderlevel, effect, extenderdata, itemid;
                for(var x = 0; x < shipdata.extenderslot; x++)
                {
                    if(extenderlevel = chgequipmentlevelset3(shipdata.maxextenderlevel))
                    {
                        do
                        {
                            effect = effects[rand(0, effects.length - 1)];
                        }
                        while(equippedeffect.indexOf(effect) > -1);
                        equippedeffect.push(effect);
                        
                        itemid = gamedata.search({slot: "extender", effect: effect, level: extenderlevel});
                            
                        extenderdata = gamedata.items[itemid];
                        
                        switch(extenderdata.effect)
                        {
                            case "basicammostorage":
                                shipdata.basicammostorage *= extenderdata.slotextend;
                            break;
                            case "basiccargo":
                                shipdata.basiccargo *= extenderdata.slotextend;
                            break;
                            default:
                                shipdata[extenderdata.effect] += extenderdata.slotextend
                            break;
                        }
                        
                        equipmentlist.push(new chgequipadd(itemid, "ship"));
                    }
                }
                
                var slots = 
                {
                    cannon: {slot: shipdata.cannonslot, level: shipdata.maxcannonlevel},
                    rocketlauncher: {slot: shipdata.rocketlauncherslot, level: shipdata.maxrocketlauncherlevel},
                    rifle: {slot: shipdata.rifleslot, level: shipdata.maxriflelevel},
                    shield: {slot: shipdata.shieldslot, level: shipdata.maxshieldlevel},
                    hull: {slot: shipdata.hullslot, level: shipdata.maxhulllevel},
                    generator: {slot: shipdata.generatorslot, level: shipdata.maxgeneratorlevel},
                    battery: {slot: shipdata.batteryslot, level: shipdata.maxbatterylevel},
                    hangar: {slot: shipdata.hangarslot, level: shipdata.maxhangarlevel},
                    equipment: {slot: shipdata.equipmentslot, level: 10},
                }
                
                equipmenteffects = chgeffectlist("equipment");
                var slot, item, itemlevel, typerate, itemtype, equippedextraeffect = [], count, overload = 1, search;
                for(var x in slots)
                {
                    slot = slots[x]
                    for(var y = 0; y < slot.slot; y++)
                    {
                        switch(x)
                        {
                            case "cannon":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    if(typerate = rand(0, 2))
                                    {
                                        itemtype = "cannon";
                                    }
                                    else itemtype = "pulse";
                                    
                                    itemid = gamedata.search({slot: x, level: itemlevel, itemtype: itemtype});
                                    equipmentlist.push(new chgequipadd(itemid, "ship"));
                                }
                            break;
                            case "rocketlauncher":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    if(typerate = rand(0, 2))
                                    {
                                        itemtype = "rocketlauncher";
                                    }
                                    else itemtype = "sablauncher";
                                    
                                    itemid = gamedata.search({slot: x, level: itemlevel, itemtype: itemtype});
                                    equipmentlist.push(new chgequipadd(itemid, "ship"));
                                }
                            break;
                            case "rifle":
                            case "hull":
                            case "generator":
                            case "battery":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    itemid = gamedata.search({slot: x, level: itemlevel});
                                    equipmentlist.push(new chgequipadd(itemid, "ship"));
                                }
                            break;
                            case "shield":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    if(typerate = rand(0, 2))
                                    {
                                        itemtype = "highcapacityshield";
                                    }
                                    else itemtype = "quickrechargeshield";
                                    
                                    itemid = gamedata.search({slot: x, level: itemlevel, itemtype: itemtype});
                                    equipmentlist.push(new chgequipadd(itemid, "ship"));
                                }
                            break;
                            case "hangar":
                                if(itemlevel = chgequipmentlevelset3(slot.level))
                                {
                                    itemid = gamedata.search({slot: x, level: itemlevel});
                                    equipmentlist.push(new chgequipadd(itemid, "ship"));
                                }
                            break;
                            case "equipment":
                                if(itemlevel = chgequipmentrate(shipdata.level))
                                {
                                    count = 0;
                                    do
                                    {
                                        effect = equipmenteffects[rand(0, equipmenteffects.length - 1)];
                                        count++;
                                        if(count > 100)
                                        {
                                            overload = 0;
                                            break;
                                        }
                                    }
                                    while(equippedextraeffect.indexOf(effect) > -1);
                                    
                                    if(overload)
                                    {
                                        search = {type: "equipment", effect: effect};
                                        
                                        if(effect == "rep")
                                        {
                                            search.level = chgrepairbotlevelset(shipdata.level);
                                        }
                                        itemid = gamedata.search(search);
                                        equipmentlist.push(new chgequipadd(itemid, "ship"));
                                    }
                                }
                            break;
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
                return equipmentlist;
            }
        }
        
            function chgequipadd(itemid, place)
            {
                try
                {
                    this.itemid = itemid;
                    this.place = place;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function chgeffectlist(effect)
            {
                try
                {
                    var extenders = gamedata.search({slot: effect});
                    var effects = [];
                    
                    var extenderdata;
                    for(var x in extenders)
                    {
                        extenderdata = gamedata.items[extenders[x]];
                        if(effects.indexOf(extenderdata.effect) == -1) effects.push(extenderdata.effect);
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return effects;
                }
            }
            
            function chgequipmentlevelset3(maxlevel)
            {
                try
                {
                    switch(maxlevel)
                    {
                        case 0:
                            var max = 0;
                        break;
                        case 1:
                            var max = 1;
                        break;
                        case 2:
                            var max = 3;
                        break;
                        case 3:
                            var max = 7;
                        break;
                    }
                    
                    var rate = rand(0, max);
                    
                    var level;
                    if(rate == 0) level = 0;
                    else if(rate <= 1) level = 1;
                    else if(rate <= 3) level = 2;
                    else if(rate <= 7) level = 3;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return level;
                }
            }
            
            function chgequipmentlevelset10(maxlevel)
            {
                try
                {
                    switch(maxlevel)
                    {
                        case 0:
                            var max = 0;
                        break;
                        case 1:
                            var max = 4;
                        break;
                        case 2:
                            var max = 9;
                        break;
                        case 3:
                            var max = 18;
                        break;
                        case 4:
                            var max = 36;
                        break;
                        case 5:
                            var max = 72;
                        break;
                        case 6:
                            var max = 144;
                        break;
                        case 7:
                            var max = 288;
                        break;
                        case 8:
                            var max = 596;
                        break;
                        case 9:
                            var max = 1192;
                        break;
                        case 10:
                            var max = 2384;
                        break;
                    }
                    
                    var rate = rand(0, max);
                    
                    var level;
                    if(rate == 0) level = 0;
                    else if(rate <= 4) level = 1;
                    else if(rate <= 9) level = 2;
                    else if(rate <= 18) level = 3;
                    else if(rate <= 36) level = 4;
                    else if(rate <= 72) level = 5;
                    else if(rate <= 144) level = 6;
                    else if(rate <= 288) level = 7;
                    else if(rate <= 596) level = 8;
                    else if(rate <= 1192) level = 9;
                    else if(rate <= 2384) level = 10;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return level;
                }
            }
            
            function chgequipmentrate(level)
            {
                try
                {
                    var rate = 45 + level * 5;
                    var value = (rand(0, 100) < rate) ? 1 : 0;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return value;
                }
            }
            
            function chgrepairbotlevelset(shiplevel)
            {
                try
                {
                    var rate = rand(1, 1000);
                    var level;
                    
                    switch(shiplevel)
                    {
                        case 1:
                            if(rate <= 700) level = 1;
                            else if(rate <= 900) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 2:
                            if(rate <= 600) level = 1;
                            else if(rate <= 850) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 3:
                            if(rate <= 500) level = 1;
                            else if(rate <= 800) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 4:
                            if(rate <= 400) level = 1;
                            else if(rate <= 750) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 5:
                            if(rate <= 350) level = 1;
                            else if(rate <= 700) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 6:
                            if(rate <= 300) level = 1;
                            else if(rate <= 600) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 7:
                            if(rate <= 250) level = 1;
                            else if(rate <= 500) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 8:
                            if(rate <= 200) level = 1;
                            else if(rate <= 400) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 9:
                            if(rate <= 150) level = 1;
                            else if(rate <= 300) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                        case 10:
                            if(rate <= 100) level = 1;
                            else if(rate <= 250) level = 2;
                            else if(rate <= 1000) level = 3;
                        break;
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    return level;
                }
            }
            
    function chgsquadronplaceset(equipment)
    {
        try
        {
            var squadronplace = 0;
            
            var item, itemdata;
            for(var x in equipment)
            {
                item = equipment[x];
                itemdata = gamedata.items[item.itemid];
                
                if(itemdata.slot == "hangar")
                {
                    squadronplace += itemdata.squadronplace;
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return squadronplace;
        }
    }
    
    function chgsquadrongenerate(botdata, squadronlevel)
    {
        try
        {
            var squadron = {};
                squadron.type = "squadron";
                squadron.place = "space";
                squadron.alliance = botdata.alliance;
                squadron.ownerid = botdata.charid;
                squadron.squadronid = chgsquadronidset(botdata.squadrons);
                squadron.squadronname = squadron.squadronid;
                squadron.squadrondata = new chgsquadrondataset(botdata.characterdata.ship.maxsquadronlevel, squadron, squadronlevel);
                
                chgsquadronequipmnetset(botdata, squadron.squadrondata);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return squadron;
        }
    }
    
        function chgsquadronidset(squadrons)
        {
            try
            {
                var ids = [];
                if(gameinfo.characters != undefined)
                {
                    for(var x in gameinfo.characters)
                    {
                        ids.push(x);
                    }
                }
                
                for(var x in squadrons)
                {
                    ids.push(x);
                }
                
                do
                {
                    var squadronid = "botsquad";
                    for(var x = 0; x < 10; x++)
                    {
                        squadronid += rand(0, 9);
                    }
                }
                while(ids.indexOf(squadronid) > -1);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return squadronid;
            }
        }
        
        function chgsquadrondataset(maxsquadronlevel, squadron, squadronlevel)
        {
            try
            {
                this.squadronid = squadron.squadronid;
                this.squadronname = squadron.squadronname;
                
                var itemid = gamedata.search({slot: "squadron", level: squadronlevel});
                var squadrondata = gamedata.items[itemid];
                
                for(var x in squadrondata)
                {
                    this[x] = squadrondata[x];
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function chgsquadronequipmnetset(botdata, squadrondata)
        {
            try
            {
                var equipment = botdata.characterdata.equipment;
                var squadronid = squadrondata.squadronid;
                
                equipment.push(new chgequipadd(squadrondata.itemid, "ship"));
                
                var slots = 
                {
                    squadronweapon: {slot: squadrondata.weaponslot, level: squadrondata.maxweaponlevel},
                    squadronshield: {slot: squadrondata.shieldslot, level: squadrondata.maxshieldlevel},
                    squadronhull: {slot: squadrondata.hullslot, level: squadrondata.maxhulllevel},
                    battery: {slot: squadrondata.batteryslot, level: squadrondata.maxbatterylevel},
                };
                
                var slot, itemlevel, typerate, itemtype, itemid;
                for(var x in slots)
                {
                    slot = slots[x];
                    
                    for(var y = 0; y < slot.slot; y++)
                    {
                        switch(x)
                        {
                            case "squadronweapon":
                                switch(rand(0, 1))
                                {
                                    case 0:
                                        if(itemlevel = chgequipmentlevelset10(slot.level))
                                        {
                                            itemid = gamedata.search({slot: x, level: itemlevel, itemtype: "squadronrifle"});
                                            equipment.push(new chgequipadd(itemid, squadronid));
                                        }
                                    break;
                                    case 1:
                                        if(itemlevel = chgequipmentlevelset10(slot.level))
                                        {
                                            if(typerate = rand(0, 2))
                                            {
                                                itemtype = "squadroncannon";
                                            }
                                            else itemtype = "squadronpulse";
                                            
                                            itemid = gamedata.search({slot: x, level: itemlevel, itemtype: itemtype});
                                            equipment.push(new chgequipadd(itemid, squadronid));
                                        }
                                    break;
                                }
                               
                            break;
                            case "squadronshield":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    if(typerate = rand(0, 2))
                                    {
                                        itemtype = "squadronshield";
                                    }
                                    else itemtype = "squadronquickrechargeshield";
                                    
                                    itemid = gamedata.search({slot: x, level: itemlevel, itemtype: itemtype});
                                    equipment.push(new chgequipadd(itemid, squadronid));
                                }
                            break;
                            case "squadronhull":
                            case "battery":
                                if(itemlevel = chgequipmentlevelset10(slot.level))
                                {
                                    itemid = gamedata.search({slot: x, level: itemlevel});
                                    equipment.push(new chgequipadd(itemid, squadronid));
                                }
                            break;
                        }
                    }
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
    function chgammoset(botdata)
    {
        try
        {
            var ammos = [];
            var equipment = botdata.characterdata.equipment;
            var basicammostorage = botdata.characterdata.ship.basicammostorage;
            
            var ammotypes = {};
            var item, itemdata, ammousage;
            for(var x in equipment)
            {
                item = equipment[x];
                itemdata = gamedata.items[item.itemid];
                
                if(itemdata.ammotype)
                {
                    if(ammotypes[itemdata.ammotype] == undefined) ammotypes[itemdata.ammotype] = 0;
                    
                    if(itemdata.ammousage == undefined) ammousage = botdata.level;
                    else ammousage = itemdata.ammousage;
                    
                    if(itemdata.slot == "rocketlauncher") ammousage /= chgrocketlauncherreloadset(botdata, itemdata);
                    if(itemdata.slot == "equipment") ammousage /= chgequipmentreloadset(botdata, itemdata);
                    
                    ammotypes[itemdata.ammotype] += ammousage;
                }
            }
            
            var allammousage = 0;
            for(var x in ammotypes) allammousage += ammotypes[x];
            
            var maxammonum = {};
            for(var x in ammotypes)
            {
                maxammonum[x] = ammotypes[x] / allammousage * basicammostorage;
            }
            
            var ammolist = [];
            
            var itemid;
            for(var x in maxammonum)
            {
                if(gamedata.items[x])
                {
                    ammolist.push({itemid: x, amount: maxammonum[x] * chgammorateset()});
                }
                else
                {
                    for(var y = 0; y < 10; y++)
                    {
                        var ammolevel = chgammolevelset()
                        itemid = gamedata.search({itemtype: x, level: ammolevel});
                        if(!itemid) alert(x + ammolevel);
                        ammolist.push({itemid: itemid, amount: maxammonum[x] * chgammorateset() * 0.1})
                    }
                }
            }
            
            var ammo, match;
            for(var x in ammolist)
            {
                match = 0;
                ammo = ammolist[x];
                ammo.amount = Math.ceil(ammo.amount);
                
                for(var y in ammos)
                {
                    if(ammos[y].itemid == ammo.itemid)
                    {
                        ammos[y].amount += ammo.amount;
                        match = 1;
                    }
                }
                
                if(!match)
                {
                    ammos.push(new chgammo(ammo));
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return ammos;
        }
    }
    
        function chgrocketlauncherreloadset(botdata, itemdata)
        {
            try
            {
                var reload = 6;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return reload;
            }
        }
        
        function chgequipmentreloadset(botdata, itemdata)
        {
            try
            {
                var reload = itemdata.reload;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return reload;
            }
        }
        
        function chgammorateset()
        {
            try
            {
                var mult;
                var rate = rand(0, 1000);
                if(rate <= 100) mult = 0;
                else if(rate <= 150) mult = 0.1;
                else if(rate <= 200) mult = 0.2;
                else if(rate <= 250) mult = 0.3;
                else if(rate <= 300) mult = 0.4;
                else if(rate <= 350) mult = 0.5;
                else if(rate <= 400) mult = 0,6;
                else if(rate <= 550) mult = 0.7;
                else if(rate <= 700) mult = 0.8;
                else if(rate <= 900) mult = 0.9;
                else if(rate <= 1000) mult = 1;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return mult;
            }
        }
        
        function chgammolevelset()
        {
            try
            {
                var rate = rand(1, 20);
                var level;
                
                if(rate <= 3) level = 3;
                else if(rate <= 9) level = 2;
                else if(rate <= 20) level = 1;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return level;
            }
        }
        
        function chgammo(ammo)
        {
            try
            {
                this.itemid = ammo.itemid;
                this.amount = ammo.amount;
                this.place = "ship";
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }