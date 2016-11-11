/*
Задача 2B: Фамилия И. О.

Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
Клиент делает GET запрос с параметром Query: ?fullname в виде Имя Отчество Фамилия (или Имя Фамилия или Фамилия),
ваша задача сделать вывести инициалы в таком виде: Фамилия И. О. ( или Фамилия И.).

Результат нужно вывести в виде строки, при неверных входных данных нужно вывести слово Invalid fullname.

###Примеры
Пример 1
?fullname=Steven Paul Jobs
Jobs S. P.

Пример 2
?fullname=Илья Валентинович Сегалович
Сегалович И. В.

Пример 3
?fullname=Tinna Gunnlaugsdóttir
Gunnlaugsdóttir T.

Пример 4
?fullname=Four word full name
Invalid fullname

Пример 5
?fullname=Putin
Putin
*/


export default function transName (fullName){
  try{
   console.log("> " + fullName);
   if (fullName == '' | fullName == undefined || fullName == " " )
    return "Invalid fullname";

    console.log((/\d/).test(fullName));
    if ((/\d/).test(fullName))
      return "Invalid fullname";

   var reg =  /([^\s]*)?\s?([^\s]*)?\s?([^\s]*)?\s?([^\s]*)?/;// /([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?\s?([\wа-яА-Я]*)?/;
   var name = fullName.match(reg);
   console.log(name);


  if (name[2]==undefined)
    name = name[1];
  else if (name[3]==undefined)
      name = name[2]+' '+name[1][0]+'.';
  else if (name[4] ==undefined)
   name = name[3]+' '+name[1][0]+'. '+ name[2][0]+'.';
   else name = "Invalid fullname";
   console.log(name);
   return name;
 }
 catch (e){
   return e.name;
 }
}
