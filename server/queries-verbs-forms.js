const db = require('./connect');

// add query functions

function getVerbsForms(req, res, next) {
  if (req.query.form_type_id) {
    db.any(`select count(*) from forms where form_type_id = $1`, +req.query.form_type_id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err){
        return next(err);
      });
  } else if (req.query.verb_id) {
    db.any('select t1.id, t1.verb_id, t1.form_type_id, t1.language_id, t1.in_language, t1.last_update from forms t1, formstypes t2 ' +
    'where t1.verb_id = $1 and t2.id = t1.form_type_id order by t2.number', +req.query.verb_id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err){
        return next(err);
      })
  } else {
    res.status(200)
      .json('requête imprévue');
  }
}

function createVerbForm(req, res, next) {
  db.one('insert into forms(verb_id, form_type_id, language_id, in_language, last_update) ' +
    'values(${verb_id}, ${form_type_id}, ${language_id}, ${in_language}, now()) returning *',
    req.body)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeVerbForm(req, res, next) {
  const id = parseInt(req.params.id);
  db.result('delete from forms where id = $1', id)
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

function updateVerbForm(req, res, next) {
  db.result('update forms set verb_id = $1, form_type_id = $2, language_id = $3, in_language = $4, last_update = now() where id=$5',
    [req.body.verb_id, req.body.form_type_id, req.body.language_id, req.body.in_language, parseInt(req.body.id)])
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
  getVerbsForms: getVerbsForms,
  createVerbForm: createVerbForm,
  removeVerbForm: removeVerbForm,
  updateVerbForm: updateVerbForm
};
