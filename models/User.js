var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{

    async findAll(){
        try {
            var result = await knex.select(["id","name","email","role"]).table("users");
            return result;
            
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
    
    async findById(id){
        try {
            var result = await knex.select(["id","name","email","role"]).where({id:id}).table("users");

            if(result.length > 0){
                return result[0];
            }
            else{
                return undefined
            }

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async new(name, email, password){
       
       try {

        var hash = await bcrypt.hash(password, 10);

        await knex.insert({name, email, password:hash, role:0}).table("users");
       } catch (error) {
        console.log(error);
       }
        
    }


    async findEmail(email){
        try {
            var result = await knex.select("*").from("users").where({email:email});    
            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
        
    }

    async update(id, name, email, role){
        var user = await this.findById(id);

        if(user != undefined){
            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result = await this.findEmail(email);
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return {status: false, err: "e email já existe no banco de dados"};            
                    }
                }
            }
            if(name != undefined){
                editUser.name = name;
            }
            
            if(role != undefined){
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({id:id}).table("users");
                return {status: true}
            } catch (error) {
                return {status: false, err: error};            
            }
        }
        else{
            return {status: false, err: "usuario não existe"};
        }


    }

}

module.exports = new User();