// $(document).ready(function() {
// 	$.ajax({
// 		url: 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=38cac23faa14fe9a4fffe934e6d66d77',
// 		success: function(data) {
// 			console.log(data);
// 		}
// 	});
// });

function setup() {
	noCanvas();
	let a = fetch('client_secret.json')
		.then((data) => console.log(JSON))
		.catch((error) => console.error(error));
}
