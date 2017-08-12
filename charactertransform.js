function charactertransform(characterdata)
//Betölti a megadott karakter játékinformációit
{
    try
    {
        var equipped = equippedload(characterdata);
        gameinfo.characters[characterdata.charid] = new chtcharacter(characterdata, equipped);
        gameinfo.quickbarsession = "idle";
        gameinfo.openedbar = null;
        gameinfo.numberassign = {};
        gameinfo.activebar = null;
        
        var squadrons = characterdata.squadrons;
        var squadron;
        for(var x in squadrons)
        {
            gameinfo.characters[x] = new chtsquadrons(x, characterdata);
        }
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}
    
    function chtcharacter(characterdata, equipped)
    //Hajó játékinformációinak betöltése
    {
        try
        {
            if(characterdata.alliance == undefined) this.alliance = "friend";
            else this.alliance = characterdata.alliance;
            
            if(characterdata.place == undefined) this.place = "space";
            else this.place = characterdata.place;
            
            this.type = "ship";
            
            this.charid = characterdata.charid;
            this.charname = characterdata.charname;
            this.ship = new chtship(characterdata.characterdata.ship, equipped);
            this.equipment = chtequipment(characterdata, "ship");
            this.extras = chtextras(characterdata);
            this.ammo = chtammos(characterdata);
            this.ability = chtabilities(characterdata);
            this.control = new chtshipcontrol(characterdata);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function chtship(shipdata, equipped)
        //Hajó információi
        {
            try
            {
                this.itemid = shipdata.itemid;
                this.company = shipdata.company;
                this.corehull = shipdata.corehull;
                this.actualcorehull = shipdata.corehull;
                this.cargo = shipdata.basiccargo;
                this.actualcargo = 0;
                this.ammostorage = shipdata.basicammostorage;
                this.actualammostorage = equipped.ship.ammo;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function chtequipment(characterdata, place)
        //Felszerelések betöltése
        {
            try
            {
                var equipmentlist = {};
                var equipment = characterdata.characterdata.equipment;
                var item, itemdata;
                {
                    for(var x in equipment)
                    {
                        item = equipment[x];
                        itemdata = gamedata.items[item.itemid];
                        if(item.place == place && itemdata.slot != "ship" && itemdata.slot != "squadron" && itemdata.slot != "equipment" && itemdata.slot != "extender")
                        {
                            if(equipmentlist[itemdata.slot] == undefined) equipmentlist[itemdata.slot] = [];
                            equipmentlist[itemdata.slot].push(new chtitem(itemdata));
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
        
            function chtitem(itemdata)
            //Felszerelés betöltése
            {
                try
                {
                    this.itemid = itemdata.itemid;
                    switch(itemdata.type)
                    {
                        case "weapon":
                            this.ammotype = itemdata.ammotype;
                            this.reload = itemdata.reload;
                            this.accuracy = itemdata.accuracy;
                            this.hulldamage = itemdata.hulldamage;
                            this.shielddamage = itemdata.shielddamage;
                            this.energyusage = itemdata.energyusage;
                            this.ammousage = itemdata.ammousage;
                        break;
                        case "hangar":
                            this.squadronplace = itemdata.squadronplace;
                            this.repair = itemdata.repair;
                            this.actualsquadronplace = itemdata.squadronplace;
                        break;
                        case "shield":
                            this.shieldenergy = itemdata.shieldenergy;
                            this.actualshield = itemdata.shieldenergy;
                            this.recharge = itemdata.recharge;
                            this.energyusage = itemdata.energyusage;
                        break;
                        case "hull":
                            this.hullenergy = itemdata.hullenergy;
                            this.actualhull = itemdata.hullenergy;
                        break;
                        case "generator":
                            this.energyregen = itemdata.energyregen;
                        break;
                        case "battery":
                            this.capacity = itemdata.capacity;
                            this.actualcapacity = itemdata.capacity;
                            this.maxrecharge = itemdata.maxrecharge;
                        break;
                    }
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
    
        function chtextras(characterdata)
        //Extrák betöltése
        {
            try
            {
                var equipped = {};
                var item, itemdata;
                for(var x in characterdata.characterdata.equipment)
                {
                    item = characterdata.characterdata.equipment[x];
                    itemdata = gamedata.items[item.itemid];
                    
                    if(item.place == "ship" && itemdata.slot == "equipment")
                    {
                        equipped[item.itemid] = 1;
                    }
                }
                
                var extras = gamedata.search({slot: "equipment"});
                
                var equippedextras = {};
                var e;
                for(var x in extras)
                {
                    e = 0;
                    if(equipped[extras[x]]) e = 1;
                    equippedextras[extras[x]] = new chtextra(extras[x], e);
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return equippedextras;
            }
        }
        
            function chtextra(itemid, equipped)
            //Extra betöltése
            {
                try
                {
                    var itemdata = gamedata.items[itemid];
                    this.itemid = itemdata.itemid;
                    this.equipped = equipped;
                    this.ammotype = itemdata.ammotype;
                    this.reload = itemdata.reload;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
        function chtammos(characterdata)
        //Lőszerek betöltése
        {
            try
            {
                var ammos = characterdata.characterdata.ammo;
                var equipammos = {};
                
                var ammo;
                for(var x in ammos)
                {
                    ammo = ammos[x];
                    if(ammo.place == "ship" && ammo.amount)
                    {
                        equipammos[ammo.itemid] = new chtammo(ammo);
                    }
                }
                
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return equipammos;
            }
        }
        
            function chtammo(ammo)
            //Lőszer betöltése
            {
                try
                {
                    var itemdata = gamedata.items[ammo.itemid];
                    this.itemid = ammo.itemid;
                    this.amount = ammo.amount;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
        function chtabilities(characterdata)
        //Képességek betöltése
        {
            try
            {
                var characterabilities = {};
                var abilities = characterdata.characterdata.abilities;
                
                for(var x in abilities)
                {
                    characterabilities[abilities[x].itemid] = new chtability(abilities[x]);
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return characterabilities;
            }
        }
        
            function chtability(ability)
            //Képessg betöltése
            {
                try
                {
                    var abilitydata = gamedata.abilities[ability.itemid];
                    this.itemid = ability.itemid;
                    this.level = ability.level;
                    this.owner = abilitydata.owner
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
        function chtshipcontrol(characterdata)
        //Hajó vezérlésének betöltése
        {
            try
            {
                this.target = null;
                this.targettry = null;
                this.dmgreceived = 0;
                this.genenergyleft = 0;
                this.lastattack = 0;
                this.cannonammo = null;
                this.pulseammo = null;
                this.rocketlauncherammo = null;
                this.sablauncherammo = null;
                this.rifleammo = null;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
            
    function chtsquadrons(squadronid, characterdata)
    {
        try
        {
            var squadrondata = characterdata.squadrons[squadronid];
            
            if(squadrondata.alliance == undefined) this.alliance = "friend";
            else this.alliance = squadrondata.alliance;
            
            if(squadrondata.place == undefined) this.place = "space";
            else this.place = squadrondata.place;
            
            this.type = "squadron";
            this.charid = squadronid;
            this.charname = squadrondata.squadronname;
            this.ship = new chtsquadron(squadrondata.squadrondata.itemid);
            this.owner = characterdata.charid;
            this.equipment = chtequipment(characterdata, squadronid);
            this.control = new chtsquadroncontrol(characterdata);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function chtsquadron(itemid)
        {
            try
            {
                var squadrondata = gamedata.items[itemid];
                
                this.itemid = itemid;
                this.corehull = squadrondata.corehull;
                this.actualcorehull = squadrondata.corehull;
                this.ammostorage = squadrondata.basicammostorage;
                this.actualammostorage = squadrondata.basicammostorage;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function chtsquadroncontrol(characterdata)
            {
                try
                {
                    this.target = null;
                    this.targettry = null;
                    this.dmgreceived = 0;
                    this.genenergyleft = 0;
                    this.lastattack = 0;
                    this.squadroncannonammo = null;
                    this.squadronpulseammo = null;
                    this.squadronrifleammo = null;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
    
    function equippedload(characterdata)
    //Megadja az adott slotokba szerelt felszerelés számát
    {
        try
        {
            var equipped = {};
            var equipment = characterdata.characterdata.equipment;
            var ammos = characterdata.characterdata.ammo;
            
            var item, itemdata;
            for(var x in ammos)
            {
                item = ammos[x];
                if(item.place != "hangar")
                {
                    if(equipped[item.place] == undefined) equipped[item.place] = {};
                    if(equipped[item.place].ammo == undefined) equipped[item.place].ammo = 0;
                    equipped[item.place].ammo += item.amount;
                }
            }
            
            for(var x in equipment)
            {
                item = equipment[x];
                if(item.place != "hangar")
                {
                    itemdata = gamedata.items[item.itemid];
                    
                    if(equipped[item.place] == undefined) equipped[item.place] = {};
                    if(equipped[item.place][itemdata.slot] == undefined) equipped[item.place][itemdata.slot] = 0;
                    
                    equipped[item.place][itemdata.slot] += 1;
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return equipped;
        }
    }