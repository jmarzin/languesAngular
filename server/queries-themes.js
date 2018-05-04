const db = require('./connect');

// add query functions
function getTheme(req, res, next) {
  let id = req.params.id;
  if (/\d+/.test(id)) {
    id = parseInt(id);
    db.one('select * from themes where id = $1', id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  } else {
    db.any('select * from themes where language_id = $1 order by in_language', id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  }
}

function createTheme(req, res, next) {
  req.body.number = parseInt(req.body.number);
  db.one('insert into themes(language_id, number, in_language, last_update)' +
    'values($1, $2, $3, now()) returning *',
    [req.body.language_id, parseInt(req.body.number), req.body.in_language])
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeTheme(req, res, next) {
  const id = parseInt(req.params.id);
  db.result('delete from themes where id = $1', id)
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

function updateTheme(req, res, next) {
  db.result('update themes set language_id=$1, number=$2, in_language=$3, last_update=now() where id=$4',
    [req.body.language_id, parseInt(req.body.number), req.body.in_language, req.body.id])
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
  // getAllThemes: getAllThemes,
  // getSingleTheme: getSingleTheme,
  getTheme: getTheme,
  createTheme: createTheme,
  updateTheme: updateTheme,
  removeTheme: removeTheme
};

