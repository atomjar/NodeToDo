const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

let listOfToDos = [];

app.get('/', (request, response) => { response.render('todos', { todos: listOfToDos })
});


app.post('/', (request, response) => {
  console.log(request.body);
  let id = parseInt(Math.random() * 1000);
  newToDoObject = { text: request.body.newToDo, id: id }
  listOfToDos.push(newToDoObject);
  console.log(listOfToDos);
  response.redirect('/');
})

app.post('/mark-complete/:id', (request, response) => {
  let idOfTheToDoThatImMarkingComplete = parseInt(request.params.id);
  let completedToDo = listOfToDos.find( (todo) => {
    return todo.id === idOfTheToDoThatImMarkingComplete;
  });
  completedToDo.complete = true;
  response.redirect('/');
});

app.listen(3000, () => { console.log('Server listening at localhost:3000')})
