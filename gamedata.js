(function gamedataload()
{
    try
    {
        var gamedata = 
        {
			companies:
			{
				emf: new company("emf", "EMF - Earth Mothership Factory"),
                pdm: new company("pdm", "PDM - Planet Defender Military"),
                idf: new company("idf", "IDF - Interplanetary Destroyer Forces"),
                gaa: new company("gaa", "GAA - Galactic Assassin Alliance"),
                mfa: new company("mfa", "MFA - Mining and Forwarding Association"),
                cri: new company("cri", "CRI - Central Researcher Institute")
			},
			
            items:
            {
                // new ship("itemid", "company", "name", level, construction, craftprice, sellprice, buyprice, corehull, cannonslot, maxcannonlevel, rocketlauncherslot, maxrocketlauncherlevel, rifleslot, maxriflelevel, shieldslot, maxshieldlevel, hullslot, maxhulllevel, generatorslot, maxgeneratorlevel, batteryslot, maxbatterylevel, hangarslot, maxhangarlevel, maxsquadronlevel, equipmentslot, extenderslot, maxextenderlevel, basiccargo, basicammostorage),
                emf01: new ship("emf01", "emf", "EMF01 - Suzanna", 1, 1000, 1000, 3000, 9000, 30000, 2, 1, 1, 1, 2, 1, 3, 1, 3, 1, 5, 1, 3, 1, 3, 1, 1, 1, 0, 0, 10, 3000),
                emf02: new ship("emf02", "emf", "EMF02 - Anastazia", 2, 2000, 2000, 6000, 18000, 45000, 3, 2, 2, 2, 4, 2, 6, 2, 6, 2, 10, 2, 6, 2, 4, 1, 2, 1, 0, 0, 15, 4500),
                emf03: new ship("emf03", "emf", "EMF03 - Evelyn", 3, 4000, 4000, 12000, 36000, 65000, 6, 3, 3, 3, 6, 3, 9, 3, 9, 3, 15, 3, 9, 3, 4, 2, 3, 2, 1, 1, 25, 6000),
                emf04: new ship("emf04", "emf", "EMF04 - Maria", 4, 7000, 7000, 21000, 61000, 100000, 8, 4, 4, 4, 8, 4, 12, 4, 21, 4, 20, 4, 12, 4, 5, 2, 4, 2, 1, 1, 40, 9000),
                emf05: new ship("emf05", "emf", "EMF05 - Barbara", 5, 10000, 10000, 30000, 90000, 150000, 10, 5, 5, 5, 10, 5, 15, 5, 15, 5, 25, 5, 15, 5, 6, 2, 5, 2, 2, 1, 60, 15000),
                emf06: new ship("emf06", "emf", "EMF06 - Teresa", 6, 14000, 14000, 42000, 126000, 225000, 12, 6, 6, 6, 12, 6, 18, 6, 18, 6, 30, 6, 18, 6, 7, 2, 6, 3, 2, 2, 100, 22500),
                emf07: new ship("emf07", "emf", "EMF07 - Celina", 7, 18000, 18000, 54000, 162000, 350000, 14, 7, 7, 7, 14, 7, 21, 7, 21, 7, 35, 7, 21, 7, 7, 3, 7, 3, 3, 2, 150, 30000),
                emf08: new ship("emf08", "emf", "EMF08 - Isabella", 8, 23000, 23000, 69000, 207000, 500000, 16, 8, 8, 8, 16, 8, 24, 8, 24, 8, 40, 8, 24, 8, 8, 3, 8, 4, 4, 2, 250, 52500),
                emf09: new ship("emf09", "emf", "EMF09 - Elizabeth", 9, 29000, 29000, 87000, 261000, 750000, 18, 9, 9, 9, 18, 9, 27, 9, 27, 9, 45, 9, 27, 9, 9, 3, 9, 5, 5, 3, 400, 75000),
                emf10: new ship("emf10", "emf", "EMF10 - Amanda", 10, 35000, 35000, 105000, 315000, 110000, 20, 10, 10, 10, 20, 10, 30, 10, 30, 10, 50, 10, 30, 10, 10, 3, 10, 6, 6, 3, 750, 150000),
                
                pdm01: new ship("pdm01", "pdm", "PDM01 - Phalanx", 1, 1000, 1000, 3000, 9000, 20000, 2, 1, 2, 1, 3, 1, 7, 1, 2, 1, 4, 1, 2, 1, 1, 1, 1, 1, 0, 0, 10, 1500),
                pdm02: new ship("pdm02", "pdm", "PDM02 - Guardian", 2, 2000, 2000, 6000, 18000, 30000, 4, 2, 4, 2, 6, 2, 14, 2, 4, 2, 8, 2, 4, 2, 2, 1, 2, 1, 0, 0, 15, 3000),
                pdm03: new ship("pdm03", "pdm", "PDM03 - Colossus", 3, 4000, 4000, 12000, 36000, 45000, 6, 3, 6, 3, 9, 3, 21, 3, 6, 3, 12, 3, 6, 3, 2, 2, 3, 2, 1, 1, 25, 6000),
                pdm04: new ship("pdm04", "pdm", "PDM04 - Paladin", 4, 7000, 7000, 21000, 63000, 65000, 8, 4, 8, 4, 12, 4, 28, 4, 8, 4, 16, 4, 8, 4, 2, 2, 4, 2, 2, 1, 40, 10000),
                pdm05: new ship("pdm05", "pdm", "PDM05 - Tenacity", 5, 10000, 10000, 30000, 90000, 100000, 10, 5, 10, 5, 15, 5, 35, 5, 10, 5, 20, 5, 10, 5, 3, 2, 5, 2, 2, 2, 60, 15000),
                pdm06: new ship("pdm06", "pdm", "PDM06 - Courage", 6, 14000, 14000, 42000, 126000, 150000, 12, 6, 12, 6, 18, 6, 24, 6, 12, 6, 24, 6, 12, 6, 3, 2, 6, 3, 3, 2, 100, 20000),
                pdm07: new ship("pdm07", "pdm", "PDM07 - Salvation", 7, 18000, 18000, 54000, 162000, 225000, 14, 7, 14, 7, 21, 7, 49, 7, 14, 7, 28, 7, 14, 7, 3, 2, 7, 3, 4, 2, 150, 30000),
                pdm08: new ship("pdm08", "pdm", "PDM08 - Invincible", 8, 23000, 23000, 69000, 207000, 350000, 16, 8, 16, 8, 24, 8, 56, 7, 16, 7, 32, 7, 16, 8, 4, 2, 8, 4, 4, 2, 250, 45000),
                pdm09: new ship("pdm09", "pdm", "PDM09 - Immortal", 9, 29000, 29000, 87000, 261000, 500000, 18, 9, 18, 9, 27, 9, 63, 9, 18, 9, 36, 9, 18, 9, 4, 3, 9, 5, 5, 3, 400, 60000),
                pdm10: new ship("pdm10", "pdm", "PDM10 - Paramount", 10, 35000, 35000, 105000, 315000, 750000, 20, 10, 20, 10, 30, 10, 70, 10, 20, 10, 40, 10, 20, 10, 5, 3, 10, 6, 6, 3, 750, 75000),
                
                idf01: new ship("idf01", "idf", "IDF01 - Striker", 1, 1000, 1000, 3000, 9000, 60000, 2, 1, 6, 1, 3, 1, 2, 1, 6, 1, 4, 1, 2, 1, 1, 1, 1, 1, 0, 0, 10, 3000),
                idf02: new ship("idf02", "idf", "IDF02 - Intruder", 2, 2000, 2000, 6000, 18000, 90000, 4, 2, 12, 2, 6, 2, 4, 2, 12, 2, 8, 2, 4, 2, 2, 1, 2, 1, 0, 0, 15, 4500),
                idf03: new ship("idf03", "idf", "IDF03 - Executor", 3, 4000, 4000, 12000, 36000, 135000, 6, 3, 18, 3, 9, 3, 6, 3, 18, 3, 12, 3, 6, 3, 2, 2, 3, 2, 1, 1, 25, 70000),
                idf04: new ship("idf04", "idf", "IDF04 - Annihilator", 4, 7000, 7000, 21000, 63000, 200000, 8, 4, 24, 4, 12, 4, 8, 4, 24, 4, 16, 4, 8, 4, 2, 2, 4, 2, 1, 1, 40, 10000),
                idf05: new ship("idf05", "idf", "IDF05 - Ravager", 5, 10000, 10000, 30000, 90000, 300000, 10, 5, 30, 5, 15, 5, 10, 5, 30, 5, 20, 5, 10, 5, 3, 2, 5, 2, 2, 1, 60, 15000),
                idf06: new ship("idf06", "idf", "IDF06 - Destructor", 6, 14000, 14000, 42000, 126000, 450000, 12, 6, 36, 6, 18, 6, 12, 6, 36, 6, 24, 6, 12, 6, 3, 2, 6, 3, 2, 2, 100, 24000),
                idf07: new ship("idf07", "idf", "IDF07 - Destroyer", 7, 18000, 18000, 54000, 162000, 680000, 14, 7, 42, 7, 21, 7, 14, 7, 42, 7, 28, 7, 14, 7, 3, 2, 7, 3, 3, 2, 150, 35000),
                idf08: new ship("idf08", "idf", "IDF08 - Devastator", 8, 23000, 23000, 69000, 207000, 1000000, 16, 8, 48, 8, 24, 8, 16, 8, 48, 8, 32, 8, 16, 8, 4, 2, 8, 4, 4, 2, 250, 50000),
                idf09: new ship("idf09", "idf", "IDF09 - Exterminator", 9, 29000, 29000, 87000, 261000, 1500000, 18, 9, 54, 9, 27, 9, 18, 9, 54, 9, 36, 9, 18, 9, 4, 3, 9, 5, 5, 3, 400, 70000),
                idf10: new ship("idf10", "idf", "IDF10 - Conqueror", 10, 35000, 35000, 105000, 315000, 2300000, 20, 10, 60, 10, 30, 10, 20, 10, 60, 10, 40, 10, 20, 10, 5, 3, 10, 6, 6, 3, 750, 100000),
                
                gaa01: new ship("gaa01", "gaa", "GAA01 - Wraith", 1, 1000, 1000, 3000, 9000, 30000, 6, 1, 3, 1, 3, 1, 2, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 0, 0, 10, 3000),
                gaa02: new ship("gaa02", "gaa", "GAA02 - Lullaby", 2, 2000, 2000, 6000, 18000, 45000, 12, 2, 6, 2, 6, 2, 4, 2, 6, 2, 6, 2, 6, 2, 2, 1, 2, 1, 0, 0, 15, 4500),
                gaa03: new ship("gaa03", "gaa", "GAA03 - Poltergeist", 3, 4000, 4000, 12000, 36000, 65000, 18, 3, 9, 3, 9, 3, 6, 3, 9, 3, 9, 3, 9, 3, 2, 2, 3, 2, 1, 1, 25, 6000),
                gaa04: new ship("gaa04", "gaa", "GAA04 - Ghost", 4, 7000, 7000, 21000, 63000, 100000, 24, 4, 12, 4, 12, 4, 8, 4, 12, 4, 12, 4, 12, 4, 2, 2, 4, 2, 1, 1, 40, 10000),
                gaa05: new ship("gaa05", "gaa", "GAA05 - Shade", 5, 100000, 10000, 30000, 90000, 150000, 30, 5, 15, 5, 15, 5, 10, 5, 15, 5, 15, 5, 15, 5, 3, 2, 5, 2, 2, 1, 60, 15000),
                gaa06: new ship("gaa06", "gaa", "GAA06 - Revanant", 6, 14000, 14000, 42000, 126000, 225000, 36, 6, 18, 6, 18, 6, 12, 6, 18, 6, 18, 6, 18, 6, 3, 2, 6, 3, 2, 2, 100, 21000),
                gaa07: new ship("gaa07", "gaa", "GAA07 - Specter", 7, 18000, 18000, 54000, 162000, 350000, 42, 7, 21, 7, 21, 7, 14, 7, 21, 7, 21, 7, 21, 7, 3, 2, 7, 3, 3, 2, 150, 30000),
                gaa08: new ship("gaa08", "gaa", "GAA08 - Nightmare", 8, 23000, 23000, 69000, 207000, 500000, 48, 8, 24, 8, 24, 8, 16, 8, 24, 8, 24, 8, 24, 8, 4, 2, 8, 4, 4, 2, 250, 40000),
                gaa09: new ship("gaa09", "gaa", "GAA09 - Demon", 9, 29000, 29000, 87000, 261000, 750000, 54, 9, 27, 9, 27, 9, 18, 9, 27, 9, 27, 9, 27, 9, 4, 3, 9, 5, 5, 3, 400, 55000),
                gaa10: new ship("gaa10", "gaa", "GAA10 - Phantom", 10, 35000, 35000, 105000, 315000, 1100000, 60, 10, 30, 10, 30, 10, 20, 10, 30, 10, 30, 10, 30, 10, 5, 3, 10, 6, 6, 3, 750, 75000),
                
                mfa01: new ship("mfa01", "mfa", "MFA01 - Minotaur", 1, 1000, 1000, 3000, 9000, 50000, 3, 1, 3, 1, 5, 1, 3, 1, 4, 1, 4, 1, 2, 1, 1, 1, 1, 1, 0, 0, 15, 2000),
                mfa02: new ship("mfa02", "mfa", "MFA02 - Leviathan", 2, 2000, 2000, 6000, 18000, 75000, 6, 2, 6, 2, 10, 2, 6, 2, 8, 2, 8, 2, 4, 2, 2, 1, 2, 1, 0, 0, 23, 3000),
                mfa03: new ship("mfa03", "mfa", "MFA03 - Pegasus", 3, 4000, 4000, 12000, 36000, 110000, 9, 3, 9, 3, 15, 3, 9, 3, 12, 3, 12, 3, 6, 3, 2, 2, 3, 1, 1, 1, 38, 5000),
                mfa04: new ship("mfa04", "mfa", "MFA04 - Griffin", 4, 7000, 7000, 21000, 63000, 170000, 12, 4, 12, 4, 20, 4, 12, 4, 16, 4, 16, 4, 8, 4, 2, 2, 4, 2, 1, 1, 60, 9000),
                mfa05: new ship("mfa05", "mfa", "MFA05 - Siren", 5, 10000, 10000, 30000, 90000, 250000, 15, 5, 15, 5, 25, 5, 15, 5, 20, 5, 20, 5, 10, 5, 3, 2, 5, 2, 2, 1, 90, 150000),
                mfa06: new ship("mfa06", "mfa", "MFA06 - Zephyr", 6, 14000, 14000, 42000, 126000, 380000, 18, 6, 18, 6, 30, 6, 18, 6, 24, 6, 24, 6, 12, 6, 3, 2, 6, 3, 2, 2, 150, 22000),
                mfa07: new ship("mfa07", "mfa", "MFA07 - Chimera", 7, 18000, 18000, 54000, 162000, 570000, 21, 7, 21, 7, 35, 7, 21, 7, 28, 7, 28, 7, 14, 7, 3, 2, 7, 3, 3, 2, 225, 30000),
                mfa08: new ship("mfa08", "mfa", "MFA08 - Phoenix", 8, 23000, 23000, 69000, 207000, 850000, 24, 8, 24, 8, 40, 8, 24, 8, 32, 8, 32, 8, 16, 8, 4, 2, 8, 4, 4, 2, 375, 40000),
                mfa09: new ship("mfa09", "mfa", "MFA09 - Wywern", 9, 29000, 29000, 87000, 261000, 1300000, 27, 9, 27, 9, 45, 9, 27, 9, 36, 9, 36, 9, 18, 9, 4, 3, 9, 5, 5, 3, 600, 55000),
                mfa10: new ship("mfa10", "mfa", "MFA10 - Seraphim", 10, 35000, 35000, 105000, 315000, 1900000, 30, 10, 30, 10, 50, 10, 30, 10, 40, 10, 40, 10, 20, 10, 5, 3, 10, 6, 6, 3, 1125, 70000),
                
                cri01: new ship("cri01", "cri", "CRI01 - Andromeda", 1, 1000, 1000, 3000, 9000, 40000, 4, 1, 2, 1, 3, 1, 4, 1, 3, 1, 6, 1, 3, 1, 1, 1, 1, 1, 1, 1, 10, 3000),
                cri02: new ship("cri02", "cri", "CRI02 - Draco", 2, 2000, 2000, 6000, 18000, 60000, 8, 2, 4, 2, 6, 2, 8, 2, 6, 2, 12, 2, 6, 2, 2, 1, 2, 3, 1, 1, 15, 4500),
                cri03: new ship("cri03", "cri", "CRI03 - Gemini", 3, 4000, 4000, 12000, 36000, 90000, 12, 3, 6, 3, 9, 3, 12, 3, 9, 3, 18, 3, 9, 3, 2, 2, 3, 4, 2, 1, 25, 7000),
                cri04: new ship("cri04", "cri", "CRI04 - Hydra", 4, 7000, 7000, 21000, 63000, 130000, 16, 4, 8, 4, 12, 4, 16, 4, 12, 4, 24, 4, 12, 4, 2, 2, 4, 5, 2, 1, 40, 10000),
                cri05: new ship("cri05", "cri", "CRI05 - Lynx", 5, 10000, 10000, 30000, 90000, 200000, 20, 5, 10, 5, 15, 5, 20, 5, 15, 5, 30, 5, 15, 5, 3, 2, 5, 5, 2, 2, 60, 15000),
                cri06: new ship("cri06", "cri", "CRI06 - Orion", 6, 14000, 14000, 42000, 126000, 300000, 24, 6, 12, 6, 18, 6, 24, 6, 18, 6, 36, 6, 18, 6, 3, 2, 6, 6, 3, 2, 100, 22000),
                cri07: new ship("cri07", "cri", "CRI07 - Pisces", 7, 18000, 18000, 54000, 162000, 450000, 28, 7, 14, 7, 21, 7, 28, 7, 21, 7, 42, 7, 21, 7, 3, 3, 7, 7, 4, 2, 150, 30000),
                cri08: new ship("cri08", "cri", "CRI08 - Saggitarius", 8, 23000, 23000, 69000, 207000, 680000, 32, 8, 16, 8, 24, 8, 32, 8, 24, 8, 48, 8, 24, 8, 4, 3, 8, 8, 5, 3, 250, 40000),
                cri09: new ship("cri09", "cri", "CRI09 - Serpens", 9, 29000, 29000, 87000, 261000, 1000000, 36, 9, 18, 9, 27, 9, 36, 9, 27, 9, 54, 9, 27, 9, 5, 3, 9, 9, 6, 3, 400, 55000),
                cri10: new ship("cri10", "cri", "CRI10 - Taurus", 10, 35000, 35000, 105000, 315000, 1500000, 40, 10, 20, 10, 30, 10, 40, 10, 30, 10, 60, 10, 30, 10, 6, 3, 10, 10, 7, 3, 750, 75000),
                
                // new squadron("itemid", "name", level, construction, craftprice, sellprice, buyprice, corehull, weaponslot, maxweaponlevel, shieldslot, maxshieldlevel, hullslot, maxhulllevel, batteryslot, maxbatterylevel, basicammostorage),
                sqa01: new squadron("sqa01", "SQA01 - Grasshopper", 1, 500, 500, 1500, 4500, 2000, 2, 1, 3, 1, 2, 1, 2, 1, 50),
                sqa02: new squadron("sqa02", "SQA02 - Mantis", 2, 750, 750, 2250, 6750, 3500, 4, 2, 6, 2, 4, 2, 4, 2, 150),
                sqa03: new squadron("sqa03", "SQA03 - Ant", 3, 1000, 1000, 3000, 9000, 5500, 6, 3, 9, 3, 6, 3, 6, 3, 400),
                sqa04: new squadron("sqa04", "SQA04 - Dragonfly", 4, 1500, 1500, 4500, 13500, 8000, 8, 4, 12, 4, 8, 4, 8, 4, 600),
                sqa05: new squadron("sqa05", "SQA05 - Moth", 5, 2000, 2000, 6000, 18000, 11000, 10, 5, 15, 5, 10, 5, 10, 5, 900),
                sqa06: new squadron("sqa06", "SQA06 - Mosquitoe", 6, 2500, 2500, 7500, 22500, 15000, 12, 6, 18, 6, 12, 6, 12, 6, 1500),
                sqa07: new squadron("sqa07", "SQA07 - Wasp", 7, 3000, 3000, 9000, 27000, 22000, 14, 7, 21, 7, 14, 7, 14, 7, 2500),
                sqa08: new squadron("sqa08", "SQA08 - Tarantula", 8, 3500, 3500, 10500, 31500, 35000, 16, 8, 24, 8, 16, 8, 16, 8, 4500),
                sqa09: new squadron("sqa09", "SQA09 - Scorpion", 9, 4000, 4000, 12000, 36000, 50000, 18, 9, 27, 9, 18, 9, 18, 9, 7000),
                sqa10: new squadron("sqa10", "SQA10 - Black Widow", 10, 5000, 5000, 15000, 45000, 75000, 20, 10, 30, 10, 20, 10, 20, 10, 10000),
                
                //can0: new cannon(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage),
                can01: new cannon("can01", "CAN01 - Ágyú Mk.I", 1, 350, 350, 1050, 3150, 1500, 1500, 1, 10),
                can02: new cannon("can02", "CAN02 - Ágyú Mk.II", 2, 500, 500, 1500, 4500, 3000, 3000, 2, 20),
                can03: new cannon("can03", "CAN03 - Ágyú Mk.III", 3, 850, 850, 2550, 7650, 4500, 4500, 3, 30),
                can04: new cannon("can04", "CAN04 - Ágyú Mk.IV", 4, 1200, 1200, 3600, 10800, 6000, 6000, 4, 40),
                can05: new cannon("can05", "CAN05 - Ágyú Mk.V", 5, 1600, 1600, 4800, 14400, 7500, 7500, 5, 50),
                can06: new cannon("can06", "CAN06 - Ágyú Mk.VI", 6, 2000, 2000, 6000, 18000, 9000, 9000, 6, 60),
                can07: new cannon("can07", "CAN07 - Ágyú Mk.VII", 7, 2500, 2500, 7500, 22500, 10500, 10500, 7, 70),
                can08: new cannon("can08", "CAN08 - Ágyú Mk.VIII", 8, 3000, 3000, 9000, 27000, 12000, 12000, 8, 80),
                can09: new cannon("can09", "CAN09 - Ágyú Mk.IX", 9, 3500, 3500, 10500, 31500, 13500, 13500, 9, 90),
                can10: new cannon("can10", "CAN10 - Ágyú Mk.X", 10, 4500, 4500, 13500, 40500, 15000, 15000, 10, 100),
                
                pul01: new pulse("pul01", "PUL01 - Pulzuságyú Mk.I", 1, 350, 350, 1050, 3250, 750, 2250, 1, 30),
                pul02: new pulse("pul02", "PUL02 - Pulzuságyú Mk.II", 2, 500, 500, 1500, 4500, 1500, 4500, 2, 60),
                pul03: new pulse("pul03", "PUL03 - Pulzuságyú Mk.III", 3, 850, 850, 2550, 7650, 2250, 6750, 3, 90),
                pul04: new pulse("pul04", "PUL04 - Pulzuságyú Mk.IV", 4, 1200, 1200, 3600, 10800, 3000, 9000, 4, 120),
                pul05: new pulse("pul05", "PUL05 - Pulzuságyú Mk.V", 5, 1600, 1600, 4800, 14411, 3750, 11250, 5, 150),
                pul06: new pulse("pul06", "PUL06 - Pulzuságyú Mk.VI", 6, 2000, 2000, 6000, 18000, 4500, 13500, 6, 180),
                pul07: new pulse("pul07", "PUL07 - Pulzuságyú Mk.VII", 7, 2500, 2500, 7500, 22500, 5250, 15750, 7, 210),
                pul08: new pulse("pul08", "PUL08 - Pulzuságyú Mk.VIII", 8, 3000, 3000, 9000, 27000, 6000, 18000, 8, 240),
                pul09: new pulse("pul09", "PUL09 - Pulzuságyú Mk.IX", 9, 3500, 3500, 10500, 31500, 6750, 20250, 9, 170),
                pul10: new pulse("pul10", "PUL10 - Pulzuságyú Mk.X", 10, 4500, 4500, 13500, 40500, 7500, 22500, 10, 300),
                
                // new rifle(itemid, name, level, construction, craftprice, sellprice, buyprice, squadrondamage, ammousage, energyusage),
                rif01: new rifle("rif01", "RIF01 - Gépágyú Mk.I", 1, 350, 350, 1050, 3150, 200, 1, 10),
                rif02: new rifle("rif02", "RIF02 - Gépágyú Mk.II", 2, 500, 500, 1500, 4500, 400, 2, 20),
                rif03: new rifle("rif03", "RIF03 - Gépágyú Mk.III", 3, 850, 850, 2550, 7650, 600, 3, 30),
                rif04: new rifle("rif04", "RIF04 - Gépágyú Mk.IV", 4, 1200, 1200, 3600, 10800, 800, 4, 40),
                rif05: new rifle("rif05", "RIF05 - Gépágyú Mk.V", 5, 1600, 1600, 4800, 14400, 1000, 5, 50),
                rif06: new rifle("rif06", "RIF06 - Gépágyú Mk.VI", 6, 2000, 2000, 6000, 18000, 1200, 6, 60),
                rif07: new rifle("rif07", "RIF07 - Gépágyú Mk.VII", 7, 2500, 2500, 7500, 22500, 1400, 7, 70),
                rif08: new rifle("rif08", "RIF08 - Gépágyú Mk.VIII", 8, 3000, 3000, 9000, 27000, 1600, 8, 80),
                rif09: new rifle("rif09", "RIF09 - Gépágyú Mk.IX", 9, 3500, 3500, 10500, 31500, 1800, 9, 90),
                rif10: new rifle("rif10", "RIF10 - Gépágyú Mk.X", 10, 4500, 4500, 13500, 40500, 2000, 10, 100),
                
                // new rocketlauncher(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage),
                rla01: new rocketlauncher("rla01", "RLA01 - Rakétakilövő Mk.I", 1, 400, 400, 1200, 3600, 5000, 5000, 1, 20),
                rla02: new rocketlauncher("rla02", "RLA02 - Rakétakilövő Mk.II", 2, 800, 800, 2400, 7200, 10000, 10000, 2, 40),
                rla03: new rocketlauncher("rla03", "RLA03 - Rakétakilövő Mk.III", 3, 1200, 1200, 3600, 10800, 15000, 15000, 3, 60),
                rla04: new rocketlauncher("rla04", "RLA04 - Rakétakilövő Mk.IV", 4, 1600, 1600, 4800, 14400, 20000, 20000, 4, 80),
                rla05: new rocketlauncher("rla05", "RLA05 - Rakétakilövő Mk.V", 5, 2000, 2000, 6000, 18000, 25000, 25000, 5, 100),
                rla06: new rocketlauncher("rla06", "RLA06 - Rakétakilövő Mk.VI", 6, 2500, 2500, 7500, 22500, 30000, 30000, 6, 120),
                rla07: new rocketlauncher("rla07", "RLA07 - Rakétakilövő Mk.VII", 7, 3000, 3000, 9000, 27000, 35000, 35000, 7, 140),
                rla08: new rocketlauncher("rla08", "RLA08 - Rakétakilövő Mk.VIII", 8, 3500, 3500, 10500, 31500, 40000, 40000, 8, 160),
                rla09: new rocketlauncher("rla09", "RLA09 - Rakétakilövő Mk.IX", 9, 4000, 4000, 12000, 36000, 45000, 45000, 9, 180),
                rla10: new rocketlauncher("rla10", "RLA10 - Rakétakilövő Mk.X", 10, 5000, 5000, 15000, 45000, 50000, 50000, 10, 200),
                
                sla01:  new sablauncher("sla01", "SLA01 - SAB Rakétakilövő Mk.I", 1, 400, 400, 1200, 3600, 2500, 7500, 1, 60),
                sla02:  new sablauncher("sla02", "SLA02 - SAB Rakétakilövő Mk.II", 2, 800, 800, 2400, 7200, 5000, 15000, 2, 120),
                sla03:  new sablauncher("sla03", "SLA03 - SAB Rakétakilövő Mk.III", 3, 1200, 1200, 3600, 10800, 7500, 22500, 3, 180),
                sla04:  new sablauncher("sla04", "SLA04 - SAB Rakétakilövő Mk.IV", 4, 1600, 1600, 4800, 14400, 10000, 30000, 4, 240),
                sla05:  new sablauncher("sla05", "SLA05 - SAB Rakétakilövő Mk.V", 5, 2000, 2000, 6000, 18000, 12500, 37500, 5, 300),
                sla06:  new sablauncher("sla06", "SLA06 - SAB Rakétakilövő Mk.VI", 6, 2500, 2500, 7500, 22500, 15000, 45000, 6, 360),
                sla07:  new sablauncher("sla07", "SLA07 - SAB Rakétakilövő Mk.VII", 7, 3000, 3000, 9000, 27000, 17500, 52500, 7, 420),
                sla08:  new sablauncher("sla08", "SLA08 - SAB Rakétakilövő Mk.VIII", 8, 3500, 3500, 10500, 31500, 20000, 60000, 8, 480),
                sla09:  new sablauncher("sla09", "SLA09 - SAB Rakétakilövő Mk.IX", 9, 4000, 4000, 12000, 36000, 22500, 67500, 9, 540),
                sla10:  new sablauncher("sla10", "SLA10 - SAB Rakétakilövő Mk.X", 10, 5000, 5000, 15000, 45000, 25000, 75000, 10, 600),
                
                //new squadronrifle(itemid, name, level, construction, craftprice, sellprice, buyprice, squadrondamage, ammousage, energyusage),
                sri01: new squadronrifle("sri01", "SRI01 - Raj Gépágyú Mk.I", 1, 200, 200, 600, 1800, 500, 1, 5),
                sri02: new squadronrifle("sri02", "SRI02 - Raj Gépágyú Mk.II", 2, 300, 300, 900, 2700, 1000, 2, 10),
                sri03: new squadronrifle("sri03", "SRI03 - Raj Gépágyú Mk.III", 3, 400, 400, 1200, 3600, 1500, 3, 15),
                sri04: new squadronrifle("sri04", "SRI04 - Raj Gépágyú Mk.IV", 4, 500, 500, 1500, 4500, 2000, 4, 20),
                sri05: new squadronrifle("sri05", "SRI05 - Raj Gépágyú Mk.V", 5, 700, 700, 2100, 6300, 2500, 5, 25),
                sri06: new squadronrifle("sri06", "SRI06 - Raj Gépágyú Mk.VI", 6, 900, 900, 2700, 8100, 3000, 6, 30),
                sri07: new squadronrifle("sri07", "SRI07 - Raj Gépágyú Mk.VII", 7, 1100, 1100, 3300, 9900, 3500, 7, 35),
                sri08: new squadronrifle("sri08", "SRI08 - Raj Gépágyú Mk.VIII", 8, 1400, 1400, 4200, 12600, 4000, 8, 40),
                sri09: new squadronrifle("sri09", "SRI09 - Raj Gépágyú Mk.IX", 9, 1700, 1700, 5100, 15300, 4500, 9, 45),
                sri10: new squadronrifle("sri10", "SRI10 - Raj Gépágyú Mk.X", 10, 2000, 2000, 6000, 18000, 5000, 10, 50),
                
                //new squadroncannon(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage),
                sca01: new squadroncannon("sca01", "SCA01 - Raj Ágyú Mk.I", 1, 200, 200, 600, 1800, 1000, 1000, 1, 5),
                sca02: new squadroncannon("sca02", "SCA02 - Raj Ágyú Mk.II", 2, 300, 300, 900, 2700, 2000, 2000, 2, 10),
                sca03: new squadroncannon("sca03", "SCA03 - Raj Ágyú Mk.III", 3, 400, 400, 1200, 3600, 3000, 3000, 3, 15),
                sca04: new squadroncannon("sca04", "SCA04 - Raj Ágyú Mk.IV", 4, 500, 500, 1500, 4500, 4000, 4000, 4, 20),
                sca05: new squadroncannon("sca05", "SCA05 - Raj Ágyú Mk.V", 5, 700, 700, 2100, 6300, 5000, 5000, 5, 25),
                sca06: new squadroncannon("sca06", "SCA06 - Raj Ágyú Mk.VI", 6, 900, 900, 2700, 8100, 6000, 6000, 6, 30),
                sca07: new squadroncannon("sca07", "SCA07 - Raj Ágyú Mk.VII", 7, 1100, 1100, 3300, 9900, 7000, 7000, 7, 35),
                sca08: new squadroncannon("sca08", "SCA08 - Raj Ágyú Mk.VIII", 8, 1400, 1400, 4200, 12600, 8000, 8000, 8, 40),
                sca09: new squadroncannon("sca09", "SCA09 - Raj Ágyú Mk.IX", 9, 1700, 1700, 5100, 15300, 9000, 9000, 9, 45),
                sca10: new squadroncannon("sca10", "SCA10 - Raj Ágyú Mk.X", 10, 2000, 2000, 6000, 18000, 10000, 10000, 10, 50),
                
                spu01: new squadronpulse("spu01", "SPU01 - Raj Pulzuságyú Mk.I", 1, 200, 200, 600, 1800, 500, 1500, 1, 15),
                spu02: new squadronpulse("spu02", "SPU02 - Raj Pulzuságyú Mk.II", 2, 300, 300, 900, 2700, 1000, 3000, 2, 30),
                spu03: new squadronpulse("spu03", "SPU03 - Raj Pulzuságyú Mk.III", 3, 400, 400, 1200, 3600, 1500, 4500, 3, 45),
                spu04: new squadronpulse("spu04", "SPU04 - Raj Pulzuságyú Mk.IV", 4, 500, 500, 1500, 4500, 2000, 6000, 4, 60),
                spu05: new squadronpulse("spu05", "SPU05 - Raj Pulzuságyú Mk.V", 5, 700, 700, 2100, 6300, 2500, 7500, 5, 75),
                spu06: new squadronpulse("spu06", "SPU06 - Raj Pulzuságyú Mk.VI", 6, 900, 900, 2700, 8100, 3000, 9000, 6, 90),
                spu07: new squadronpulse("spu07", "SPU07 - Raj Pulzuságyú Mk.VII", 7, 1100, 1100, 3300, 9900, 3500, 10500, 7, 105),
                spu08: new squadronpulse("spu08", "SPU08 - Raj Pulzuságyú Mk.VIII", 8, 1400, 1400, 4200, 12600, 4000, 12000, 8, 120),
                spu09: new squadronpulse("spu09", "SPU09 - Raj Pulzuságyú Mk.IX", 9, 1700, 1700, 5100, 15300, 4500, 13500, 9, 135),
                spu10: new squadronpulse("spu10", "SPU10 - Raj Pulzuságyú Mk.X", 10, 2000, 2000, 6000, 18000, 5000, 15000, 10, 150),
                
                //new highcapacityshield(itemid, name, level, construction, craftprice, sellprice, buyprice, shieldenergy, recharge, energyusage),
                hcs01: new highcapacityshield("hcs01", "HCS01 - Csatahajó Pajzs Mk.I", 1, 400, 400, 1200, 3600, 20000, 500, 50),
                hcs02: new highcapacityshield("hcs02", "HCS02 - Csatahajó Pajzs Mk.II", 2, 700, 700, 2100, 6300, 40000, 1000, 100),
                hcs03: new highcapacityshield("hcs03", "HCS03 - Csatahajó Pajzs Mk.III", 3, 1000, 1000, 3000, 9000, 60000, 1500, 150),
                hcs04: new highcapacityshield("hcs04", "HCS04 - Csatahajó Pajzs Mk.IV", 4, 1300, 1300, 3900, 11700, 80000, 2000, 200),
                hcs05: new highcapacityshield("hcs05", "HCS05 - Csatahajó Pajzs Mk.V", 5, 1700, 1700, 5100, 15300, 100000, 2500, 250),
                hcs06: new highcapacityshield("hcs06", "HCS06 - Csatahajó Pajzs Mk.VI", 6, 2200, 2200, 6600, 19800, 120000, 3000, 300),
                hcs07: new highcapacityshield("hcs07", "HCS07 - Csatahajó Pajzs Mk.VII", 7, 2700, 2700, 8100, 24300, 140000, 3500, 350),
                hcs08: new highcapacityshield("hcs08", "HCS08 - Csatahajó Pajzs Mk.VIII", 8, 3300, 3300, 9900, 29700, 160000, 4000, 400),
                hcs09: new highcapacityshield("hcs09", "HCS09 - Csatahajó Pajzs Mk.IX", 9, 4000, 4000, 12000, 36000, 180000, 4500, 450),
                hcs10: new highcapacityshield("hcs10", "HCS10 - Csatahajó Pajzs Mk.X", 10, 5000, 5000, 15000, 45000, 200000, 5000, 500),
                
                qrs01: new quickrechargeshield("qrs01", "QRS01 - Csatahajó Györstöltő Pajzs Mk.I", 1, 400, 400, 1200, 3600, 10000, 1500, 100),
                qrs02: new quickrechargeshield("qrs02", "QRS02 - Csatahajó Györstöltő Pajzs Mk.II", 2, 700, 700, 2100, 6300, 20000, 3000, 200),
                qrs03: new quickrechargeshield("qrs03", "QRS03 - Csatahajó Györstöltő Pajzs Mk.III", 3, 1000, 1000, 3000, 9000, 30000, 4500, 300),
                qrs04: new quickrechargeshield("qrs04", "QRS04 - Csatahajó Györstöltő Pajzs Mk.IV", 4, 1300, 1300, 3900, 11700, 40000, 6000, 400),
                qrs05: new quickrechargeshield("qrs05", "QRS05 - Csatahajó Györstöltő Pajzs Mk.V", 5, 1700, 1700, 5100, 15300, 50000, 7500, 500),
                qrs06: new quickrechargeshield("qrs06", "QRS06 - Csatahajó Györstöltő Pajzs Mk.VI", 6, 2200, 2200, 6600, 19800, 60000, 9000, 600),
                qrs07: new quickrechargeshield("qrs07", "QRS07 - Csatahajó Györstöltő Pajzs Mk.VII", 7, 2700, 2700, 8100, 24300, 70000, 10500, 700),
                qrs08: new quickrechargeshield("qrs08", "QRS08 - Csatahajó Györstöltő Pajzs Mk.VIII", 8, 3300, 3300, 9900, 29700, 80000, 12000, 800),
                qrs09: new quickrechargeshield("qrs09", "QRS09 - Csatahajó Györstöltő Pajzs Mk.IX", 9, 4000, 4000, 12000, 36000, 90000, 13500, 900),
                qrs10: new quickrechargeshield("qrs10", "QRS10 - Csatahajó Györstöltő Pajzs Mk.X", 10, 5000, 5000, 15000, 45000, 100000, 15000, 1000),
                
                ssh01: new squadronshield("ssh01", "SSH01 - Raj Pajzs Mk.I", 1, 200, 200, 600, 1800, 2000, 100, 30),
                ssh02: new squadronshield("ssh02", "SSH02 - Raj Pajzs Mk.II", 2, 300, 300, 900, 2700, 4000, 200, 60),
                ssh03: new squadronshield("ssh03", "SSH03 - Raj Pajzs Mk.III", 3, 400, 400, 1200, 3600, 6000, 300, 90),
                ssh04: new squadronshield("ssh04", "SSH04 - Raj Pajzs Mk.IV", 4, 500, 500, 1500, 4500, 8000, 400, 120),
                ssh05: new squadronshield("ssh05", "SSH05 - Raj Pajzs Mk.V", 5, 700, 700, 2100, 6300, 10000, 500, 150),
                ssh06: new squadronshield("ssh06", "SSH06 - Raj Pajzs Mk.VI", 6, 900, 900, 2700, 8100, 12000, 600, 180),
                ssh07: new squadronshield("ssh07", "SSH07 - Raj Pajzs Mk.VII", 7, 1100, 1100, 3300, 9900, 14000, 700, 210),
                ssh08: new squadronshield("ssh08", "SSH08 - Raj Pajzs Mk.VIII", 8, 1400, 1400, 4200, 12600, 16000, 800, 240),
                ssh09: new squadronshield("ssh09", "SSH08 - Raj Pajzs Mk.IX", 9, 1700, 1700, 5100, 15300, 18000, 900, 270),
                ssh10: new squadronshield("ssh10", "SSH10 - Raj Pajzs Mk.X", 10, 2000, 2000, 6000, 18000, 20000, 1000, 300),
                
                sqr01: new squadronquickrechargeshield("sqr01", "SQR01 - Raj Gyorstöltő Pajzs Mk.I", 1, 200, 200, 600, 1800, 1000, 300, 60),
                sqr02: new squadronquickrechargeshield("sqr02", "SQR02 - Raj Gyorstöltő Pajzs Mk.II", 2, 300, 300, 900, 2700, 2000, 600, 120),
                sqr03: new squadronquickrechargeshield("sqr03", "SQR03 - Raj Gyorstöltő Pajzs Mk.III", 3, 400, 400, 1200, 3600, 3000, 900, 180),
                sqr04: new squadronquickrechargeshield("sqr04", "SQR04 - Raj Gyorstöltő Pajzs Mk.IV", 4, 500, 500, 1500, 4500, 4000, 1200, 240),
                sqr05: new squadronquickrechargeshield("sqr05", "SQR05 - Raj Gyorstöltő Pajzs Mk.V", 5, 700, 700, 2100, 6300, 5000, 1500, 300),
                sqr06: new squadronquickrechargeshield("sqr06", "SQR06 - Raj Gyorstöltő Pajzs Mk.VI", 6, 900, 900, 2700, 8200, 6000, 1800, 360),
                sqr07: new squadronquickrechargeshield("sqr07", "SQR07 - Raj Gyorstöltő Pajzs Mk.VII", 7, 1100, 1100, 3300, 9900, 7000, 2100, 420),
                sqr08: new squadronquickrechargeshield("sqr08", "SQR08 - Raj Gyorstöltő Pajzs Mk.VIII", 8, 1400, 1400, 4200, 12600, 8000, 2400, 480),
                sqr09: new squadronquickrechargeshield("sqr09", "SQR09 - Raj Gyorstöltő Pajzs Mk.IX", 9, 1700, 1700, 5100, 15300, 9000, 2700, 540),
                sqr10: new squadronquickrechargeshield("sqr10", "SQR10 - Raj Gyorstöltő Pajzs Mk.X", 10, 2000, 2000, 6000, 18000, 10000, 3000, 600),
                
                //new battleshiphull(itemid, name, level, construction, craftprice, sellprice, buyprice, hullenergy),
                bsh01: new battleshiphull("bsh01", "BSH01 - Csatahajó Burkolat Mk.I", 1, 400, 400, 1200, 3600, 10000),
                bsh02: new battleshiphull("bsh02", "BSH02 - Csatahajó Burkolat Mk.II", 2, 700, 700, 2100, 6300, 20000),
                bsh03: new battleshiphull("bsh03", "BSH03 - Csatahajó Burkolat Mk.III", 3, 1000, 1000, 3000, 9000, 30000),
                bsh04: new battleshiphull("bsh04", "BSH04 - Csatahajó Burkolat Mk.IV", 4, 1300, 1300, 3900, 11700, 40000),
                bsh05: new battleshiphull("bsh05", "BSH05 - Csatahajó Burkolat Mk.V", 5, 1700, 1700, 5100, 15300, 50000),
                bsh06: new battleshiphull("bsh06", "BSH06 - Csatahajó Burkolat Mk.VI", 6, 2200, 2200, 6600, 19800, 60000),
                bsh07: new battleshiphull("bsh07", "BSH07 - Csatahajó Burkolat Mk.VII", 7, 2700, 2700, 8100, 24300, 70000),
                bsh08: new battleshiphull("bsh08", "BSH08 - Csatahajó Burkolat Mk.VIII", 8, 3300, 3300, 9900, 29700, 80000),
                bsh09: new battleshiphull("bsh09", "BSH09 - Csatahajó Burkolat Mk.IX", 9, 4000, 4000, 12000, 36000, 90000),
                bsh10: new battleshiphull("bsh10", "BSH10 - Csatahajó Burkolat Mk.X", 10, 5000, 5000, 1500, 45000, 100000),
                
                sqh01: new squadronhull("sqh01", "SQH01 - Rajburkolat Mk.I", 1, 200, 200, 600, 1800, 1000),
                sqh02: new squadronhull("sqh02", "SQH02 - Rajburkolat Mk.II", 2, 300, 300, 900, 2700, 2000),
                sqh03: new squadronhull("sqh03", "SQH03 - Rajburkolat Mk.III", 3, 400, 400, 1200, 3600, 3000),
                sqh04: new squadronhull("sqh04", "SQH03 - Rajburkolat Mk.IV", 4, 500, 500, 1500, 4500, 4000),
                sqh05: new squadronhull("sqh05", "SQH04 - Rajburkolat Mk.V", 5, 700, 700, 2100, 6300, 5000),
                sqh06: new squadronhull("sqh06", "SQH05 - Rajburkolat Mk.VI", 6, 900, 900, 2700, 8100, 6000),
                sqh07: new squadronhull("sqh07", "SQH06 - Rajburkolat Mk.VII", 7, 1100, 1100, 3300, 9900, 7000),
                sqh08: new squadronhull("sqh08", "SQH07 - Rajburkolat Mk.VIII", 8, 1400, 1400, 4200, 12600, 8000),
                sqh09: new squadronhull("sqh09", "SQH08 - Rajburkolat Mk.IX", 9, 1700, 1700, 5100, 15300, 9000),
                sqh10: new squadronhull("sqh10", "SQH10 - Rajburkolat Mk.X", 10, 2000, 2000, 6000, 1800, 10000),
                
                //new generator(itemid, name, level, construction, craftprice, sellprice, buyprice, energyregen),
                gen01: new generator("gen01", "GEN01 - Generátor Mk.I", 1, 400, 400, 1200, 3600, 50),
                gen02: new generator("gen02", "GEN02 - Generátor Mk.II", 2, 700, 700, 2100, 6300, 100),
                gen03: new generator("gen03", "GEN03 - Generátor Mk.III", 3, 1000, 1000, 3000, 9000, 150),
                gen04: new generator("gen04", "GEN04 - Generátor Mk.IV", 4, 1300, 1300, 3900, 11700, 200),
                gen05: new generator("gen05", "GEN05 - Generátor Mk.V", 5, 1700, 5100, 5100, 15300, 250),
                gen06: new generator("gen06", "GEN06 - Generátor Mk.VI", 6, 2200, 2200, 6600, 19800, 300),
                gen07: new generator("gen07", "GEN07 - Generátor Mk.VII", 7, 2700, 2700, 8200, 24600, 350),
                gen08: new generator("gen08", "GEN08 - Generátor Mk.VIII", 8, 3300, 3300, 9900, 29700, 400),
                gen09: new generator("gen09", "GEN09 - Generátor Mk.IX", 9, 4000, 4000, 12000, 36000, 450),
                gen10: new generator("gen10", "GEN10 - Generátor Mk.X", 10, 5000, 5000, 15000, 45000, 500),
                
				//new battery(itemid, name, level, construction, craftprice, sellprice, buyprice, capacity, maxrecharge),
				bat01: new battery("bat01", "BAT01 - Akkumulátor Mk.I", 1, 200, 200, 600, 1800, 1000, 100),
				bat02: new battery("bat02", "BAT02 - Akkumulátor Mk.II", 2, 300, 300, 900, 2700, 2000, 200),
				bat03: new battery("bat03", "BAT03 - Akkumulátor Mk.III", 3, 400, 400, 1200, 3600, 3000, 300),
				bat04: new battery("bat04", "BAT04 - Akkumulátor Mk.IV", 4, 500, 500, 1500, 4500, 4000, 400),
				bat05: new battery("bat05", "BAT05 - Akkumulátor Mk.V", 5, 700, 700, 2100, 6300, 5000, 500),
				bat06: new battery("bat06", "BAT06 - Akkumulátor Mk.VI", 6, 900, 900, 2700, 8100, 6000, 600),
				bat07: new battery("bat07", "BAT07 - Akkumulátor Mk.VII", 7, 1100, 1100, 3300, 9900, 7000, 700),
				bat08: new battery("bat08", "BAT08 - Akkumulátor Mk.VIII", 8, 1400, 1400, 4200, 12600, 8000, 800),
				bat09: new battery("bat09", "BAT09 - Akkumulátor Mk.IX", 9, 1700, 1700, 5100, 15300, 9000, 900),
				bat10: new battery("bat10", "BAT10 - Akkumulátor Mk.X", 10, 2000, 2000, 6000, 18000, 10000, 1000),
                
                //new hangar(itemid, name, level, construction, craftprice, sellprice, buyprice, squadronplace, reapir),
                han01: new hangar("han01", "HAN01 - Kis Hangár", 1, 750, 750, 2250, 6750, 1, 0.1),
                han02: new hangar("han02", "HAN02 - Közepes Hangár", 2, 3000, 3000, 9000, 27000, 2, 0.2),
                han03: new hangar("han03", "HAN03 - Nagy Hangár", 3, 7000, 7000, 21000, 63000, 3, 0.3),
                
                //new extra(itemid, name, level, construction, craftprice, sellprice, buyprice, effect, ammotype, ammoname, reload),
                efi01: new extra("efi01", "EFI01 - Energiamező", 1, 5000, 5000, 15000, 45000, "efi", "efc01", "Energiatöltet", 10),
                pdu01: new extra("pdu01", "PDU01 - Plazma Zavaró Egység", 1, 5000, 5000, 15000, 45000, "pdu", "pdr01", "Plazma Zavarórakéta", 15),
                edi01: new extra("edi01", "EDI01 - Elektromikus Zavaróimpulzus", 1, 5000, 5000, 15000, 45000, "edi", "edd01", "EDI Drón", 20),
                abs01: new extra("abs01", "ABS01 - Rendszertisztítás", 1, 5000, 5000, 15000, 45000, "abs", "vsw01", "Vírusírtó szoftver", 15),
                sre01: new extra("sre01", "SRE01 - Pajzsregeneráció Növelés", 1, 5000, 5000, 15000, 45000, "sre", "src01", "Pajzstöltő cella", 15),
                clo01: new extra("clo01", "CLO01 - Álcázó Berendezés", 1, 5000, 5000, 15000, 45000, "clo", "clc01", "Álcázó Chip", 5),
                bol01: new extra("bol01", "BOL01 - Akkumulátor Túltöltés", 1, 5000, 5000, 15000, 45000, "bol", "rba01", "Tartalék Akkumulátor", 20),
                mac01: new extra("mac01", "MAC01 - Mágneses köd", 1, 5000, 5000, 15000, 45000, "mac", "mad01", "Mágneses Zavarkeltő Drón", 15),
                ser01: new extra("ser01", "SER01 - Rajzavaró Elektronsugár", 1, 5000, 5000, 15000, 45000, "ser", "csg01", "Töltéstároló Gránáz", 10),
                mdl01: new extra("mdl01", "MDL01 - Rakétaelhárító Lézer", 1, 5000, 5000, 15000, 45000, "mdl", "lac01", "Lézertöltet", 15),
                rep01: new extra("rep01", "REP01 - Kis Burkolatjavító Robot", 1, 1000, 1000, 3000, 9000, "rep", "spp01", "Pótalkatrész", 10),
                rep02: new extra("rep02", "REP02 - Közepes Burkolatjavító Robot", 2, 3000, 3000, 9000, 27000, "rep", "spp01", "Pótalkatrész", 10),
                rep03: new extra("rep03", "REP03 - Nagy Burkolatjavító Robot", 3, 5000, 5000, 45000, 13500, "rep", "spp01", "Pótalkatrész", 10),
                
                //new extender(itemid, name, level, construction, craftprice, sellprice, buyprice, effect, slotextend),
                
				cae01: new extender("cae01", "CAE01 - Kis Ágyú Bővítő", 1, 2500, 2500, 7500, 22500, "cannonslot", 1),
				cae02: new extender("cae02", "CAE02 - Közepes Ágyú Bővítő", 2, 7500, 7500, 22500, 67500, "cannonslot", 2),
				cae03: new extender("cae03", "CAE03 - Nagy Ágyú Bővítő", 3, 15000, 15000, 45000, 135000, "cannonslot", 3),
				
				rie01: new extender("rie01", "RIE01 - Kis Gépágyú Bővítő", 1, 2500, 2500, 7500, 22500, "rifleslot", 1),
				rie02: new extender("rie02", "RIE02 - Közepes Gépágyú Bővítő", 2, 7500, 7500, 22500, 67500, "rifleslot", 2),
				rie03: new extender("rie03", "RIE03 - Nagy Gépágyú Bővítő", 3, 15000, 15000, 45000, 135000, "rifleslot", 3),
				
				roe01: new extender("roe01", "ROE01 - Kis Rakétakilövő Bővítő", 1, 2500, 2500, 7500, 22500, "rocketlauncherslot", 1),
				roe02: new extender("roe02", "ROE02 - Közepes Rakétakilövő Bővítő", 2, 7500, 7500, 22500, 67500, "rocketlauncherslot", 2),
				roe03: new extender("roe03", "ROE03 - Nagy Rakétakilövő Bővítő", 3, 15000, 15000, 45000, 135000, "rocketlauncherslot", 3),
				
				hae01: new extender("hae01", "HAE01 - Kis Hangár Bővítő", 1, 2500, 2500, 7500, 22500, "hangarslot", 1),
				hae02: new extender("hae02", "HAE02 - Közepes Hangár Bővítő", 2, 7500, 7500, 22500, 67500, "hangarslot", 2),
				hae03: new extender("hae03", "HAE03 - Nagy Hangár Bővítő", 3, 15000, 15000, 45000, 135000, "hangarslot", 3),
				
				she01: new extender("she01", "SHE01 - Kis Pajzs Bővítő", 1, 2500, 2500, 7500, 22500, "shieldslot", 1),
				she02: new extender("she02", "SHE02 - Közepes Pajzs Bővítő", 2, 7500, 7500, 22500, 67500, "shieldslot", 2),
				she03: new extender("she03", "SHE03 - Nagy Pajzs Bővítő", 3, 15000, 15000, 45000, 135000, "shieldslot", 3),
				
				hue01: new extender("hue01", "HUE01 - Kis Burkolat Bővítő", 1, 2500, 2500, 7500, 22500, "hullslot", 1),
				hue02: new extender("hue02", "HUE02 - Közepes Burkolat Bővítő", 2, 7500, 7500, 22500, 67500, "hullslot", 2),
				hue03: new extender("hue03", "HUE03 - Nagy Burkolat Bővítő", 3, 15000, 15000, 45000, 135000, "hullslot", 3),
				
				eqe01: new extender("eqe01", "EQE01 - Kis Felszerelés Bővítő", 1, 2500, 2500, 7500, 22500, "equipmentslot", 1),
				eqe02: new extender("eqe02", "EQE02 - Közepes Felszerelés Bővítő", 2, 7500, 7500, 22500, 67500, "equipmentslot", 2),
				eqe03: new extender("eqe03", "EQE03 - Nagy Felszerelés Bővítő", 3, 15000, 15000, 45000, 135000, "equipmentslot", 3),
				
				gex01: new extender("gex01", "GEX01 - Kis Generátor Bővítő", 1, 2500, 2500, 7500, 22500, "generatorslot", 1),
				gex02: new extender("gex02", "GEX02 - Közepes Generátor Bővítő", 2, 7500, 7500, 22500, 67500, "generatorslot", 2),
				gex03: new extender("gex03", "GEX03 - Nagy Generátor Bővítő", 3, 15000, 15000, 45000, 135000, "generatorslot", 3),
				
				bae01: new extender("bae01", "BAE01 - Kis Akkumulátor Bővítő", 1, 2500, 2500, 7500, 22500, "batteryslot", 1),
				bae02: new extender("bae02", "BAE02 - Közepes Akkumulátor Bővítő", 2, 7500, 7500, 22500, 67500, "batteryslot", 2),
				bae03: new extender("bae03", "BAE03 - Nagy Akkumulátor Bővítő", 3, 15000, 15000, 45000, 135000, "batteryslot", 3),
				
				exe01: new extender("exe01", "EXE01 - Kis Bővítő Hely", 1, 2500, 2500, 7500, 22500, "extenderslot", 2),
				exe02: new extender("exe02", "EXE02 - Közepes Bővítő Hely", 2, 7500, 7500, 22500, 67500, "extenderslot", 3),
				exe03: new extender("exe03", "EXE03 - Nagy Bővítő Hely", 3, 15000, 15000, 45000, 135000, "extenderslot", 4),
				
				cex01: new extender("cex01", "CEX01 - Kis Raktérnövelő", 1, 2500, 2500, 7500, 22500, "basiccargo", 1.5),
				cex02: new extender("cex02", "CEX02 - Közepes Raktérnövelő", 2, 7500, 7500, 22500, 67500, "basiccargo", 2),
				cex03: new extender("cex03", "CEX03 - Nagy Raktérnövelő", 3, 15000, 15000, 45000, 135000, "basiccargo", 2.5),
				
				aex01: new extender("aex01", "AEX01 - Kis Lőszerraktárnövelő", 1, 2500, 2500, 7500, 22500, "basicammostorage", 1.5),
				aex02: new extender("aex02", "AEX02 - Közepes Lőszerraktárnövelő", 2, 7500, 7500, 22500, 67500, "basicammostorage", 2),
				aex03: new extender("aex03", "AEX03 - Nagy Lőszerraktárnövelő", 3, 15000, 15000, 45000, 135000, "basicammostorage", 2.5),
				
                //new ammo(itemid, itemtype, name, level, sellprice, buyprice, dmgmultiplicator, energymultiplicator),
                cab01: new ammo("cab01", "cannonball", "CAB01 - Kis Ágyúgolyó", 1, 1, 2, 1, 1),
                cab02: new ammo("cab02", "cannonball", "CAB02 - Közepes Ágyúgolyó", 2, 5, 10, 2, 2),
                cab03: new ammo("cab03", "cannonball", "CAB03 - Nagy Ágyúgolyó", 3, 15, 30, 3, 4),
                
                ioc01: new ammo("ioc01", "ioncell", "IOC01 - 10MW Ioncella", 1, 1, 2, 1, 1),
                ioc02: new ammo("ioc02", "ioncell", "IOC02 - 20MW Ioncella", 2, 5, 10, 2, 2),
                ioc03: new ammo("ioc03", "ioncell", "IOC03 - 30MW Ioncella", 3, 15, 30, 3, 4),
                
                bul01: new ammo("bul01", "bullet", "BUL01 - 9MM Töltény", 1, 1, 2, 1, 1),
                bul02: new ammo("bul02", "bullet", "BUL02 - 12MM Töltény", 2, 5, 10, 2, 2),
                bul03: new ammo("bul03", "bullet", "BUL03 - 18MM Töltény", 3, 15, 30, 3, 4),
                
                roc01: new ammo("roc01", "rocket", "ROC01 - Rakéta Mk.I", 1, 10, 20, 1, 1),
                roc02: new ammo("roc02", "rocket", "ROC02 - Rakéta Mk.II", 2, 50, 100, 2, 2),
                roc03: new ammo("roc03", "rocket", "ROC03 - Rakéta Mk.III", 3, 150, 300, 3, 4),
                
                sro01: new ammo("sro01", "sabrocket", "SRO01 - SAB Rakéta Mk.I", 1, 10, 20, 1, 1),
                sro02: new ammo("sro02", "sabrocket", "SRO02 - SAB Rakéta Mk.II", 2, 50, 100, 2, 2),
                sro03: new ammo("sro03", "sabrocket", "SRO03 - SAB Rakéta Mk.III", 3, 150, 300, 3, 4),
				
                //new specialammo(itemid, name, sellprice, buyprice),
                efc01: new specialammo("efc01", "EFC01 - Energiatöltet", 500, 500, "EFI01 - Energiamező"),
                pdr01: new specialammo("pdr01", "PDR01 - Plazma Zavarórakéta", 500, 500, "PDU01 - Plazma Zavaró Egység"),
                edd01: new specialammo("edd01", "EDD01 - EDI Drón", 500, 500, "EDI01 - Elektromikus Zavaróimpulzus"),
                spp01: new specialammo("spp01", "SPP01 - Pótalkatrész", 500, 500, "Burkolatjavító Robot"),
                src01: new specialammo("src01", "SRC01 - Pajzstöltő Cella", 500, 500, "SRE01 - Pajzsregeneráció Növelés"),
                clc01: new specialammo("clc01", "CLC01 - Álcázó Chip", 500, 500, "CLO01 - Álcázó Berendezés"),
                rba01: new specialammo("rba01", "RBA01 - Tartalék Akkumulátor", 500, 500, "BOL01 - Akkumulátor Túltöltés"),
                mad01: new specialammo("mad01", "MAD01 - Mágneses Zavarkeltő Drón", 500, 500, "MAC01 - Mágneses Köd"),
                csg01: new specialammo("csg01", "CSG01 - Töltéstároló Gránát", 500, 500, "SER01 - Rajzavaró Elektronsugár"),
                lac01: new specialammo("lac01", "LAC01 - Rakétaelhárító Lézer", 500, 500, "MDL01 - Rakétaelhárító Lézer"),
                vsw01: new specialammo("vsw01", "VSW01 - Vírusírtó Szoftver", 500, 500, "ABS1 - Rendszertisztítás"),
            },
            
            abilities:
            {
                //new ability(itemid, name, itemtype, owner, maxlevel, upgradecost),
                
                emfp: new ability("emfp", "EMFP - Rajerősítés", "passive", "emf", 5, 2000),
                emfa1: new ability("emfa1", "EMFA1 - Raj Pajzs", "active1", "emf", 10, 300),
                emfa2: new ability("emfa2", "EMFA2 - Hatótávon Kívül", "active2", "emf", 5, 2000),
                
                pdmp: new ability("pdmp", "PDMP - Megnövelt Pajzserő", "passive", "pdm", 5, 2000),
                pdma1: new ability("pdma1", "PDMA1 - Pajzsregeneráció", "active1", "pdm", 10, 300),
                pdma2: new ability("pdma2", "PDMA2 - Életmentő Manőver", "active2", "pdm", 5, 2000),
                
                idfp: new ability("idfp", "IDFP - Nyomkövetés", "passive", "idf", 5, 2000),
                idfa1: new ability("idfa1", "IDFA1 - Kinetikus Pajzs", "active1", "idf", 10, 300),
                idfa2: new ability("idfa2", "IDFA2 - Gyorstüzellés", "active2", "idf", 5, 2000),
                
                gaap: new ability("gaap", "GAAP - Fejlett Radar", "passive", "gaa", 5, 2000),
                gaaa1: new ability("gaaa1", "GAAA1 - Pajzslopás", "active1", "gaa", 10, 300),
                gaaa2: new ability("gaaa2", "GAAA2 - Ionágyú", "active2", "gaa", 5, 2000),
                
                mfap: new ability("mfap", "MFAP - Fejlett Roncsmentés", "passive", "mfa", 5, 2000),
                mfaa1: new ability("mfaa1", "MFAA1 - Rajbénítás", "active1", "mfa", 10, 300),
                mfaa2: new ability("mfaa2", "MFAA2 - Precíziós célzás", "active2", "mfa", 5, 2000),
                
                crip: new ability("crip", "CRIP - Gyors Újratöltés", "passive", "cri", 5, 2000),
                cria1: new ability("cria1", "CRIA1 - Csökkentett Energiahasználat", "active1", "cri", 10, 300),
                cria2: new ability("cria2", "CRIA2 - Kibervírus", "active2", "cri", 5, 2000)
            },
            
            property: property,
            search: search,
            description: description,
        };
       
        window.gamedata = gamedata;
    }
    catch(err)
    {
        alert(arguments.callee.name + err.name + ": " + err.message);
    }
})();

    function item(itemid, type, name)
    {
        try
        {
            this.itemid = itemid;
            this.type = type;
            this.name = name;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
        function company(itemid, name)
        {
            try
            {
                item.call(this, itemid, "company", name);
                this.slotname = "Megbízó";
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
        function equipment(itemid, type, name, slot, level, construction, craftprice, sellprice, buyprice)
        {
            try
            {
                item.call(this, itemid, type, name);
                this.type = type;
                this.slot = slot;
                this.level = level;
                this.construction = construction;
                this.craftprice = craftprice;
                this.sellprice = sellprice;
                this.buyprice = buyprice;
            }
            catch(err)
            {
                alert(arguments.callee.name + err.name + ": " + err.message);
            }
        }
        
            function ship(itemid, company, name, level, construction, craftprice, sellprice, buyprice, corehull, cannonslot, maxcannonlevel, rocketlauncherslot, maxrocketlauncherlevel, rifleslot, maxriflelevel, shieldslot, maxshieldlevel, hullslot, maxhulllevel, generatorslot, maxgeneratorlevel, batteryslot, maxbatterylevel, hangarslot, maxhangarlevel, maxsquadronlevel, equipmentslot, extenderslot, maxextenderlevel, basiccargo, basicammostorage)
            {
                try
                {
                    equipment.call(this, itemid, "ship", name, "ship", level, construction, craftprice, sellprice, buyprice);
                    this.company = company;
                    this.corehull = corehull;
                    this.cannonslot = cannonslot;
                    this.maxcannonlevel = maxcannonlevel;
                    this.rocketlauncherslot = rocketlauncherslot;
                    this.maxrocketlauncherlevel = maxrocketlauncherlevel;
                    this.rifleslot = rifleslot;
                    this.maxriflelevel = maxriflelevel
                    this.shieldslot = shieldslot;
                    this.maxshieldlevel = maxshieldlevel;
                    this.hullslot = hullslot;
                    this.maxhulllevel = maxhulllevel;
                    this.generatorslot = generatorslot;
                    this.maxgeneratorlevel = maxgeneratorlevel;
                    this.batteryslot = batteryslot;
                    this.maxbatterylevel = maxbatterylevel;
                    this.hangarslot = hangarslot;
                    this.maxhangarlevel = maxhangarlevel;
                    this.maxsquadronlevel = maxsquadronlevel;
                    this.equipmentslot = equipmentslot;
                    this.extenderslot = extenderslot;
                    this.maxextenderlevel = maxextenderlevel;
                    this.basiccargo = basiccargo;
                    this.basicammostorage = basicammostorage;
                    this.slotname = "Hajó";
                    this.equipable = "ship";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadron(itemid, name, level, construction, craftprice, sellprice, buyprice, corehull, weaponslot, maxweaponlevel, shieldslot, maxshieldlevel, hullslot, maxhulllevel, batteryslot, maxbatterylevel, basicammostorage)
            {
                try
                {
                    
                    equipment.call(this, itemid, "squadron", name, "squadron", level, construction, craftprice, sellprice, buyprice);
                    this.equipable = "ship";
                    this.corehull = corehull;
                    this.weaponslot = weaponslot;
                    this.maxweaponlevel = maxweaponlevel;
                    this.shieldslot = shieldslot;
                    this.maxshieldlevel = maxshieldlevel;
                    this.hullslot = hullslot;
                    this.maxhulllevel = maxhulllevel;
                    this.batteryslot = batteryslot;
                    this.maxbatterylevel = maxbatterylevel;
                    this.basicammostorage = basicammostorage;
                    this.slotname = "Raj";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function cannon(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "cannon", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "cannon";
                    this.equipable = "ship";
                    this.ammotype = "cannonball";
                    this.ammoname = "Ágyúgolyó";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Ágyú";
                    this.itemtypename = "Ágyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function pulse(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "cannon", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "pulse";
                    this.equipable = "ship";
                    this.ammotype = "ioncell";
                    this.ammoname = "Ioncella";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Ágyú";
                    this.itemtypename = "Pulzuságyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function rifle(itemid, name, level, construction, craftprice, sellprice, buyprice, squadrondamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "rifle", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "rifle";
                    this.equipable = "ship";
                    this.ammotype = "bullet";
                    this.ammoname = "Töltény";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = squadrondamage;
                    this.hulldamage = 0;
                    this.shielddamage = 0;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Gépágyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function rocketlauncher(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "rocketlauncher", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "rocketlauncher";
                    this.equipable = "ship";
                    this.ammotype = "rocket";
                    this.ammoname = "Rakéta";
                    this.reload = 6;
                    this.accuracy = 500;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Rakétakilövő";
                    this.itemtypename = "Rakétakilövő";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function sablauncher(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "rocketlauncher", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "sablauncher";
                    this.equipable = "ship";
                    this.ammotype = "sabrocket";
                    this.ammoname = "SAB rakéta";
                    this.reload = 6;
                    this.accuracy = 500;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Rakétakilövő";
                    this.itemtypename = "SAB Rakétakilövő";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadronrifle(itemid, name, level, construction, craftprice, sellprice, buyprice, squadrondamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "squadronweapon", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadronrifle";
                    this.equipable = "squadron";
                    this.ammotype = "bullet";
                    this.ammoname = "Töltény";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = squadrondamage;
                    this.hulldamage = 0;
                    this.shielddamage = 0;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Raj fegyver";
                    this.itemtypename = "Raj Gépágyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadroncannon(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "squadronweapon", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadroncannon";
                    this.equipable = "squadron";
                    this.ammotype = "cannonball";
                    this.ammoname = "Ágyúgolyó";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Raj fegyver";
                    this.itemtypename = "Raj Ágyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadronpulse(itemid, name, level, construction, craftprice, sellprice, buyprice, hulldamage, shielddamage, ammousage, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "weapon", name, "squadronweapon", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadronpulse";
                    this.equipable = "squadron";
                    this.ammotype = "ioncell";
                    this.ammoname = "Ioncella";
                    this.reload = 1;
                    this.accuracy = 700;
                    this.squadrondamage = 0;
                    this.hulldamage = hulldamage;
                    this.shielddamage = shielddamage;
                    this.ammousage = ammousage;
                    this.energyusage = energyusage;
                    this.slotname = "Raj fegyver";
                    this.itemtypename = "Raj Pulzuságyú";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function highcapacityshield(itemid, name, level, construction, craftprice, sellprice, buyprice, shieldenergy, recharge, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "shield", name, "shield", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "highcapacityshield";
                    this.equipable = "ship";
                    this.shieldenergy = shieldenergy;
                    this.recharge = recharge;
                    this.energyusage = energyusage;
                    this.slotname = "Pajzs";
                    this.itemtypename = "Nagy Kapacitású Pajzs";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function quickrechargeshield(itemid, name, level, construction, craftprice, sellprice, buyprice, shieldenergy, recharge, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "shield", name, "shield", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "quickrechargeshield";
                    this.equipable = "ship";
                    this.shieldenergy = shieldenergy;
                    this.recharge = recharge;
                    this.energyusage = energyusage;
                    this.slotname = "pajzs";
                    this.itemtypename = "Gyorstöltő Pajzs";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadronshield(itemid, name, level, construction, craftprice, sellprice, buyprice, shieldenergy, recharge, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "shield", name, "squadronshield", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadronshield";
                    this.equipable = "squadron";
                    this.shieldenergy = shieldenergy;
                    this.recharge = recharge;
                    this.energyusage = energyusage;
                    this.slotname = "Raj pajzs";
                    this.itemtypename = "Raj Nagy Kapacitású Pajzs";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadronquickrechargeshield(itemid, name, level, construction, craftprice, sellprice, buyprice, shieldenergy, recharge, energyusage)
            {
                try
                {
                    equipment.call(this, itemid, "shield", name, "squadronshield", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadronquickrechargeshield";
                    this.equipable = "squadron";
                    this.shieldenergy = shieldenergy;
                    this.recharge = recharge;
                    this.energyusage = energyusage;
                    this.slotname = "Raj pajzs";
                    this.itemtypename = "Raj Gyorstöltő Pajzs";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function battleshiphull(itemid, name, level, construction, craftprice, sellprice, buyprice, hullenergy)
            {
                try
                {
                    equipment.call(this, itemid, "hull", name, "hull", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "battleshiphull";
                    this.equipable = "ship";
                    this.hullenergy = hullenergy;
                    this.slotname = "Burkolat";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function squadronhull(itemid, name, level, construction, craftprice, sellprice, buyprice, hullenergy)
            {
                try
                {
                    equipment.call(this, itemid, "hull", name, "squadronhull", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "squadronhull";
                    this.equipable = "squadron";
                    this.hullenergy = hullenergy;
                    this.slotname = "Raj burkolat";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }

            
            function hangar(itemid, name, level, construction, craftprice, sellprice, buyprice, squadronplace, repair)
            {
                try
                {
                    equipment.call(this, itemid, "hangar", name, "hangar", level, construction, craftprice, sellprice, buyprice);
                    this.itemtype = "hangar";
                    this.equipable = "ship";
                    this.squadronplace = squadronplace;
                    this.repair = repair;
                    this.slotname = "Hangár";
                    
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function extra(itemid, name, level, construction, craftprice, sellprice, buyprice, effect, ammotype, ammoname, reload)
            {
                try
                {
                    equipment.call(this, itemid, "equipment", name, "equipment", level, construction, craftprice, sellprice, buyprice);
                    this.equipable = "ship";
                    this.effect = effect;
                    this.ammotype = ammotype;
                    this.ammoname = ammoname;
                    this.reload = reload;
                    this.slotname = "Felszerelés";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function generator(itemid, name, level, construction, craftprice, sellprice, buyprice, energyregen)
            {
                try
                {
                    equipment.call(this, itemid, "generator", name, "generator", level, construction, craftprice, sellprice, buyprice);
                    this.equipable = "ship";
                    this.energyregen = energyregen;
                    this.slotname = "Generátor";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
			
			function battery(itemid, name, level, construction, craftprice, sellprice, buyprice, capacity, maxrecharge)
            {
                try
                {
                    equipment.call(this, itemid, "battery", name, "battery", level, construction, craftprice, sellprice, buyprice);
                    this.equipable = "both";
                    this.capacity = capacity;
					this.maxrecharge = maxrecharge;
                    this.slotname = "Akkumulátor";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
			
			function extender(itemid, name, level, construction, craftprice, sellprice, buyprice, effect, slotextend)
            {
                try
                {
                    equipment.call(this, itemid, "extender", name, "extender", level, construction, craftprice, sellprice, buyprice);
                    this.equipable = "ship";
					this.effect = effect;
					this.slotextend = slotextend;
                    this.slotname = "Bővítő";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function ammo(itemid, itemtype, name, level, sellprice, buyprice, dmgmultiplicator, energymultiplicator)
            {
                try
                {
                    equipment.call(this, itemid, "ammo", name, "ammo", level, undefined, undefined, sellprice, buyprice);
                    this.equipable = "ship";
                    this.itemtype = itemtype;
                    this.dmgmultiplicator = dmgmultiplicator;
                    this.energymultiplicator = energymultiplicator;
                    this.slotname = "Lőszer";
                    this.itemtypename = "Normál Lőszer";
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
            function specialammo(itemid, name, sellprice, buyprice, user)
            {
                try
                {
                    equipment.call(this, itemid, "ammo", name, "ammo", 1, undefined, undefined, sellprice, buyprice);
                    this.equipable = "ship";
                    this.itemtype = "specialammo";
                    this.slotname = "Lőszer";
                    this.itemtypename = "Felszerelés Lőszer";
                    this.user = user;
                }
                catch(err)
                {
                    alert(arguments.callee.name + err.name + ": " + err.message);
                }
            }
            
        function ability(itemid, name, itemtype, owner, maxlevel, upgradecost)
        {
            item.call(this, itemid, "ability", name);
            this.slot = "ability";
            this.itemtype = itemtype;
            this.owner = owner;
            this.maxlevel = maxlevel;
            this.upgradecost = upgradecost;
            this.slotname = "Képesség";
        }
            
    function property(itemid, property, targetobj)
    {
        try
        {
            var x;
            for(x in this[targetobj])
            {
                if(x == itemid && Object.keys(this[targetobj][x]).indexOf(property) > -1)
                {
                    return this[targetobj][x][property];
                }
            }
            return null;
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
    }
    
    function search(what, targetobj)
    //Megkeresi targetobj-ból azokat az objektumokat, melyeknek tulajdonságai megegyeznek what objektum tulajdonságaival
    {
        try
        {
            if(targetobj == undefined)
            {
                targetobj = "items";
            }
            
            var obj = this[targetobj];
            var result = [];
            var objid, whatid, match;
            for(objid in obj)
            {
                for(whatid in what)
                {
                    match = 1;
                    if(obj[objid][whatid] != what[whatid])
                    {
                        match = 0;
                        break;
                    }
                }
                if(match) result.push(objid);
            }
        }
        catch(err)
        {
            alert(arguments.callee.name + err.name + ": " + err.message);
        }
        finally
        {
            if(Object.keys(result).length == 0) return null;
            else if(Object.keys(result).length == 1)
            {
                return result[0];
            }
            else
            {
                return result;
            }
        }
    }
    
    function description(itemdata)
    //Tárgyak leírása
    {
        try
        {
            
            var div = document.createElement("DIV");
                div.className = "descdiv";
                
                var namediv = document.createElement("DIV");
                    namediv.className = "descname";
                    namediv.appendChild(document.createTextNode(itemdata.name));
            div.appendChild(namediv);
            
                var slotdiv = document.createElement("DIV");
                    slotdiv.className = "descslot";
                    slotdiv.appendChild(document.createTextNode("Slot: " + itemdata.slotname));
                    if(itemdata.itemtypename)
                    {
                        slotdiv.appendChild(document.createTextNode(" - Típus: " + itemdata.itemtypename));
                    }
            div.appendChild(slotdiv);
            
                var leveldiv = document.createElement("DIV");
                    if(itemdata.level)
                    {
                        leveldiv.appendChild(document.createTextNode("Szint: " + itemdata.level));
                        var level = 1;
                    }
                    if(itemdata.equipable)
                    {
                        if(level) leveldiv.appendChild(document.createTextNode(" - "));
                        
                        switch(itemdata.equipable)
                        {
                            case "ship":
                                var text = "Hajó";
                            break;
                            case "squadron":
                                var text = "Raj";
                            break;
                            case "both":
                                var text = "Hajó / Raj";
                            break;
                        }
                        
                        leveldiv.appendChild(document.createTextNode("Felszerelhető: " + text));
                    }
                    
            div.appendChild(leveldiv);
            
            switch(itemdata.slot)
            {
                case "ship":
                    div.appendChild(document.createTextNode("Megbízó: " + gamedata.companies[itemdata.company].name));
                    div.appendChild(document.createElement("BR"));
                    
                        var c = document.createElement("DIV");
                            c.style.fontWeight = "bold";
                            c.style.marginTop = "1em";
                            c.style.marginBottom = "1em";
                            
                            c.appendChild(document.createTextNode("A zárójeles értékek a tárgy maximális szintjét jelzik."));
                            c.appendChild(document.createElement("BR"));
                    div.appendChild(c);
                    
                    div.appendChild(document.createTextNode("Alap életerő: " + itemdata.corehull));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Burkolat: " + itemdata.hullslot + " (" + itemdata.maxhulllevel + ") -  Pajzs: " + itemdata.shieldslot + " (" + itemdata.maxshieldlevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Ágyú: " + itemdata.cannonslot + " (" + itemdata.maxcannonlevel + ") - Rakétakilövő: " + itemdata.rocketlauncherslot + " (" + itemdata.maxrocketlauncherlevel + ") - Gépágyú: " + itemdata.rifleslot + " (" + itemdata.maxriflelevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Generátor: " + itemdata.maxgeneratorlevel + " (" + itemdata.maxgeneratorlevel + ") - Akkumulátor: " + itemdata.batteryslot + " (" + itemdata.maxbatterylevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Hangár: " + itemdata.hangarslot + " (" + itemdata.maxhangarlevel + ") - Max. raj szint: " + itemdata.maxsquadronlevel));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Felszerelés: " + itemdata.equipmentslot + " - Bővítő: " + itemdata.extenderslot + " (" + itemdata.maxextenderlevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Lőszerraktár: " + itemdata.basicammostorage + " - Raktér: " + itemdata.basiccargo));
                    div.appendChild(document.createElement("BR"));
                break;
                case "squadron":
                    var c = document.createElement("DIV");
                            c.style.fontWeight = "bold";
                            c.style.marginTop = "1em";
                            c.style.marginBottom = "1em";
                            
                            c.appendChild(document.createTextNode("A zárójeles értékek a tárgy maximális szintjét jelzik."));
                            c.appendChild(document.createElement("BR"));
                    div.appendChild(c);
                    
                    div.appendChild(document.createTextNode("Alap életerő: " + itemdata.corehull));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Burkolat: " + itemdata.hullslot + " (" + itemdata.maxhulllevel + ") - Pajzs: " + itemdata.shieldslot + " (" + itemdata.maxshieldlevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Fegyver: " + itemdata.weaponslot + " (" + itemdata.maxweaponlevel + ") - Akkumulátor: " + itemdata.batteryslot + " (" + itemdata.maxbatterylevel + ")"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Lőszerraktár: " + itemdata.basicammostorage));
                    div.appendChild(document.createElement("BR"));
                break;
                case "cannon":
                case "rocketlauncher":
                case "rifle":
                case "squadronweapon":
                    div.appendChild(document.createTextNode("Sebzés: " + itemdata.hulldamage + " (burkolat) / " + itemdata.shielddamage + " (pajzs) / " + itemdata.squadrondamage + " (raj)"));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Lőszerhasználat: " + itemdata.ammousage + " - Lőszer: " + itemdata.ammoname));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Energiahasználat: " + itemdata.energyusage));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Pontosság: " + itemdata.accuracy + " - Újratöltés: " + itemdata.reload + " kör"));
                    div.appendChild(document.createElement("BR"));
                break;
                case "shield":
                case "squadronshield":
                    div.appendChild(document.createTextNode("Kapacitás: " + itemdata.shieldenergy));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Regeneráció: " + itemdata.recharge + "/kör - Energiahasználat: " + itemdata.energyusage));
                    div.appendChild(document.createElement("BR"));
                break;
                case "hull":
                case "squadronhull":
                    div.appendChild(document.createTextNode("Burkolat: " + itemdata.hullenergy));
                    div.appendChild(document.createElement("BR"));
                break;
                case "generator":
                    div.appendChild(document.createTextNode("Energiatermelés: " + itemdata.energyregen));
                    div.appendChild(document.createElement("BR"));
                break;
                case "battery":
                    div.appendChild(document.createTextNode("Kapacitás: " + itemdata.capacity + " - Tölthetőség: " + itemdata.maxrecharge));
                    div.appendChild(document.createElement("BR"));
                break;
                case "hangar":
                    div.appendChild(document.createTextNode("Raj hely: " + itemdata.squadronplace + " - Raj javítás: " + itemdata.repair * 100 + "% / kör"));
                    div.appendChild(document.createElement("BR"));
                break;
                case "equipment":
                    div.appendChild(document.createTextNode("Lőszer: " + itemdata.ammoname));
                    div.appendChild(document.createElement("BR"));
                    
                    div.appendChild(document.createTextNode("Újratöltési idő: " + itemdata.reload));
                    div.appendChild(document.createElement("BR"));
                    
                        var c = document.createElement("DIV");
                            c.style.marginTop = "1em";
                            c.style.marginBottom = "1em";
                            var t = document.createElement("DIV");
                                t.style.fontWeight = "bold";
                                t.style.textDecoration = "underline";
                                t.appendChild(document.createTextNode("Hatás:"));
                        c.appendChild(t);
                        c.appendChild(document.createTextNode(/*itemdata.description*/"HATÁS"));
                    div.appendChild(c);
                break;
                case "extender":
                    div.appendChild(document.createTextNode("Extra hely: " + itemdata.slotextend));
                    div.appendChild(document.createElement("BR"));
                break;
                case "ammo":
                    switch(itemdata.itemtype)
                    {
                        case "specialammo":
                            div.appendChild(document.createTextNode("Felhasználja: " + itemdata.user));
                            div.appendChild(document.createElement("BR"));
                        break;
                        default:
                            div.appendChild(document.createTextNode("Sebzés: x" + itemdata.dmgmultiplicator + " - Energiahasználat: x" + itemdata.energymultiplicator));
                            div.appendChild(document.createElement("BR"));
                        break;
                    }
                break;
                case "ability":
                    switch(itemdata.itemtype)
                    {
                        case "passive":
                            var type = "Passzív";
                        break;
                        case "active1":
                            var type = "Aktív 1";
                        break;
                        case "active2":
                            var type = "Aktív 2";
                        break;
                    }
                    
                    slotdiv.appendChild(document.createTextNode(" - Típus: " + type));
                    
                    div.appendChild(document.createTextNode("Max. szint: " + itemdata.maxlevel));
                    div.appendChild(document.createElement("BR"));
                    
                    if(itemdata.active)
                    {
                        div.appendChild(document.createTextNode("Aktív: " + itemdata.active + " kör (+ " + itemdata.activeinc + " / szint)"));
                        div.appendChild(document.createElement("BR"));
                    }
                    if(itemdata.reload)
                    {
                        div.appendChild(document.createTextNode("Újratöltés: " + itemdata.reload + " kör (- " + itemdata.reloadinc + " / szint)"));
                        div.appendChild(document.createElement("BR"));
                    }
                    
                     var c = document.createElement("DIV");
                            c.style.marginTop = "1em";
                            c.style.marginBottom = "1em";
                            var t = document.createElement("DIV");
                                t.style.fontWeight = "bold";
                                t.style.textDecoration = "underline";
                                t.appendChild(document.createTextNode("Hatás:"));
                        c.appendChild(t);
                        c.appendChild(document.createTextNode(/*itemdata.description*/"HATÁS"));
                    div.appendChild(c);
                break;
            }
            
            if(itemdata.sellprice)
            {
                div.appendChild(document.createTextNode("Vételár: " + itemdata.buyprice + " - Eladási ár: " + itemdata.sellprice));
                div.appendChild(document.createElement("BR"));
            }
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