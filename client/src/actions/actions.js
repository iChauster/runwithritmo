var request = require('request');
export const FOUND_USER = 'FOUND_USER';

export function initialize(){
	console.log('initialize request made');
	return (dispatch) => {
		request("http://localhost:3000/check", function (error, response, body){
			console.log("REQUEST CALLBACK")
			console.log(response)
			if(error)
				console.log(error)
			if(response.statusCode === 200){
				var json = JSON.parse(body);
				console.log(json);
				dispatch(getFullUser(json["USER"]))
			}
		});
	}
}
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
			if(error)
				console.log(error)
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
		request(options, function (error, response, body){
			console.log(response)
			if(response != null && response.statusCode === 200){
				var json = JSON.parse(body);
				dispatch(foundUser(json))
			}
		});
	}
}
export function getFullUser(user){
	console.log("getting full user");
	return(dispatch) => {
		request('http://localhost:3000/user/search/username/' + user.username, function (error, response, body){
			if(response.statusCode === 200){
				var json = JSON.parse(body);
				console.log(json);
				dispatch(foundUser(json["USER"]));
			}
		});
	}

}
export function addRun(run, coordinates){
	console.log('adding run')
	console.log(run)
	console.log(coordinates)
	var options = {
		method:'POST',
		url : 'http://localhost:3000/postRun',
		headers : {
			'cache-control' : 'no-cache',
			'content-type' : 'application/x-www-form-urlencoded'
		},
		form : {length: run.distance, long : coordinates.longitude, lat : coordinates.latitude, pace : run.pace, time : run.time, date:Date()}

	};
	return () => {
		request(options, function (error, res, body){
			console.log(res);
			if(res != null && res.statusCode === 200){
				console.log('saved')
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