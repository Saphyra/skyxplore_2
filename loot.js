function loot(character)
{
    try
    {
        var lootNum = character.ship.level * 15;
        
        var livingCharacters = [];
        var partCharacters = [];
        var ammoCharacters = [];
        for(var x in gameinfo.characters)
        {
            var lootCharacter = gameinfo.characters[x];
            
            if(lootCharacter.type == "ship" && lootCharacter.place == "space" && lootCharacter.alliance != character.alliance)
            {
                livingCharacters.push(x);
                
                if(lootCharacter.ship.actualcargo < lootCharacter.ship.cargo) partCharacters.push(x);
                if(lootCharacter.ship.actualammostorage < lootCharacter.ship.ammostorage) ammoCharacters.push(x);
            }
        }
        
        
        for(var x = 0; x < lootNum; x++)
        {
            var reward = rewardSet(character.ship.level);
            
            switch(reward.type)
            {
                case "credit":
                
                break;
                case "diamond":
                
                break;
                case "part":
                
                break;
                case "ammo":
                    if(!ammoCharacters.length) break;
                    var targetCharacterId = ammoCharacters[rand(0, ammoCharacters.length - 1)];
                    var targetCharacter = gameinfo.characters[targetCharacterId];
                    
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
                break;
            }
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function rewardSet(level)
    {
        try
        {
            var reward = {type: null, id: {type: null, itemid: null}, value: null};
            
            var typeNum = rand(1, 14);
            if(typeNum <= 4) reward.type = "credit";
            else if(typeNum <= 6) reward.type = "diamond";
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