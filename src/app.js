import './scss/app.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './about.js'
import Main from './main.js'
import Monsters from './monsters.js'
import Spells from './spells.js'
import Subclasses from './subclasses.js'
import Tech from './tech.js'

const App = (props) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/5e/monsters'>
          <Monsters />
        </Route>
        <Route exact path='/5e/spells'>
          <Spells />
        </Route>
        <Route path='/5e/subclasses'>
          <Subclasses />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/tech'>
          <Tech />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
