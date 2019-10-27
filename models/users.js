const db = require("./conn");
const bcrypt = require("bcryptjs");

class User{
    constructor(account_name, email_address, password){
        this.account_name = account_name;
        this.email_address = email_address;
        this.password = password;
    }
    checkPassword(hashedPassword){
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async login(){  
        try{
            const response = await db.one(`SELECT account_name, password, id FROM users WHERE email = $1;`,[this.email_address]);
            const isValid = this.checkPassword(response.password);
            if(!!isValid){
                const account_id = response.id;
                return {isValid, account_id}
                ;
            } else {
                return {isValid};
            }
        }catch(err){
            return err.message;
        }
    }
    async save(){
        try{
            const response = await db.one(`INSERT INTO users (account_name, email, password) 
            VALUES ($1, $2, $3) RETURNING id;`, [this.account_name,this.email_address,this.password]);
            const tableadd = await db.one(`CREATE TABLE userLog_id${response.id} (
                id serial primary key,
                name varchar(300),
                brand varchar (300),
                loggedAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
                calories float,
                fat float,
                satfat float,
                transfat float,
                cholesterol float,
                sodium float,
                carbohydrates float,
                fiber float,
                sugars float,
                protein float,
                calcium float,
                iron float
            );`,[]);
            console.log(tableadd);
            return response;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = User;