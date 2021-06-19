import './scss/app.scss'
import Footer from './footer.js'
import Header from './header.js'

const Spells = (props) => {
  return (
    <div className='app'>
      <Header directory='5e\spells\' />
      <main className='body'>
        <p>
          Hello World!
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Spells
