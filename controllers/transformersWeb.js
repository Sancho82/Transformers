const express = require('express');
const models = require('../models');
const transformers = express();

transformers.get('/', (req, res) => {
  models.transformer.findAll().then(transformers => {
    res.locals.transformers = transformers;
    res.render('transformers/listall.handlebars', {title: 'Home', name: 'Szani'});
  });
});

transformers.get('/new', (req, res) => {
  res.render('transformers/new.handlebars');
});

transformers.get('/:id', (req, res) => {
  models.transformer.findById(req.params.id).then(transformer => {
    if (transformer) {
      res.locals.transformer = transformer;
      res.render('transformers/show.handlebars');
    } else {
      res.status(404).send('No transformer with such an id was not found');
    }
  });
});

transformers.get('/:id/edit', (req, res) => {
  models.transformer.findById(req.params.id)
    .then(transformer => {
      if (transformer) {
        res.locals = transformer;
        res.render('transformers/edit.handlebars');
      } else {
        res.status(404).send('No transformer with such an id was not found.');
      }
    });
});

transformers.post('/', (req, res) => {
  models.transformer.findOne({where: {name: req.body.name}}).then(result => {
    if (!result) {
      if (req.body.name && req.body.faction && req.body.power) {
        models.transformer.create({
          name: req.body.name,
          faction: req.body.faction,
          power: req.body.power
        }).then(res.redirect('transformers/listall.handlebars'));
      } else {
        res.send('Please fill in all details if you wish to create a new transformer.');
      }
    } else {
      res.send('Sorry, a transformer with such a name already exists.');
    }
  });
});

transformers.put('/:id', (req, res) => {
  models.transformer.update(req.body,
    { where: { id: req.params.id } })
    .then(res.redirect(`/${req.params.id}`));
});

transformers.delete('/:id', (req, res) => {
  models.transformer.destroy({
    where: {id: req.params.id}})
    .then(res.redirect('/'));
});

module.exports = transformers;
