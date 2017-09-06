function loot(character)
//Zsákmánykiosztás
{
    try
    {
        var lootNum = character.ship.level * rand(5, 15) * rand(1, 3);
        
        var characterLists = setCharacterList(character);
        
        for(var x = 0; x < lootNum; x++)
        {
            var reward = rewardSet(character.ship.level);
            
            switch(reward.type)
            {
                case "credit":
                    var targetCharacterId = characterLists.livingCharacters[rand(0, characterLists.livingCharacters.length - 1)];
                    if(targetCharacterId == sessionStorage.charid)
                    {
                        if(gameinfo.characters[sessionStorage.charid].ability.mfap.level) reward.value = Math.ceil(reward.value * (1 + gameinfo.characters[sessionStorage.charid].ability.mfap.value / 100));
                        chardata.credit = Number(chardata.credit) + reward.value;
                        gameinfo.temp.creditLoot += reward.value;
                    }
                break;
                case "diamond":
                    var targetCharacterId = characterLists.livingCharacters[rand(0, characterLists.livingCharacters.length - 1)];
                    if(targetCharacterId == sessionStorage.charid)
                    {
                        if(gameinfo.characters[sessionStorage.charid].ability.mfap.level) reward.value = Math.ceil(reward.value * (1 + gameinfo.characters[sessionStorage.charid].ability.mfap.value / 100));
                        chardata.diamond =  Number(chardata.diamond) + reward.value;
                        gameinfo.temp.diamondLoot += reward.value;
                    }
                break;
                case "part":
                    if(characterLists.partCharacters.length)
                    {
                        var targetCharacterId = characterLists.partCharacters[rand(0, characterLists.partCharacters.length - 1)];
                        var targetCharacter = gameinfo.characters[targetCharacterId];
                        
                        if(targetCharacter.ability.mfap.level) reward.value = Math.ceil(reward.value * (1 + targetCharacter.ability.mfap.value / 100));
                        
                        reward.value = (reward.value > targetCharacter.ship.cargo - targetCharacter.ship.actualcargo) ? targetCharacter.ship.cargo - targetCharacter.ship.actualcargo : reward.value;
                       
                        if(!targetCharacter.cargo[reward.id.itemid]) targetCharacter.cargo[reward.id.itemid] = new cargoReward(reward);
                        else targetCharacter.cargo[reward.id.itemid].amount += reward.value;
                        
                        cargoSet(targetCharacter);
                        var characterLists = setCharacterList(character);
                    }
                    
                break;
                case "ammo":
                    if(!characterLists.ammoCharacters.length) break;
                    var targetCharacterId = characterLists.ammoCharacters[rand(0, characterLists.ammoCharacters.length - 1)];
                    var targetCharacter = gameinfo.characters[targetCharacterId];
                    
                    if(targetCharacter.ability.mfap.level) reward.value = Math.ceil(reward.value * (1 + targetCharacter.ability.mfap.value / 100));
                    
                    var maxAmount = targetCharacter.ship.ammostorage - targetCharacter.ship.actualammostorage;
                    
                    reward.value = (reward.value > maxAmount) ? maxAmount : reward.value;
                    
                    if(!targetCharacter.ammo[reward.id.itemid])
                    {
                        targetCharacter.ammo[reward.id.itemid] = new chtammo({place: "ship", itemid: reward.id.itemid, amount: reward.value});
                    }
                    else
                    {
                        targetCharacter.ammo[reward.id.itemid].amount += reward.value;
                    }
                    ammoStorageSet(targetCharacter);
                    var characterLists = setCharacterList(character);
                break;
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function setCharacterList(character)
    //Csoportba szedi azokat a karaktereket, akik kaphatnak zsákmányt
    {
        try
        {
            var livingCharacters = [];
            var partCharacters = [];
            var ammoCharacters = [];
            for(var x in gameinfo.characters)
            {
                var lootCharacter = gameinfo.characters[x];
                
                if(lootCharacter.control.lastattack > 5) continue;
                
                if(lootCharacter.type == "ship" && lootCharacter.place == "space" && lootCharacter.alliance != character.alliance)
                {
                    livingCharacters.push(x);
                    
                    if(lootCharacter.ship.actualcargo < lootCharacter.ship.cargo) partCharacters.push(x);
                    if(lootCharacter.ship.actualammostorage < lootCharacter.ship.ammostorage) ammoCharacters.push(x);
                }
            }
            
            var result =
            {
                livingCharacters: livingCharacters,
                partCharacters: partCharacters,
                ammoCharacters: ammoCharacters,
            };
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return result;
        }
    }

    function rewardSet(level)
    //Összeállítja a zsákmányt
    {
        try
        {
            var reward = {type: null, id: {type: null, itemid: null}, value: null};
            
            var typeNum = rand(1, 14);
            if(typeNum <= 3) reward.type = "credit";
            else if(typeNum <= 5) reward.type = "diamond";
            else if(typeNum <= 10) reward.type = "part";
            else reward.type = "ammo";
            
            switch(reward.type)
            {
                case "credit":
                    reward.value = rand(1, 500);
                break;
                case "diamond":
                    reward.value = rand(1, 100);
                break;
                case "part":
                    partRewardSet(level, reward);
                break;
                case "ammo":
                    var ammoReward = ammoRewardSet();
                    reward.id.itemid = ammoReward.itemid;
                    reward.value = ammoReward.value;
                break;
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return reward;
        }
    }
    
        function ammoRewardSet()
        //Lőszer zsákmányolása
        {
            try
            {
                var reward = {itemid: null, value: null};
                
                if(!rand(0, 5))
                {
                    var items = gamedata.search({itemtype: "specialammo"});
                    reward.itemid = items[rand(0, items.length - 1)];
                    reward.value = rand(1, 2);
                }
                else
                {
                    var items = gamedata.search({type: "ammo"});
                    
                    var types = [];
                    for(var x in items)
                    {
                        var itemdata = gamedata.items[items[x]];
                        if(itemdata.itemtype != "specialammo")
                        {
                            if(types.indexOf(itemdata.itemtype) < 0) types.push(itemdata.itemtype);
                        }
                    }
                    
                    var itemtype = types[rand(0, types.length - 1)];
                    var level;
                    var levelRate = rand(1, 6);
                    if(levelRate <= 3) level = 1;
                    else if(levelRate <= 5) level = 2;
                    else level = 3;
                    
                    reward.itemid = gamedata.search({itemtype: itemtype, level: level});
                    reward.value = rand(1, 20);
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return reward;
            }
        }
        
        function cargoReward(reward)
        //Lőszer objektum
        {
            try
            {
                this.itemid = reward.id.itemid;
                this.type = reward.id.type;
                this.amount = reward.value;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function partRewardSet(level, reward)
        //Alkatrész zsákmányolása
        {
            try
            {
                reward.value = rand(1, 15);
                var num = rand(0, 3);
                switch(num)
                {
                    case 0:
                        reward.id.type = "abilities";
                        reward.id.itemid = Object.keys(gamedata.abilities)[rand(0, Object.keys(gamedata.abilities).length - 1)];
                    break;
                    default:
                        reward.id.type = "construction";
                        var fullItemList = {};
                            for(var x in gamedata.items)
                            {
                                if(gamedata.items[x].construction)
                                {
                                    var itemdata = gamedata.items[x];
                                    
                                    if(itemdata.itemtype)
                                    {
                                        if(!fullItemList[itemdata.type]) fullItemList[itemdata.type] = {};
                                        if(!fullItemList[itemdata.type][itemdata.itemtype]) fullItemList[itemdata.type][itemdata.itemtype] = 0;
                                        if(itemdata.level > fullItemList[itemdata.type][itemdata.itemtype]) fullItemList[itemdata.type][itemdata.itemtype] = itemdata.level;
                                    }
                                    else
                                    {
                                        if(!fullItemList[itemdata.type]) fullItemList[itemdata.type] = 0;
                                        if(itemdata.level > fullItemList[itemdata.type]) fullItemList[itemdata.type] = itemdata.level;
                                    }
                                }
                            }
                        
                        var typeList = [];
                        for(var x in fullItemList)
                        {
                            var item = fullItemList[x];
                            if(typeof item == "object")
                            {
                                for(var y in item)
                                {
                                    var itemtype = item[y];
                                    typeList.push({type: "itemtype", value: y, maxLevel: itemtype});
                                }
                            }
                            else
                            {
                                typeList.push({type: "type", value: x, maxLevel: item});
                            }
                        }
                        
                        var rewardItem = typeList[rand(0, typeList.length - 1)];
                        
                        var level = partLevelSet(rewardItem.maxLevel, level);
                        
                        var searchObj = {level: level};
                            searchObj[rewardItem.type] = rewardItem.value;
                        var itemid = gamedata.search(searchObj);
                        
                        if(typeof itemid == "object")
                        {
                            reward.id.itemid = itemid[rand(0, itemid.length - 1)];
                        }
                        else reward.id.itemid = itemid;
                    break;
                }
            }
            catch(err)
            {
                alert(searchObj.level + " - " + searchObj.type + " - " + searchObj.itemtype);
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function partLevelSet(maxLevel, level)
            {
                try
                {
                    if(!maxLevel)
                    {
                        throw "MaxLevel error: " + maxLevel;
                    }
                    if(!level) throw "level error: " + level;
                    var resultLevel = 1;
                    var rates = [100];
                    
                    if(maxLevel == 1) return 1;
                    if(maxLevel < 10)
                    {
                        var multiplicator = 10 / maxLevel;
                        maxLevel *= multiplicator;
                    }
                    
                    for(var x = 1; x <= maxLevel; x++)
                    {
                        if(x === 1)
                        {
                            rates[x] = rates[0] * 1.5;
                        }
                        else if(x <= level)
                        {
                            rates[x] = rates[x - 1] + (rates[x - 1] - rates[x - 2]) * 3;
                        }
                        else
                        {
                            rates[x] = rates[x - 1] + Math.ceil((rates[x - 1] - rates[x - 2]) / 2);
                        }
                    }
                    
                    var rate = rand(0, rates[9]);
                    
                    for(var x in rates)
                    {
                        if(rate >= rates[x])
                        {
                            resultLevel = Number(x) + 1;
                        }
                    }
                    
                    if(multiplicator)
                    {
                        resultLevel = Math.round(resultLevel / multiplicator);
                        if(!resultLevel) resultLevel = 1;
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
                finally
                {
                    if(resultLevel == undefined) alert("undefined" + rate + " - " + rates);
                    if(resultLevel == NaN) alert("NaN" + rate + " - " + rates);
                    if(resultLevel == 0) alert("Nulla" + rate + " - " + rates  + " - " + multiplicator);
                    if(resultLevel == 11) alert("Over" + rate + " - " + rates  + " - " + multiplicator);
                    return resultLevel;
                }
            }
        
    function cargoSet(character)
    //Frissíti a karakter rakterét
    {
        try
        {
            var actualCargo = 0;
            
            for(var x in character.cargo)
            {
                actualCargo += character.cargo[x].amount;
            }
            
            character.ship.actualcargo = actualCargo;
        }
        catch(err)
        {
            alert(arguments.callee.caller.toString());
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }