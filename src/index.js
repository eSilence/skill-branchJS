import express from 'express';
import cors from 'cors';


// var transName = function(fullName){
//   try{
//    console.log("> " + fullName);
//    if (fullName == '' | fullName == undefined || fullName == " " )
//     return "Invalid fullname";
//
//     console.log((/\d/).test(fullName));
//     if ((/\d/).test(fullName))
//       return "Invalid fullname";
//
//    var reg =  /([^\s]*)?\s?([^\s]*)?\s?([^\s]*)?\s?([^\s]*)?/;// /([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?/;
//    var name = fullName.match(reg);
//    console.log(name);
//
//
//   if (name[2]==undefined)
//     name = name[1];
//   else if (name[3]==undefined)
//       name = name[2]+' '+name[1][0]+'.';
//   else if (name[4] ==undefined)
//    name = name[3]+' '+name[1][0]+'. '+ name[2][0]+'.';
//    else name = "Invalid fullname";
//    console.log(name);
//    return name;
//  }
//  catch (e){
//    return e.name;
//  }
// }
var lookGitHub = function(url){
  return /github.com/i.test(url);
}

var getUserName = function(url){
  console.log("> " + url);
  if (lookGitHub(url)){
    var reg = /(github.com\/)([\w]*)/;
    var userName = url.match(reg)[2];
  }
  else{
  url = url.slice(url.lastIndexOf("/")+1);
    console.log(">> " + url);
    reg = /@?[\w]*/;
    var userName = url.match(reg)[0];
}

  console.log(userName);
  return (userName[0]=='@')?userName:'@' + userName;
}

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
  const sum = (+req.query.a | 0) + (+req.query.b | 0);
  res.send(" " + sum);
});

app.get('/task2B', (req, res) => {
  var fullName = req.query.fullname;
  console.log(fullName);
  res.send(transName(fullName));

});

app.get('/task2C', (req, res) => {
  var url = req.query.username;
  //url = "www.w.w/qw12323/webstick?ertretret.ert$dgfdg";
  res.send(getUserName(url));

});
app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
