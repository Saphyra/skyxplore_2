function endGame(victory)
//Játék befejezése
{
    try
    {
        document.body.onkeyup = "";
        
        getLoot();
        
        var container = document.getElementById("maincontainer");
            container.innerHTML = "";
            
            container.appendChild(headerCreate(victory));
            container.appendChild(buttonCreate());
            
            var ammoContainer = document.createElement("DIV");
                ammoContainer.id = "ammocontainer";
            container.appendChild(ammoContainer);
            
            container.appendChild(lootTableCreate());
            
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
}

    function headerCreate(victory)
    //Fejléc
    {
        try
        {
            var div = document.createElement("DIV");
                div.style.textAlign = "center";
                div.style.fontSize = "40";
                div.style.borderBottom = "5px ridge";
                var text = (victory) ? "Győzelem!" : "Vereség.";
                    text += " (" + gameinfo.temp.rounds + " kör)";
                div.innerHTML = text;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
    function buttonCreate()
    //Navigációs gombok
    {
        try
        {
            var div = document.createElement("DIV");
                div.style.textAlign = "center";
                div.style.marginTop = "1em";
                var backButton = document.createElement("BUTTON");
                    backButton.innerHTML = "Tovább";
                    backButton.addEventListener("click", function(){window.location.href = "character.html"});
                    backButton.style.fontSize = 36;
                    backButton.style.marginRight = "2em";
            div.appendChild(backButton);
                var ammoButton = document.createElement("BUTTON");
                    ammoButton.innerHTML = "Lőszerek mutatása";
                    ammoButton.style.fontSize = 36;
                    ammoButton.style.marginRight = "2em";
                    ammoButton.addEventListener("click", function(){ammoStorageLoad()});
            div.appendChild(ammoButton);
                var againButton = document.createElement("BUTTON");
                    againButton.innerHTML = "Új játék";
                    againButton.addEventListener("click", function(){window.location.href = "launch.html"});
                    againButton.style.fontSize = 36;
            div.appendChild(againButton);
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return div;
        }
    }
    
    function lootTableCreate()
    //Zsákmány kijelzése
    {
        try
        {
            var table = document.createElement("TABLE");
                table.style.margin = "auto";
                table.style.fontSize = "24";
                table.style.minWidth = "50%";
                table.style.marginTop = "1em";
                
                var titleRow = document.createElement("TR");
                    titleRow.className = "inforow";
                    var titleNameCell = document.createElement("TD");
                        titleNameCell.innerHTML = "Tárgy";
                        titleNameCell.style.textAlign = "center";
                titleRow.appendChild(titleNameCell);
                    var titleAmountCell = document.createElement("TD");
                        titleAmountCell.innerHTML = "Mennyiség";
                        titleAmountCell.style.textAlign = "center";
                titleRow.appendChild(titleAmountCell);
            table.appendChild(titleRow);
            
                var creditLootRow = document.createElement("TR");
                    creditLootRow.className = "inforow";
                    var creditLootNameCell = document.createElement("TD");
                        creditLootNameCell.innerHTML = "Kredit";
                        creditLootNameCell.style.textAlign = "right";
                creditLootRow.appendChild(creditLootNameCell);
                    var creditLootAmountCell = document.createElement("TD");
                        creditLootAmountCell.innerHTML = gameinfo.temp.creditLoot;
                creditLootRow.appendChild(creditLootAmountCell);
            table.appendChild(creditLootRow);
            
                var diamondLootRow = document.createElement("TR");
                    diamondLootRow.className = "inforow";
                    var diamondLootNameCell = document.createElement("TD");
                        diamondLootNameCell.innerHTML = "Gyémánt";
                        diamondLootNameCell.style.textAlign = "right";
                diamondLootRow.appendChild(diamondLootNameCell);
                    var diamondLootAmountCell = document.createElement("TD");
                        diamondLootAmountCell.innerHTML = gameinfo.temp.diamondLoot;
                diamondLootRow.appendChild(diamondLootAmountCell);
            table.appendChild(diamondLootRow);
            
            var cargo = gameinfo.characters[sessionStorage.charid].cargo;
            
            for(var x in cargo)
            {
                table.appendChild(lootRowCreate(cargo[x]));
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            return table;
        }
    }
    
        function lootRowCreate(cargo)
        //Zsákmány sor
        {
            try
            {
                var row = document.createElement("TR");
                    row.className = "inforow";
                    var nameCell = document.createElement("TD");
                        var name = (gamedata.items[cargo.itemid]) ? gamedata.items[cargo.itemid].name : gamedata.abilities[cargo.itemid].name;
                        nameCell.innerHTML = name;
                        nameCell.style.textAlign = "right";
                row.appendChild(nameCell);
                    var amountCell = document.createElement("TD");
                        amountCell.innerHTML = cargo.amount;
                row.appendChild(amountCell);
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
            finally
            {
                return row;
            }
        }
        
    function getLoot()
    //Zsákmány eszköztárba helyezése
    {
        try
        {
            var cargos = gameinfo.characters[sessionStorage.charid].cargo;
            var ammos = gameinfo.characters[sessionStorage.charid].ammo
            
            for(var x in cargos)
            {
                cargo = cargos[x];
                chardata.characterdata[cargo.type][cargo.itemid].parts = Number(chardata.characterdata[cargo.type][cargo.itemid].parts) + Number(cargo.amount);
            }
            
            for(var x in ammos)
            {
                var ammo = ammos[x];
                var match = 0;
                
                for(var y in chardata.characterdata.ammo)
                {
                    var characterAmmo = chardata.characterdata.ammo[y];
                    if(characterAmmo.itemid == ammo.itemid && characterAmmo.place == "ship")
                    {
                        characterAmmo.amount = Number(ammo.amount);
                        match = 1;
                    }
                }
                
                if(!match)
                {
                    chardata.characterdata.ammo.push({itemid: ammo.itemid, amount: ammo.amount, place: "ship"});
                }
            }
            
            save();
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function ammoStorageLoad()
    {
        try
        {
            var container = document.getElementById("ammocontainer");
                container.innerHTML = "";
                
                var table = document.createElement("TABLE");
                    table.style.margin = "auto";
                    table.style.fontSize = "24";
                    table.style.minWidth = "50%";
                    table.style.marginTop = "1em";
                    
                    var titleRow = document.createElement("TR");
                        titleRow.className = "inforow"
                        var titleNameCell = document.createElement("TD");
                            titleNameCell.innerHTML = "Lőszer";
                            titleNameCell.style.textAlign = "center";
                    titleRow.appendChild(titleNameCell);
                        var titleAmountCell = document.createElement("TD");
                            titleAmountCell.innerHTML = "Mennyiség";
                            titleAmountCell.style.textAlign = "center";
                    titleRow.appendChild(titleAmountCell);
                table.appendChild(titleRow);
            container.appendChild(table);
                
                var ammos = gameinfo.characters[sessionStorage.charid].ammo;
                
                for(var x in ammos)
                {
                    if(ammos[x].amount) table.appendChild(ammosRowCreate(ammos[x]));
                }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }