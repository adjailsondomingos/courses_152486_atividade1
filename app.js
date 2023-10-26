const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const port = 3000;  
const fs = require("fs");
const https = require("https");
 
var animais = require('./Data/Animais.json');
var carros = require('./Data/Carros.json');
var pessoas = require('./Data/Pessoas.json');  

const cache = new NodeCache({ stdTTL: 1, checkperiod: 1 });

// Middleware para lidar com o cache
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);
  
  if (cachedData) {
    var ret = JSON.parse(cachedData)
    res.json(ret);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
};

app.use(express.json()); 
 
app.get('/animais', cacheMiddleware, (req, res) => { 
  res.json(animais);
});

app.get('/animais/:id', cacheMiddleware, (req, res) => {
  getObj(req, res, animais); 
});
 
app.post('/animais', (req, res) => {
  postObj(pessoas, req, res); 
})

app.get('/carros', cacheMiddleware, (req, res) => { 
  res.json(carros);
});

app.get('/carros/:id', cacheMiddleware, (req, res) => {
  getObj(req, res, carros);  
});

app.post('/carros', (req, res) => { 
  postObj(pessoas, req, res); 
})

app.get('/pessoas', cacheMiddleware, (req, res) => { 
  res.json(pessoas);
});

app.get('/pessoas/:id', cacheMiddleware, (req, res) => {  
  getObj(req, res, pessoas);  
});

app.post('/pessoas', (req, res) => {
  postObj(pessoas, req, res); 
});
  
function postObj(lst, req, res){
  const obj = req.body; 
  if (!obj || !obj.id || !obj.nome ){    
    res.status(400).send('bad request.')
  }
  else {
    lst.push(obj);      
    res.status(201).send('created.');
  }
}
 
function getObj(req, res, lst) {
  const id = Number(req.params.id);
  const ret = lst.find(x => x.id === id);

  if (!ret) {
    res.status(404).send('not found.');
  } else {
    res.json(ret);
  }
} 

if(fs.existsSync("./certificado.key"))
{
  // Carrega o certificado e a key necessários para a configuração. 
  const options = {
    key: fs.readFileSync("./certificado.key"),
    cert: fs.readFileSync("./certificado.cert")
  };

  var credentials = { key: options.key, cert: options.cert };

  var httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port , () => {
    console.log(`API está rodando na porta ${port}`); 
  });
}
else{
  app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
  });
}
