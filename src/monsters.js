import './scss/app.scss'
import Footer from './footer.js'
import Header from './header.js'

const Monsters = (props) => {
  return (
    <div className='app'>
      <Header directory='5e\monsters\' />
      <main className='body'>
        <p>
          Hello Monsters!
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Monsters
