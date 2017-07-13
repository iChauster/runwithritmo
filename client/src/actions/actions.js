var request = require('request');
export const FOUND_USER = 'FOUND_USER';

export function login (u, p){
	console.log('request made :' + u);
	var options = {
		method : 'POST',
		url : 'http://localhost:3000/login',
		headers : {
			'cache-control' : 'no-cache',
			'content-type' : 'application/x-www-form-urlencoded'
		},
		form : {username : u, password : p}
	};
	return (dispatch) => {
		request(options, function (error, response, body){
			console.log(response)
			console.log(body)
			if(error)
				console.log(error)
			console.log(response);
			if(response != null && response.statusCode === 200){
				var json = JSON.parse(body);
				dispatch(foundUser(json["USER"]))
			}
		});
	}
}
export function register (u, p){
	console.log('request made :' + u);
	var options = {
		method : 'POST',
		url : 'http://localhost:3000/register',
		headers : {
			'cache-control' : 'no-cache',
			'content-type' : 'application/x-www-form-urlencoded'
		},
		form : {username : u, password : p}
	};
	return (dispatch) => {
		request(options, function (req, res, next){
			console.log(res)
			if(res != null && res.statusCode === 200){
				dispatch(foundUser(res.json))
			}
		});
	}
}
export function foundUser(user){
	return {
		type : FOUND_USER,
		profile : user,
	};
}