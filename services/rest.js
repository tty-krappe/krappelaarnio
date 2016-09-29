'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const morgan = require('morgan')
const helmet = require('helmet')

const Knex = require('knex')
const knexConfig = require('./../knexfile')
const Model = require('objection').Model

// Initialize knex.
const knex = Knex(knexConfig)

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex)

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// development only
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

module.exports = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
