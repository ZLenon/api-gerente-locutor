const validationForm = require('./validationForm');
const validName = require('./validName');
const validToken = require('./validToken');
const validAge = require('./validAge');
const validTalk = require('./validTalk');
const { validWatchedAt, validWatchedAtQuery } = require('./validWatchedAt');
const { validRate, validRateQuery } = require('./validRate');

module.exports = { 
  validationForm,
   validName, 
   validToken,
   validAge,
   validTalk,
   validWatchedAt,
   validWatchedAtQuery,
   validRateQuery,
   validRate,
  };