
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

		    let repoName = '<b>List Repo :</b> <br><br>';
		    repoName += '<table>';
		    repoName += '<tr><td>ID</td><td>Repo Name</td><td>Download</td></tr>';
		    for (var i = 0; i < resData.length; i++) {
		    	repoName += '<tr>';
		    	repoName += '<td>' +resData[i].id + '</td><td> ' + resData[i].name + ' </td>';
		    	repoName += '<td><a href="https://github.com/:username/' + resData[i].name + '/archive/master.zip"> Download </a></td>';
		    	repoName += '</tr>';
		    }
		    repoName += '</table>';
		    response.end(repoName);
		});
	});

	
}));
server.listen(3000);

