const express = require('express');
const router = express.Router();
const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', secure('auth'), list);
router.get('/:id', secure('auth'), get);
router.post('/', insert);
router.put('/', secure('update'), update);

function list(req, res, next) {
  controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    }).catch(next);
}

function get(req, res, next) {
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    }).catch(next);
}

function insert(req, res, next) {
  controller.insert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    }).catch(next);
}

function update(req, res, next) {
  controller.update(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    }).catch(next);
}

module.exports = router;