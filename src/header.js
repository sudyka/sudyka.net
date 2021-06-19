import './scss/app.scss'
import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = (props) => {
  const { directory } = props
  return (
    <header className='header'>
      <Navbar bg='dark' expand='lg' sticky='top' variant='dark'>
        <Navbar.Brand>
          <Link className='brand' to='/'>
            &nbsp;Sudyka:\{directory}><span className='cursor' />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar'>
          <Nav className='mr-auto'>
            <NavDropdown menuVariant='dark' title='5e Materials'>
              <NavDropdown.Item as={Link} to='/5e/subclasses'>
                Subclasses
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/5e/spells'>
                Spells
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/5e/monsters'>
                Monsters
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} className='link' to='/about'>
              About
            </Nav.Link>
            <Nav.Link as={Link} className='link' to='/tech'>
              Tech
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
