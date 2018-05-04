const db = require('./connect');

// add query functions

function getWords(req, res, next) {
  const retour = req.query.count_only && req.query.count_only === 'true' ? 'count(*)' : '*';
  if (req.query.theme_id) {
    db.any(`select ${retour} from words where theme_id = $1`, +req.query.theme_id)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err){
        return next(err);
      });
  } else if (req.query.in_french && req.query.language_id) {
    db.any('select t2.in_french from words t1, themes t2  where t1.language_id = $1 and t1.in_french=$2 and t2.id = t1.theme_id',
      [req.query.language_id, req.query.in_french])
      .then(function (data) {
        res.status(200)
          .json(data)
      })
      .catch(function (err){
        return next(err);
      });
  } else {
    res.status(200)
      .json('requête imprévue');
  }
}

function getWord(req, res, next) {
  let id = req.params.id;
  id = parseInt(id);
  db.one('select * from words where id = $1', id)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function createWord(req, res, next) {
  req.body.number = parseInt(req.body.number);
  db.one('insert into words(language_id, theme_id, in_french, sort_word, in_french, last_update, language_level, pronunciation' +
    'values(${language_id}, ${theme_id}, ${in_french}, ${sort_word}, ${in_french}, now(), ${language_level}, ${pronunciation}) returning *',
    req.body)
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeWord(req, res, next) {
  const id = parseInt(req.params.id);
  db.result('delete from words where id = $1', id)
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

function updateWord(req, res, next) {
  db.result('update words set language_id = $1, theme_id = $2, in_french = $3, sort_word = $4, in_french = $5, ' +
    'last_update = now(), language_level = $6, pronunciation = $7 where id=$8',
    [req.body.language_id, +req.body.theme_id, req.body.in_french, req.body.sort_word, req.body.in_language,
      +req.body.language_level, req.body.pronunciation, req.body.id])
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
  getWord: getWord,
  createWord: createWord,
  updateWord: updateWord,
  removeWord: removeWord,
  getWords: getWords,
};

