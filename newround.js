function newround()
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
        }
        
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
        }
        
        specialBarDisplay();
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
            
            if(character.charid != sessionStorage.charid) activate(character);
            
            targetCharacter(character);
            if(character.control.target) attack(character);
            shieldRecharge(character);
            batteryRecharge(character);
            
            character.control.lastattack += 1;
            character.control.dmgreceived += 1;
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