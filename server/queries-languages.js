const db = require('./connect');

// add query functions

function getAllLanguages(req, res, next) {
  db.any('select * from languages order by name')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function createLanguage(req, res, next) {
  db.one('insert into languages(language_id, name, icon)' +
    'values(${language_id}, ${name}, ${icon}) returning *',
    req.body)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeLanguage(req, res, next) {
  const id = parseInt(req.params.id);
  db.result('delete from languages where id = $1', id)
    .then(function (data) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          rowCount: data.rowCount
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleLanguage(req, res, next) {
  const id = parseInt(req.params.id);
  db.one('select * from languages where id = $1', id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateLanguage(req, res, next) {
  db.result('update languages set language_id=$1, name=$2, icon=$3, last_update=now() where id=$4',
    [req.body.language_id, req.body.name, req.body.icon, parseInt(req.params.id)])
    .then(function (data) {
      res.status(200)
        .json({
          rowCount: data.rowCount
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllLanguages: getAllLanguages,
  getSingleLanguage: getSingleLanguage,
  createLanguage: createLanguage,
  updateLanguage: updateLanguage,
  removeLanguage: removeLanguage
};

