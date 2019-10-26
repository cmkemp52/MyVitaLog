const db = require('./conn');

async function logAdd(nutrients){
    nuts = Object.entries(nutrients);
    const intoDB = {};
    nuts.map(nut =>{
        if(nut[0].split(",")[0].toLowerCase() in ['name', 'brand', 'energy', 'protein', 'sugar', 'cholesterol', 'fiber']){
            intoDB[nut[0].split(",")[0].toLowerCase()] = nut[1];
        }
    });
    console.log(intoDB)
    //const response = await db.one();
}

module.exports = logAdd;