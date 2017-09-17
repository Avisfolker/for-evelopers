const fs = require("fs");
const host = '0.0.0.0';
const port = '9022';
const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const path = require('path');
let app = express();
let server = http.createServer(app);
server = app.listen(port, host);
let apiRoutes = express.Router();

apiRoutes.use((req, res, next) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiRoutes.use(bodyParser.json());

app.use('/api', apiRoutes);

// подключаем скрипты для фронтенда
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/angular-ui-router/release'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/js', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));


apiRoutes.post('/getArrayEmployees', (req, res) => { // получаем ситрудников
  let filePath = path.join(__dirname, 'employees.json');

  fs.readFile(filePath, {encoding: 'utf-8'}, (err,data) =>{
    if (!err) {
      res.send(data);
    } else {
      res.send({success: false, msg: err});
    }
  });

});
apiRoutes.post('/saveArrayEmployees', (req, res) => { // сохраняем сотрудников
  let filePath = path.join(__dirname, 'employees.json');

  fs.readFile(filePath, {encoding: 'utf-8'}, (err,data) => {
    if (!err) {
      let info = JSON.parse(data);
      let emp = req.body.emp;
      info.data.forEach((item) =>{
        if (item.id == emp.id){
          item.name = emp.name;
          item.second_name = emp.second_name;
          item.experience = emp.experience;
          item.age = emp.age;
          item.address = emp.address;
        }

      });
      let json = JSON.stringify(info);
      fs.writeFile(filePath, json , (err) =>{
        if (err) {
          res.status(500).jsonp({ error: 'Failed to write file' });
        }
        res.send("File write success");
      });



    } else {
      res.send({success: false, msg: err});
    }
  });

});

server.on('error',  (err) => {
    console.log('error:' + err);
});

server.on('listening', () => {
      console.log('Application ready to serve requests.');
      console.log('server listening on http://'+host+':'+port);
});