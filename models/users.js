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
            const response = await db.one(`SELECT account_name, password FROM users WHERE email = $1;`,[this.email_address]);
            const isValid = this.checkPassword(response.password);
            if(!!isValid){
                const {account_name} = response;
                return {isValid, account_name}
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
                brand varchar (200),
                created DATE NOT NULL DEFAULT (CURRENT_DATE),
                calories float,
                protein float,
                sugar float,
                cholesterol float,
                fiber float
            );`,[]);
            return response;
        }catch(err){
            return err.message;
        }
    }
}

module.exports = User;