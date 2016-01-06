var express = require('express')
var router = express.Router()

/*
Purpose : if do an HTTP GET to /users/userlist,
server return JSON that lists all of the users in
database. Add paging to front-end if list get too long.
 * GET userlist.
 */
router.get('/userlist', function (req, res) {
  var db = req.db
  var collection = db.get('userlist')
  collection.find({}, {}, function (e, docs) {
    res.json(docs)
  })
})
/*
 * POST to adduser.
Post some data (req.body),insert it into
‘userlist' collection in database. If ok, return an
empty string. If it err, return err message that
database gives us
 */
router.post('/adduser', function (req, res) {
  var db = req.db
  var collection = db.get('userlist')
  collection.insert(req.body, function (err, result) {
    res.send(
            (err === null) ? { msg: '' } : { msg: err }
        )
  })
})

/*
Pass in ID parameter (so URI we'll be referencing will
be /deleteuser/12345 for eg, and we refer it in code
with req.params.id), MongoDB matches it with the unique
_id field generated for every entry in collection, and
del it. If ok return blank string, if err sends back
err message from MongoDB.
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function (req, res) {
  var db = req.db
  var collection = db.get('userlist')
  var userToDelete = req.params.id
  collection.remove({'_id': userToDelete }, function (err) {
    res.send((err === null) ? { msg: '' } : { msg: 'error: ' + err })
  })
})
module.exports = router
