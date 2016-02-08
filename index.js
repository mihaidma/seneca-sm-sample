
var Async = require('async')
var seneca = require('seneca')()
seneca.use('seneca-sm')

var config = require('./smconfig.js').config

seneca.add('role:content, context:document, cmd: triage', function(err, respond) {
  console.log('- triage action executed')
  respond(null, {command: '# executed command: role:content, context:document, cmd: triage'})
})
.add('role:content, context:document, cmd: review', function(err, respond) {
  console.log('- review action executed')
  respond(null, {command: '# executed command: role:content, context:document, cmd: review'})
})
.add('role:content, context:document, cmd: approve', function(err, respond) {
  console.log('- approve action executed')
  respond(null, {command: '# executed command: role:content, context:document, cmd: approve'})
})
.add('role:content, context:document, cmd: schedule', function(err, respond) {
  console.log('- schedule action executed')
  respond(null, {command: '# executed command: role:content, context:document, cmd: schedule'})
})
.add('role:content, context:document, cmd: approve_final', function(err, respond) {
  console.log('- approve_final action executed')
  respond(null, {command: '# executed command: role:content, context:document, cmd: approve_final'})
})
.add('role:content, context:document, cmd: save', function(err, respond) {
  console.log('- save state')
  respond(null, {command: '# executed command: role:content, context:document, cmd: save'})
})

function createInstance(callback) {
  seneca.act("role: 'sm', create: 'instance'", config, function (err, context) {
    console.log('created the state machine:', config.name)
    callback(err)
  })
}

function changeState(state, callback) {
  console.log('Command: change state to ', state)
  seneca.act('role:' + config.name + ', cmd: ' + state, function(err, context) {
    console.log('State successfully changed to:', state)
    callback(err)
  })
}

function verifyState(state, smName, callback) {
  seneca.act('role:' + smName + ', get:context', function (err, context) {
    console.log('Verify state: current state: ', context.current_status)
    callback(err)
  })
}

Async.series({
  createInstance,
  verifyCreate: function (callback) { verifyState('CREATE', config.name, callback) },
  executeTriage: function (callback) { changeState('triage', callback) },
  verifyTriage: function (callback) { verifyState('TRIAGE_CONTENT', config.name, callback) },
  executeReview: function (callback) { changeState('review', callback) },
  verifyReview: function (callback) { verifyState('REVIEW_CONTENT', config.name, callback) },
  executeApprove: function (callback) { changeState('approve', callback) },
  verifyApprove: function (callback) { verifyState('CONTENT_APPROVED', config.name, callback) },
  executeReview2: function (callback) { changeState('review', callback) },
  verifyReview2: function (callback) { verifyState('REVIEW_CONTENT', config.name, callback) },
  executeApprove2: function (callback) { changeState('approve', callback) },
  verifyApprove2: function (callback) { verifyState('CONTENT_APPROVED', config.name, callback) },
  executeSchedule: function (callback) { changeState('schedule', callback) },
  verifySchedule: function (callback) { verifyState('CONTENT_SCHEDULED', config.name, callback) }
},
function (err, results) {
  if (err) {
    console.log("error: ", err)
  }
})
