class HomeController{

    async index(req, res){
        res.send("Api Rest - Express, Knex - nodeJS");
    }

}

module.exports = new HomeController();