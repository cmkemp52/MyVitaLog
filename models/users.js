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
                loggedOn DATE DEFAULT (CURRENT_DATE),
                calories float DEFAULT 0,
                fat float DEFAULT 0,
                satfat float DEFAULT 0,
                transfat float DEFAULT 0,
                cholesterol float DEFAULT 0,
                sodium float DEFAULT 0,
                carbohydrates float DEFAULT 0,
                fiber float DEFAULT 0,
                sugars float DEFAULT 0,
                protein float DEFAULT 0,
                calcium float DEFAULT 0,
                iron float DEFAULT 0
            );`,[]);
            console.log(tableadd);
            return response;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = User;