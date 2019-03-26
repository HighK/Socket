const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const mysql = require('mysql');
const template = require('./template.js');
const clock = require('./DigitalClock.js')
const base64 = require('base-64');
const utf8 = require('utf8');

const db = mysql.createConnection({
//
});
db.connect();

app.get('/', (req, res) => {
  let html = template.HTML(template.BODYC(), template.SCRIPTC());
  res.writeHead(200, {'Context-type' : 'text/html'});
  res.end(html);
});

io.on('connection', (socket) => {
  console.log('In: ', socket.id);

  socket.on('disconnect', () => {
    console.log('out: ', socket.id);
  });

  socket.on('send', (name, text, color) => {
    if(text != "") {
      let msg = name + ' : ' + text;
      if(text == "!시간") {
        msg = clock.time();
        io.emit('message', msg, color);
      }
      else {
        console.log(msg);
        if(250 > msg.length) {
          rMsg = utf8.encode(msg);
          rMsg = base64.encode(rMsg);
          db.query(`INSERT INTO chatlog (chat) VALUES ("${rMsg}")`);
          db.query(`SELECT * FROM chatlog order by id desc limit 1`, (e, list) => {
            msg = base64.decode(list[0].chat);
            msg = utf8.decode(msg);
            io.emit('message', msg, color);
          });
        }
        else {
          socket.emit('message', '[경고] 250자 제한', 'red');
        }
      }
    }
  });
});

http.listen(3000, () => {
  console.log('===START===');
});
