const db = require("./conn");

async function pullLogs(id, days){
    logs = await db.any(`SELECT * FROM userLog_id${id} WHERE loggedon > current_date - ${days};`);
    return logs;
}

module.exports = pullLogs;