import './scss/app.scss'
import Footer from './footer.js'
import Header from './header.js'

const Tech = (props) => {
  return (
    <div className='app'>
      <Header directory='tech\' />
      <main className='body'>
        <p>
          Hello World!
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Tech
