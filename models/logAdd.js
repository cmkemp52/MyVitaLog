const db = require('./conn');

async function logAdd(nutrients, id){
    let sqlNames = "";
    let sqlValues = "";
    for(nutrient in nutrients){
        if(nutrients[nutrient][0] != "servings"){
            sqlNames = sqlNames+`${nutrients[nutrient][0]}, `;
            if(nutrients[nutrient][0] == "name" || nutrients[nutrient][0] == "brand"){
                if(nutrients[nutrient][1].indexOf("\'") > -1){
                    nutrients[nutrient][1] = nutrients[nutrient][1].slice(0,nutrients[nutrient][1].indexOf("\'"))+"\'"+nutrients[nutrient][1].slice(nutrients[nutrient][1].indexOf("\'"));
                }
                sqlValues = sqlValues+ "\'" + nutrients[nutrient][1] +"\', ";
            } else{
                sqlValues = sqlValues+`${nutrients[nutrient][1]*nutrients[2][1]}, `;
            }
        }
    }
    sqlNames = sqlNames.substring(0, sqlNames.length - 2);
    sqlValues = sqlValues.substring(0, sqlValues.length - 2);
    
    sqlQuery = `INSERT INTO userLog_id${id} (${sqlNames}) VALUES (${sqlValues}) RETURNING id;`;
    console.log(sqlQuery);
    insertLog = await db.one(sqlQuery);
    console.log("Added to log item: ", insertLog);
    lastlog = await db.one(`UPDATE users SET lastlog = CURRENT_TIMESTAMP WHERE id=${id} RETURNING id;`);
    console.log(lastlog);
    return true;
}

module.exports = logAdd;