
var Async = require('async')
var seneca = require('seneca')()
seneca.use('seneca-sm')
var config = require('./smconfig.js').config

seneca.add('role:content, context:document, cmd: triage', function(err, respond) {
  respond(null, {command: 'execute command: role:content, context:document, cmd: triage'})
})
.add('role:content, context:document, cmd: review', function(err, respond) {
  respond(null, {command: 'execute command: role:content, context:document, cmd: review'})
})
.add('role:content, context:document, cmd: approve', function(err, respond) {
  respond(null, {command: 'execute command: role:content, context:document, cmd: approve'})
})
.add('role:content, context:document, cmd: schedule', function(err, respond) {
  respond(null, {command: 'execute command: role:content, context:document, cmd: schedule'})
})
.add('role:content, context:document, cmd: approve_final', function(err, respond) {
  respond(null, {command: 'execute command: role:content, context:document, cmd: approve_final'})
})

Async.series({
  create_instance: function (callback) {
    seneca.act("role: 'sm', create: 'instance'", config, function (err, context) {
      console.log('created the state machine:', config.name)
      callback(err)
    })
  },
  verify_state: function (callback) {
    seneca.act('role:' + config.name + ', get:context', function (err, context) {
      console.log('current state: ', context.current_status)
      callback(err)
    })
  },
  triage_document: function (callback) {
    console.log('change state to triage')
    seneca.act('role:' + config.name + ', cmd: triage', function(err, context) {
      console.log('state changed')
      callback(err)
    })
  },
  verify_triage_state: function (callback) {
    seneca.act('role:' + config.name + ', get:context', function (err, context) {
      console.log('current state: ', context.current_status)
      callback(err)
    })
  }
},
function (err, results) {
//   console.log(err, results)
})
