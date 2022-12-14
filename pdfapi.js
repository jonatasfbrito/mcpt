const pdftoimage = require('pdftoimage');

function pdf2pic(file) {
  const ff = pdftoimage(file,{
  format: 'png',
})
.then(function(){
  console.log('Conversão feita com sucesso.');
})
.catch(function(err){
  console.log(err);
});
return ff;
}




module.exports = pdf2pic;
