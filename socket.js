const fs = require('fs');
let usuarios_conectados = 0;
let visitas;

try {
	visitas = 0 | fs.readFileSync('./visitas.txt','utf8')
	console.log(visitas)
} catch (err) {
	visitas = 0;
	console.log(err)
}


module.exports = function(io, app){
	io.on('connection', (socket) => {
		console.log('Novo usuario conectado :D ' + socket.id);
		usuarios_conectados++;
		visitas++;
		guardar_visitas();

		io.emit("actualizar", usuarios_conectados, visitas);

		socket.on("disconnect", function(){
			console.log("usuario desconectado :( " + socket.id);
			usuarios_conectados--;
			io.emit("actualizar", usuarios_conectados, visitas);
			guardar_visitas();
		});
	});
};

function guardar_visitas() {
	try {
	fs.readFileSync('./visitas.txt', visitas)
} catch (err) {
	console.log(err);
}

}