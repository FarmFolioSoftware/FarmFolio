//get request that lists all plots in the current user's farm
// app.get("/listPlots/:uuidSessionToken/:strFarmName", (req, res) => {
    app.get("/listPlots", async (req, res) => {	
        console.log(req.query);
    
        const uuidSessionToken = clean(req.query.uuidSessionToken);
        
        var userID = await getUserIDBySessionToken(uuidSessionToken);
        if (userID == -1) {
            return res.json({"message": "You must be logged in to do that", "status": 400});
        }
    
        const intFarmID = await getCurrentFarmID(uuidSessionToken);
        const strFarmName = await getCurrentFarmName(uuidSessionToken);
    
        console.log("Listing all plots for farm " + strFarmName + "...");
    
        const plotQuery = await db_pool.query("SELECT * FROM tblPlot WHERE farmID=?;", [intFarmID]);
    
        if (plotQuery.length == 0) {
            return res.json({"message": "There are no plots to list.", "status": 500});
        } else {
            // If there are plots, list them
            console.log(plotQuery);
            res.json({"message": "Success.", "status": 200, "plots": plotQuery});
        }
    });
    
    // post request that adds a plot to the current user's farm
    app.post("/addPlot", async (req, res) => {
        console.log(req.body);
    
        const uuidSessionToken = clean(req.body.uuidSessionToken);
        const strPlotName = clean(req.body.strPlotName);
        const strLatitude = clean(req.body.strLatitude);
        const strLongitude = clean(req.body.strLongitude);
        const strPlotSize = clean(req.body.strPlotSize);
    
        var userID = await getUserIDBySessionToken(uuidSessionToken);
        if (userID == -1) {
            return res.json({"message": "You must be logged in to do that", "status": 400});
        }
        
        var targetFarmID = await getCurrentFarmID(uuidSessionToken);
    
        console.log("Adding new plot " + strPlotName + " for farm ID " + targetFarmID + "...");
        
        var plotConflictQuery = await db_pool.query("SELECT * FROM tblPlot WHERE farmID=? AND plotName=?;", [targetFarmID, strPlotName]);
        
        if (plotConflictQuery.length != 0) {
            return res.json({"message": "A plot with that name already exists.", "status": 400});
        }
        
        var plotInsertQuery = await db_pool.query("INSERT INTO tblPlot (farmID, plotName, latitude, longitude, plotSize) VALUE (?, ?, ?, ?, ?) RETURNING plotID;" [targetFarmID, strPlotName, strLatitude, strLongitude, strPlotSize]);
        if (plotInsertQuery.length != 0) {
            return res.json({"message": "Success. Added new plot.", "status": 200});
        }
        /*
        db_pool.getConnection().then(con => {
            con.query("select farmID from tblFarm where farmName=?;", [strFarmName]).then((rows) => {
                const intFarmID = rows[0].farmID
                con.query("SELECT * FROM tblPlot WHERE farmID=? AND plotName=?;", [intFarmID, strPlotName]).then((rows) => {
                    if (rows.length != 0) {
                        // If it exists, bail out
                        res.json({"message": "A plot with that name already exists for farm " + strFarmName, "status": 400});
                    } else {
                        // If it does not exist, insert it as a new record
                        con.query("INSERT INTO tblPlot (farmID, plotName, latitude, longitude) VALUE (?, ?, ?, ?) RETURNING plotID;", [intFarmID, strPlotName, strLatitude, strLongitude]).then((rows) => {
                            var targetPlotID = rows[0].plotID;
                            console.log("New plot with ID " + targetPlotID + " added to farm " + strFarmName);					
                            res.json({"message": "Success. Added new plot", "status": 200});
                        });	
                    }
                });
            });
            con.end();
        });
        */
    });