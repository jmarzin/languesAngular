const db = require('./connect');

// add query functions
function getFormsTypes(req, res, next) {
  let id = req.params.id;
  if (/\d+/.test(id)) {
    id = parseInt(id);
    db.one('select * from formstypes where id = $1', id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  } else {
    db.any('select * from formstypes where language_id = $1 order by number', id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  }
}

function createFormsType(req, res, next) {
  req.body.number = parseInt(req.body.number);
  db.one('insert into formstypes(language_id, number, in_french, last_update)' +
    'values($1, $2, $3, now()) returning *',
    [req.body.language_id, parseInt(req.body.number), req.body.in_french])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeFormsType(req, res, next) {
  const id = parseInt(req.params.id);
  db.result('delete from formstypes where id = $1', id)
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

function updateFormsType(req, res, next) {
  db.result('update formstypes set language_id=$1, number=$2, in_french=$3, last_update=now() where id=$4',
    [req.body.language_id, parseInt(req.body.number), req.body.in_french, req.body.id])
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
  getFormsTypes: getFormsTypes,
  createFormsType: createFormsType,
  updateFormsType: updateFormsType,
  removeFormsType: removeFormsType
};

