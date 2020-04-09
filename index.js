
var http=require('http')

var server=http.createServer((function(request,response)
{
	response.writeHead(200,{"Content-Type" : "text/html"});

	const https = require('https')

	const options = {
	  hostname: 'api.github.com',
	  port: 443,
	  path: '/users/:username/repos',
	  method: 'GET',
	  headers: { 'User-Agent': 'Mozilla/5.0' }
	}

	https.get(options, function(res) {
		let data = '';
		res.on('data', (chunk) => {
		    data += chunk;
		});
	  	res.on('end', () => {
		    const resData = JSON.parse(data);
		    console.log(resData.length);

		    let repoName = 'List Repo : <br><br>';

		    for (var i = 0; i < resData.length; i++) {
		    	//console.log(resData[i].name);
		    	repoName += resData[i].name + '<br>';
		    }
		    response.end(repoName);
		});
	});

	
}));
server.listen(3000);

