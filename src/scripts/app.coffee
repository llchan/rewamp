{a, div} = React.DOM
BsNavbar = require('react-bootstrap/cjs/Navbar')
BsNav = require('react-bootstrap/cjs/Nav')
BsNavItem = require('react-bootstrap/cjs/NavItem')

class Router extends Backbone.Router
  routes:
    '': 'all'
    'foo': 'foo'
    'bar': 'bar'
    'baz': 'baz'

Navbar = React.createClass
  propTypes:
    view: React.PropTypes.string
  render: ->
    BsNavbar fixedTop: true,
      div className: 'navbar-header',
        a {className: 'navbar-brand', href: '#'}, 'Jaguar'
      # BsNav {navbar: true, activeKey: @props.view},
      BsNav {navbar: true, activeKey: 'foo'},
        BsNavItem {key: 'foo', href: '#/foo'}, 'Foo'
        BsNavItem {key: 'bar', href: '#/bar'}, 'Bar'
        BsNavItem {key: 'baz', href: '#/baz'}, 'Baz'

App = React.createClass
  propTypes:
    view: React.PropTypes.string
  getInitialState: ->
    view: 'all'
  componentWillMount: ->
    @props.router = router = new Router()
    router.on 'route:all', @goAll
    router.on 'route:foo', @goFoo
    router.on 'route:bar', @goBar
    router.on 'route:baz', @goBaz
    router.on 'default', @goAll
  componentDidMount: ->
    Backbone.history.start()
  goAll: ->
    @setState view: 'all'
  goFoo: ->
    @setState view: 'foo'
  goBar: ->
    @setState view: 'bar'
  goBaz: ->
    @setState view: 'baz'
  render: ->
    div null,
      Navbar {router: @props.router, view: @state.view}, null
      div className: 'container-fluid',
        switch @state.view
          when 'foo'
            div null, 'foo!'
          when 'bar'
            div null, 'bar?!'
          when 'baz'
            div null, 'baz!!'
          else
            div null, 'all...'

# TODO: put this somewhere more appropriate?
$(document).ready(->
  React.renderComponent(App(), document.getElementById('app'))
)

module.exports = App
