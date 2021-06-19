import './scss/app.scss'
import Footer from './footer.js'
import Header from './header.js'

const About = (props) => {
  return (
    <div className='app'>
      <Header directory='about\' />
      <main className='body'>
        <p>
          Hello World!
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default About
