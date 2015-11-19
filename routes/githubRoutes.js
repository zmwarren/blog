var expresss = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url = "https://api.github.com/users/zmwarren/events";

fetchGithubEvents =function(req, res) {
	axios.get(url)
	.then(function (response) {
		var myEvents = response.data.map(function(g){
			if(g.payload.commits){
				var coms = g.payload.commits.map(function(c){
      				return {"message": c.message, "url": c.url}
      			})
			}
      		return{"id" : g.id, "type" : g.type, "repo" : g.repo.name, "commitMessage": g.payload.commits, "coms": coms}
    	});
		res.json(myEvents);
	})
	.catch(function (response) {
		console.log(response.data);
	});
};

module.exports = fetchGithubEvents;