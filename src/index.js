/*
2 урок
Основные архитектурные особенности JavaScript.
Новым конструкциям ES6, ES7.
JavaScript на сервере - Node.js.
Пакетный менеджер NPM.
Инструментом Babel.
Паттерны асинхронного программирования (Promises, Async-await).
*/

import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import Promise from 'bluebird';
import _ from 'lodash';

import transName from './translateName';
import getUserName from './getUserName';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});


const __DEV__ = true;


// app.get('/canonize', (req, res) => {
//   const username = getUserName(req.query.url);
//   res.json({
//     url:req.query.url,
//     username,
//   });
// });


// Найти самого жирного покемона
const pokemonFields = ['id', 'name', 'weight', 'height'];
const baseUrl = 'https://pokeapi.co/api/v2';
// pokemon
// pokemon/1

async function getPokemons(url, i = 0) {
  console.log('getPokemons', url, i);
  const response = await fetch(url);
  //console.log(response);
  const page = await response.json();
  const pokemons = page.results;
  if (__DEV__ && i > 1) {
      return pokemons;
  }
  if (page.next) {
    const pokemons2 = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemons2,
    ]
  }
  return pokemons;
}

async function getPokemon(url) {
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}
//console.log(">> getPokemonsWeight(1)" + await getPokemonsWeight(1));


// const pokemonsUrl = baseUrl + '/pokemon';
//
// getPokemons(pokemonsUrl).then(pokemons => {
//   console.log('>> pokemons.length ' + pokemons.length);
// })


app.get('/pokemons', async (req, res) => {
  try {
    const pokemonsUrl = baseUrl + '/pokemon';
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    const pokemonsPromises = pokemonsInfo.map(info => {
      return getPokemon(info.url);
    });


    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map(pokemon => {
      return _.pick(pokemon, pokemonFields); //фильтр
    });
    const sortPokemons = _.sortBy(pokemons, pokemon => pokemon.weight);

    return res.json({
      lenght: sortPokemons.length,
      sortPokemons,
    });
  } catch(err) {
    console.log(err);
    return res.json({ err });
  }
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
