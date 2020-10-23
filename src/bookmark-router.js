const express = require('express');
const { v4: uuid } = require('uuid');
const { bookmarks } = require('./store');
//const logger = require = require('./logger');

const bookRouter = express.Router();

bookRouter.get('/', (req, res) => {
  console.log('sending all bookmarks');
  res.send(bookmarks);
});


bookRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  let bookmark = bookmarks ? bookmarks.filter((bookmark) => {
    return bookmark.id === id;
  }) : 'No bookmarks';

  if(bookmark === 'No bookmarks' || !bookmark.length ){
    res.status(404);
    res.send('404 Not Found');
  }
  else {
    res.status(200);
    res.send(bookmark[0]);
  }
});

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

bookRouter.post('/', (req, res) => {
  let bookmark = {};
  const { title, url, description, rating } = req.body;
  let problem = false;

  bookmark.id = uuid();

  if(!title){
    res.status(400);
    res.send('Title must be supplied');
    problem = true;
  }
  else{
    bookmark.title = title;
  }

  if(!url || !isValidUrl(url)){
    res.status(400);
    res.send('Valid url must be provided');
    problem = true;
  }
  else{
    bookmark.url = url;
  }

  bookmark.description = description ? description : '';

  if(rating){
    if(rating < 1 || rating > 5) {
    res.status(400);
    res.send('Rating must be between 1 and 5');
    problem = true;
    }
    else{
      bookmark.rating= parseInt(rating, 10);
    }
  }


  if(!problem){
    bookmarks.push(bookmark);
    res.send(bookmark);
    res.status(201) 
  }

});

bookRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  let exists = false;
  for(let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].id === id){
      console.log('found bookmark');
      bookmarks.splice(i,1);
      exists = true;
      i = bookmarks.length;
    }
  }

  if(!exists){
    res.status(404);
    res.send('404 Not Found');
  }
  else {
    res.status(200);
    res.send('bookmark deleted');
  }
});

module.exports = bookRouter;