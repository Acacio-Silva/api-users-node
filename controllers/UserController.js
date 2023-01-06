var User = require("../models/User")

class UserController{
    
    
    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUserById(req, res){
        var id = req.params.id;

        var user = await User.findById(id);

        if(user == undefined){
            res.status(404)
            res.json({error: "recurso não encontrado"})
        }
        else{

            res.json(user);

        }


    }

    async create(req, res){

        var {email, name, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.send({err: "O email é invalido"})
            return;
        }

        var emailExist = await User.findEmail(email);

        if(emailExist){
            res.status(406);
            res.json({error: "O email já está cadastrado"})
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("Tudo Ok")
    }

    async edit(req, res){
        var {id, name, email, role} = req.body;
        var result = await User.update(id, name, email, role)

        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo ok")
            }else{
                res.status(500);
                res.json(result.err)
            }
        }
        else{
            res.status(500);
            res.json(result.err)
        }
    }
}

module.exports = new UserController();