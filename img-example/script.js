
const cheerio = require('cheerio'); // Llamado a la Librería
const fs = require('fs'); // Permite almacenar en la PC los datos que se deseen analizar 
const request = require('request'); // Realiza peticiones GET y HTTP

let images = [];

request("https://www.parquelalibertad.org/cetav/noticias", (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let $ = cheerio.load(body); // Carga y analiza todo el HTML de la página
    $('img', '.view-noticias').each(function() {
      const urlImg = $(this).attr('src');
      images.push(urlImg);
    }); // Crea un array con los datos scrapeados
  }

  // Recorre los archivos scrapeados y los almacena en una carpeta local
  for(let i = 0; i < images.length; i++) {
    request(images[i]).pipe(fs.createWriteStream(`img/${i}.jpg`));
  };
});
