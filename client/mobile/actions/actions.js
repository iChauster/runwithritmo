export const FOUND_USER = 'FOUND_USER';
export function login (u, p){
	return (dispatch) => {
		fetch('http://localhost:3000/login', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    username: u,
		    password: p,
		  })
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(foundUser(responseJson["USER"]))
		})
		.catch((error) => {
			console.error(error)
		})
	}	
}

export function foundUser(user){
	return {
		type : FOUND_USER,
		profile : user,
	};
}