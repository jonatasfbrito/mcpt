iconst express = require('express');
const http = require('http');
const socketio = require('socket.io')(3000);
const app = express();
const pdfimg = require('./pdfapi.js');
const server = http.createServer(app);
const io = socketio.listen(server);
app.set('port', process.env.PORT || 5000);
require('./socket.js')(io, app)
const multer = require('multer')
const upload = multer({ dest: './app/uploads' })

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
        console.table({'IP':req.ip})
});

app.get('/baixar-horario', (req, res) => {
	res.download(__dirname + '/pdfs/horario.pdf')
});

app.get('/livros', (req, res) => {
	res.sendFile(__dirname + '/public/livros.html')
});

app.get('/horario', (req, res) => {
	res.sendFile(__dirname + '/public/horario.html')
});

app.get('/suporte', (req, res) => {
	res.sendFile(__dirname + '/public/suporte.html')
});

app.get('/converter_pdf', (req, res) => {
	res.sendFile(__dirname + '/public/converterpdf.html')
});


app.post('/converter', upload.single('imagem'), async (req, res) => {
	const nf = await pdfimg('./app/uploads/'+req.file.filename)
	ff = './' + req.file.filename + '-1.png';
	res.download(ff)
});



app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + "/public/erro-404.html");
});



server.listen(app.get("port"),() => {
	console.table({
		'HOST':'localhost',
		'PORT':app.get("port")
	})
});
