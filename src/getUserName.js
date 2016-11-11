/*
Задача 2C: @username
Верезать из строки вида `telegram.me/skillbranch` username `skillbranch`
Многие сервисы, такие как ВК, Twitter, Telegram позволяют занимать унивальные имена пользователей.
Очень часто пользователи заполняя формы на сайте, вставляют не стандартные ссылки на свои профили в соц.сетях.
Клиент выполняет GET запрос с параметром Query: ?username в разных форматах.

Задача: привести все ссылки к единому формату, а именно к виду @username.
В случае если в url находится некорретная строка, необходимо вывести Invalid username

###Примеры
Пример 1
?username=https://vk.com/skillbranch
@skillbranch

Пример 2
?username=//vk.com/skillbranch
@skillbranch

Пример 3
?username=skillbranch
@skillbranch

Пример 4
?username=https://vk.com/skillbranch?w=wall-117903599_1076
@skillbranch
*/

export default function getUserName(url){
  console.log("> " + url);
  if (/github.com/i.test(url)){
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
