import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import Promise from 'bluebird';
import _ from 'lodash';
// import JSON from 'json';

/*
http://account.skill-branch.ru/cabinet/courseLesson/58107e5e102b073743a167e1

Задача 3A: API 80286
Реализовать Express.js приложение по работе с API, обработка GET запросов для получения данных
У вас есть объект, который описывает структуру персонального компьютера на базе процессора 80286.
Необходимо реализовать геттеры внутренних подструктур и свойст этой модели.
Ответ должен быть всегда валидным JSON, например при отдаче строки, она должна быть в двойных кавычках
(смотрите примеры).
В случае ошибки запроса подструктуры которой нет в модели, необходимо возвращать 404 код ошибки,
с телом "Not found". Нумерация массивов начинается с 0.
Дополнительно необходимо реализовать метод /volumes, который подсчитывает, сколько места на каком диске
находится, подробности можно увидеть в примерах.
Структуру модели, можно получить ТУТ
Совет, так как данная структура может быть изменена в процессе, необходимо регулярно обновлять
её в программе. Или разработать механиз, автоматического скачивания при старте веб-сервера.

*/

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
var pc;

app.get('/volumes', async (req, res) => {
  var result = {};
  await pc.hdd.forEach(function(item, i, arr){
    const nameDrive = item.volume.toString();
    if (nameDrive in result)
      result[nameDrive] = String(+result[nameDrive].slice(0, -1) + +item.size)+'B';
    else {
      result[nameDrive] = String(item.size + 'B');
    }
  });
    return res.send(result);
});


app.get(/\/.+/, async (req, res) => {
  //res.send(req.url);  //  /board
	const nodes = req.url.split('/').slice(1);

	let result = pc;
  await nodes.forEach(function(item, i, arr){
    if (!(item in result))
      return res.status(404).send('Not found');
    result = result[item];
  });
  return res.send(JSON.stringify(result));
});


var getStatus = function (codeError, obj, text = ""){
  return "- Status " + codeError + "<br>"+ text;
}
app.get('/', (req, res) => {
      if (pc){
        console.log(pc);
        res.json(pc);
      }
      else {
        res.send(getStatus(404, null, "Not found"));
      }
});


  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  	fetch(pcUrl)
  		.then(async (res) => {
  			pc = await res.json();
        console.log(res.headers.get('Content-Type')); // application/json; charset=utf-8
        console.log(res.status); // 200
  		})
  		.catch(err => {
  			console.log('Что-то пошло не так:', err);
        //return res.status(404).send('Not found');
  		});


  });
