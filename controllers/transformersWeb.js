const express = require('express');
const models = require('../models');
const transformers = express();

transformers.get('/', (req, res) => {
  res.render('../views/layouts/home.handlebars');
});

transformers.get('/main', (req, res) => {
  models.transformer.findAll().then(result => {
    res.json(result);
  });
});

transformers.get('/:id', (req, res) => {
  models.transformer.find({where: {id: req.params.id}}).then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('No transformer with such an id was not found');
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
        }).then(result => {
          res.json(result);
        });
      } else {
        res.send('Please fill in all details if you wish to create a new transformer.');
      }
    } else {
      res.send('Sorry, a transformer with such a name already exists.');
    }
  });
});

transformers.put('/:name', (req, res) => {
  models.transformer.findOne({where: {name: req.params.name}}).then(result => {
    if (result) {
      models.transformer.update({
        faction: req.body.faction,
        power: req.body.power
      }, {
        where: {name: req.params.name}
      }).then(res.send(`${req.params.name} has been successfully updated.`));
    } else {
      res.send('Sorry, there is no transformer with such a name in our database at the moment.');
    }
  });
});

transformers.delete('/:id', (req, res) => {
  models.transformer.findOne({where: {id: req.params.id}}).then(result => {
    if (result) {
      models.transformer.destroy({
        where: {id: req.params.id}}).then(res.send(`Transformer with id ${req.params.id} has been successfully deleted.`));
    } else {
      res.send('There is no transformer with such an id to delete.');
    }
  });
});

transformers.delete('/delete/:name', (req, res) => {
  models.transformer.findOne({where: {name: req.params.name}}).then(result => {
    if (result) {
      models.transformer.destroy({
        where: {name: req.params.name}}).then(res.send(`${req.params.name} has been successfully deleted.`));
    } else {
      res.send('There is no transformer with such a name to delete.');
    }
  });
});

module.exports = transformers;
