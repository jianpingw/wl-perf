
module.exports = {

findMessage: function(req, res) {
  var author = req.param('author');
  Mailbox.find({author: author})
  .populate('message')
  .populate('author')
  .populate('recipient')
  .populate('task')
  .populate('seller')
  .exec(function(err, messages) {
    res.json(200, messages);
  });
},

_config: {}

}
