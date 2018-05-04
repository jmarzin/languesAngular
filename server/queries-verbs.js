const db = require('./connect');

// add query functions

function getVerb(req, res, next) {
  let id = req.params.id;
  if (/\d+/.test(id)) {
    db.one('select * from verbs where id = $1', +id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  } else {
    db.any('select * from verbs where language_id = $1 order by in_language', id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  }
}

function createVerb(req, res, next) {
  db.one('insert into verbs(language_id, in_language, last_update) ' +
    'values(${language_id}, ${in_language}, now()) returning *',
    req.body)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeVerb(req, res, next) {
  const id = parseInt(req.params.id);
  db.tx(t => {
    const d1 = t.none('delete from forms where verb_id = $1', id);
    const d2 = t.result('delete from verbs where id = $1', id);
    return t.batch([d1, d2]);
  })
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

function updateVerb(req, res, next) {
  db.result('update verbs set language_id=$1, in_language=$2, last_update=now() where id=$3',
    [req.body.language_id, req.body.in_language, parseInt(req.params.id)])
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
  getVerb: getVerb,
  createVerb: createVerb,
  updateVerb: updateVerb,
  removeVerb: removeVerb
};
