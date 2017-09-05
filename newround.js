function newround()
{
    try
    {
        charactersStep();
        
        var friend = 0;
        var enemy = 0;
        for(var x in gameinfo.characters)
        {
            if(gameinfo.characters[x].place == "space" && gameinfo.characters[x].alliance == "friend") friend += 1;
            else if(gameinfo.characters[x].place == "space" && gameinfo.characters[x].alliance == "enemy") enemy += 1;
            characterdisplayset(x);
        }
        
        if(!friend || !enemy)
        {
            autoPlay("stop");
            
            if(!friend) var victory = 0;
            else if(!enemy) var victory = 1;
            
            endGame(victory);
            delete sessionStorage.game;
            return;
        }
        else
        {
            sessionStorage.game = JSON.stringify(gameinfo);
        }
        
        specialBarDisplay();
        enemyOrderSet();
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

function charactersStep()
//Új kör
{
    try
    {
        var attacks = attackSet();
        for(var x in attacks)
        {
            var character = gameinfo.characters[x];
            if(character.place == "dead") continue;
            switch(character.type)
            {
                case "ship":
                    shipRound(character);
                break;
                case "squadron":
                    squadronRound(character);
                break;
            }
            
            gameinfo.temp.activeExtra[character.charid] = [];
        }
        
        var alliances = ["friend", "enemy"];
        var abilities = ["pdma1", "mfaa1"];
        for(var x in alliances)
        {
            for(var y in abilities)
            {
                if(gameinfo.temp.globalAbilities[alliances[x]][abilities[y]].actualactive) gameinfo.temp.globalAbilities[alliances[x]][abilities[y]].actualactive -= 1;
            }
        }
        
        
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function attackSet()
    //Karakterek támadóértékének megadása
    {
        try
        {
            var attackNum = {};
            for(var x in gameinfo.characters)
            {
                attackNum[x] = rand(0, 1000);
                if(gameinfo.characters[x].type == "ship" && gameinfo.characters[x].extras.clo01.actualactive) attackNum[x] += rand(0, 500);
                if(gameinfo.temp.energy[x] == undefined) energySet(gameinfo.characters[x]);
            }
            
            var attackArr = [];
            for(var attacker in attackNum) attackArr.push([attacker, attackNum[attacker]]);
            
            attackArr.sort(function(a, b){return b[1] - a[1]});
            
            var attackValue = {}
            for(var x in attackArr)
            {
                attackValue[attackArr[x][0]] = attackArr[x][1];
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return attackValue;
        }
    }
    
    function shipRound(character)
    //Hajók köre
    {
        try
        {
            character.control.genenergy = 0;
            
            genEnergySet(character);
            energySet(character);
            
            specialActive(character);
            if(character.charid != sessionStorage.charid) activateSet(character);
            activateSpecial(character);
            
            targetCharacter(character);
            if(character.control.target) attack(character);
            
            shieldRecharge(character);
            if(character.ability.mfaa2.actualactive) damageAllSquadrons(character);
            batteryRecharge(character);
            
            character.control.lastattack += 1;
            character.control.dmgreceived += 1;
            specialCoolDown(character);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function squadronRound(character)
    //Rajok köre
    {
        try
        {
            energySet(character);
            if(character.place == "space")
            {
                reCallSet(character);
                reCall(character);
                
                if(!character.control.callbackcount && character.place == "space")
                {
                    squadronTarget(character);
                    if(character.control.target) squadronAttack(character);
                }
            }
            else
            {
                takeOff(character);
                if(character.place != "space") repair(character);
            }
            
            shieldRecharge(character);
            
            character.control.dmgreceived += 1;
		}
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }