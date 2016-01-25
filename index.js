
var Async = require('async')
var seneca = require('seneca')()
seneca.use(require('seneca-sm'))
var config = require('./smconfig.js').config

seneca.add('role:content, context:document, cmd: triage', function(err, respond) {
  respond(null, {state: 'triage state'})
})
.add("role:'content', context:'document', cmd: 'review'", function(err, respond) {
  respond(null, {state: 'review state'})
})
.add("role:'content', context:'document', cmd: 'approve'", function(err, respond) {
  respond(null, {state: 'approve state'})
})
.add("role:'content', context:'document', cmd: 'schedule'", function(err, respond) {
  respond(null, {state: 'schedule state'})
})
.add("role:'content', context:'document', cmd: 'approve_final'", function(err, respond) {
  respond(null, {state: 'approve_final state'})
})

Async.series({
  create_instance: function (callback) {
    seneca.act("role: 'sm', create: 'instance'", config, function (err, context) {
      callback(err)
    })
  },
  verify_state: function (callback) {
    seneca.act('role:' + config.name + ', get:context', function (err, context) {
    //   console.log('context', context)
      callback(err)
    })
  }
},
function (err, results) {
  console.log(err, results)
})

// seneca.act('role:content, context: document, cmd: triage', function(err, result) {
//   console.log(result)
// })
