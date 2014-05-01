R = React.DOM
div = R.div

Navbar = require('react-bootstrap/cjs/Navbar.js')
Nav = require('react-bootstrap/cjs/Nav')

console.log Navbar
console.log Nav

App = React.createClass
  render: ->
    div null, 'test'

module.exports = App
