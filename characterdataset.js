function characterdataset(company)
{
    try
    {
        var data = 
        {
            ship: new charactership(company),
            construction: new characterconstruction(),
            abilities: new characterabilities(),
            equipment: characterequipment(gamedata.search({company: company, level: 1, type: "ship"})),
        };
        data.ammo = characterammo(data.ship.basicammostorage, data.equipment);
        
        data = JSON.stringify(data);
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
    finally
    {
        return data;
    }
}

    function charactership(company)
    {
        try
        {
            var shipsearch = 
            {
                company: company,
                level: 1,
                type: "ship"
            }
            
            var shipid = gamedata.search(shipsearch)
            var shipdata = gamedata.items[shipid];
            
            var x;
            for(x in shipdata)
            {
                this[x] = shipdata[x];
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function characterconstruction()
    {
        try
        {
            var x;
            for(x in gamedata.items)
            {
                if(gamedata.items[x].construction != undefined)
                {
                    this[x] = new constritem(x);
                }
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function constritem(itemid)
        {
            try
            {
                itemdata = gamedata.items[itemid];
                this.itemid = itemid;
                this.parts = 0;
                this.construction = itemdata.construction;
                
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
    
    function characterabilities()
    {
        try
        {
            var x;
            for(x in gamedata.abilities)
            {
                this[x] = new characterability(gamedata.abilities[x]);
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function characterability(ability)
        {
            try
            {
                this.itemid = ability.itemid;
                this.level = 0;
                this.parts = 0;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
    function characterequipment(shipid)
    {
        try
        {
            var shipdata = gamedata.items[shipid];
            var equipment = [];
            
            equipment.push(new characterequip(gamedata.search({itemid: shipid}), "ship"));
            
            var x, se, eqid, eq;
            for(x = 0; x < shipdata.cannonslot; x++)
            {
                se = {itemtype: "cannon", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.rocketlauncherslot; x++)
            {
                se = {itemtype: "rocketlauncher", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.rifleslot; x++)
            {
                se = {itemtype: "rifle", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.shieldslot; x++)
            {
                se = {itemtype: "highcapacityshield", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.hullslot; x++)
            {
                se = {itemtype: "battleshiphull", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.generatorslot; x++)
            {
                se = {type: "generator", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            for(x = 0; x < shipdata.batteryslot; x++)
            {
                se = {type: "battery", level: 1};
                eqid = gamedata.search(se);
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }
            
            var squadronnum = 0;
            for(x = 0; x < shipdata.hangarslot; x++)
            {
                se = {itemtype: "hangar", level: 1};
                eqid = gamedata.search(se);
                hangardata = gamedata.items[eqid];

                squadronnum += hangardata.squadronplace;
                eq = new characterequip(eqid, "ship");
                equipment.push(eq);
            }

                var request = new XMLHttpRequest();
                    request.open("POST", "presquadronidgenerate.php", 0);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send("squadronnum=" + squadronnum);
                    
                    sessionStorage.squadrons = request.responseText;
                    
                    var squadrons = JSON.parse(request.responseText);
                        
                        var squadrondata, squadronid, y, squadronname, squadron, request2;
                        for(x in squadrons)
                        {
                            squadronid = squadrons[x].id;
                            squadronname = squadrons[x].name;
                            
                            se = {type: "squadron", level: 1};
                            eqid = gamedata.search(se);
                            eq = new characterequip(eqid, "ship");
                            equipment.push(eq);
                            
                            squadrondata = gamedata.items[eqid];
                            
                            squadron = new charsquadron(squadronid, squadronname, squadrondata);
                            
                            request2 = new XMLHttpRequest();
                            request2.open("POST", "squadrondataupload.php", 0);
                            request2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request2.send("squadronid=" + squadronid + "&squadrondata=" + JSON.stringify(squadron));
                            
                            var itemtype;
                            for(y = 0; y < squadrondata.weaponslot; y++)
                            {
                                if(Math.random() > 0.5) itemtype = "squadroncannon";
                                else itemtype = "squadronrifle";
                                
                                se = {itemtype: itemtype, level: 1};
                                eqid = gamedata.search(se);
                                eq = new characterequip(eqid, squadronid);
                                equipment.push(eq);
                            }
                            
                            for(y = 0; y < squadrondata.shieldslot; y++)
                            {
                                se = {itemtype: "squadronshield", level: 1};
                                eqid = gamedata.search(se);
                                eq = new characterequip(eqid, squadronid);
                                equipment.push(eq);
                            }
                            
                            for(y = 0; y < squadrondata.hullslot; y++)
                            {
                                se = {itemtype: "squadronhull", level: 1};
                                eqid = gamedata.search(se);
                                eq = new characterequip(eqid, squadronid);
                                equipment.push(eq);
                            }
                            
                            for(y = 0; y < squadrondata.batteryslot; y++)
                            {
                                se = {type: "battery", level: 1};
                                eqid = gamedata.search(se);
                                eq = new characterequip(eqid, squadronid);
                                equipment.push(eq);
                            }
                        }
                    
                
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return equipment;
        }
    }
        function characterequip(itemid, place)
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
        
        function charsquadron(squadronid, squadronname, squadrondata)
        {
            try
            {
                this.squadronid = squadronid;
                this.squadronname = squadronname;
                
                var x;
                for(x in squadrondata)
                {
                    this[x] = squadrondata[x];
                }
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
    function characterammo(basicammostorage, equipment)
    {
        try
        {
            var x, equipmentdata, weapons = {};
            for(x in equipment)
            {
                equipmentdata = gamedata.items[equipment[x].itemid];
                if(equipmentdata.type == "weapon")
                {
                    if(weapons[equipmentdata.ammotype] == undefined) weapons[equipmentdata.ammotype] = equipmentdata.ammousage;
                    else weapons[equipmentdata.ammotype] += equipmentdata.ammousage;
                }
                
            }
            
            if(weapons.rocket != undefined)
            {
                weapons.rocket /= 6;
                weapons.rocket = Math.ceil(weapons.rocket);
            }
            
            var equipmentnum = 0;
            for(x in weapons)
            {
                equipmentnum += weapons[x];
            }
            
            var ammos = [], amount, search;
            for(x in weapons)
            {
                amount = weapons[x] / equipmentnum * basicammostorage;
                amount = Math.floor(amount);
                
                search = 
                {
                    level: 1,
                    itemtype: x,
                };
                itemid = gamedata.search(search);
                
                ammos.push(new charammo(itemid, amount));
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
    
        function charammo(itemid, amount)
        {
            try
            {
                this.place = "ship";
                this.itemid = itemid;
                this.amount = amount;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }