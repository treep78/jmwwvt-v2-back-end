'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Image = models.image;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Image.find()
    .then(images => res.json({
      images: images.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const show = (req, res) => {
  res.json({
    image: req.image.toJSON({ virtuals: true, user: req.user }),
  });
};

const create = (req, res, next) => {
  console.log('got this far');
  let image = Object.assign(req.body.image, {
    _owner: req.user._id,
  });
  Image.create(image)
    .then(image =>{
      let link = image.link.split('');
      let success=false;
      for(let i=0; i<link.length;i++) {
        console.log(link[i]);
        if(link[i] === '.'){
          let ext = link[i+1]+link[i+2]+link[i+3];
          if(ext === 'png' || ext === 'jpg') {
            console.log('working');
            success=true;
            res.status(201)
              .json({
                image: image.toJSON({ virtuals: true, user: req.user }),
              });
              break;
            }
          }
        }
        if(!success){
          res.status(400).json({ error: 'must me a .png or .jpg link.'});
        }
      })
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.image.update(req.body.image)
    .then(() => res.sendStatus(204))
    .catch(next);
};

const destroy = (req, res, next) => {
  req.image.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Image), only: ['show'] },
  { method: setModel(Image, { forUser: true }), only: ['update', 'destroy'] },
], });
