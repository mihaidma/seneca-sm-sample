
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

function createInstance(callback) {
  seneca.act("role: 'sm', create: 'instance'", config, function (err, context) {
    console.log('created the state machine:', config.name)
    callback(err)
  })
}

function changeState(state, callback) {
  console.log('change state to ', state)
  seneca.act('role:' + config.name + ', cmd: ' + state, function(err, context) {
    console.log('state changed')
    callback(err)
  })
}

function verifyState(callback) {
  seneca.act('role:' + config.name + ', get:context', function (err, context) {
    console.log('current state: ', context.current_status)
    callback(err)
  })
}

Async.series([
  createInstance,
  function (callback) { changeState('triage', callback) },
  verifyState,
  function (callback) { changeState('review', callback) },
  verifyState,
  // function (callback) { changeState('triage', callback) }
  ],
function (err, results) {
//   console.log(err, results)
})
