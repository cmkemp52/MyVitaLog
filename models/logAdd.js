const db = require('./conn');

async function logAdd(nutrients, id){
    let sqlNames = "";
    let sqlValues = "";
    for(nutrient in nutrients){
        if(nutrients[nutrient][0] != "servings"){
            sqlNames = sqlNames+`${nutrients[nutrient][0]}, `;
            if(nutrients[nutrient][0] == "name" || nutrients[nutrient][0] == "brand"){
                sqlValues = sqlValues+ "\'" + nutrients[nutrient][1] +"\', ";
            } else{
                sqlValues = sqlValues+`${nutrients[nutrient][1]*nutrients[2][1]}, `;
            }
        }
    }
    sqlNames = sqlNames.substring(0, sqlNames.length - 2);
    sqlValues = sqlValues.substring(0, sqlValues.length - 2);
    console.log(`INSERT INTO userLog_id${id} (${sqlNames}) VALUES (${sqlValues}) RETURNING id;`);
    insertLog = await db.one(`INSERT INTO userLog_id${id} (${sqlNames}) VALUES (${sqlValues}) RETURNING id;`);
    console.log("Added to log item: ", insertLog);
    lastlog = await db.one(`UPDATE users SET lastlog = CURRENT_TIMESTAMP WHERE id=${id} RETURNING id;`);
    console.log(lastlog);
    return true;
}

module.exports = logAdd;