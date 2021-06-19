import logo from './logo.svg'
import './scss/app.scss'

const Footer = (props) => {
  return (
    <footer className='footer'>
      <small>
        <nobr>
          &nbsp;© 2021 Jack Sudyka. All Rights Reserved. | Powered by
          <img src={logo} className='react-logo' alt='logo' />
          <a
            className='react-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
        </nobr>
      </small>
    </footer>
  )
}

export default Footer
