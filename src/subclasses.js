import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './scss/app.scss'
import Footer from './footer.js'
import Header from './header.js'
import SubclassDetail from './subclassDetail.js'
import SubclassGroup from './subclassGroup.js'

const Subclasses = (props) => {
  const [subclass, setSubclass] = useState(null)
  const [abilities, setAbilities] = useState([])
  return (
    <div className='app'>
      <Header directory='5e\subclasses\' />
      <main className='body'>
        <Row>
          <Col xs='3'>
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Artificer' subclasses={[]} />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Barbarian' subclasses={[]} />
            <SubclassGroup
              selectAbilities={setAbilities}
              selectSubclass={setSubclass}
              title='Bard'
              subclasses={[
                {title: 'College of Snakeoil', slug: 'college-of-snakeoil', theme: 'weird-west'},
              ]}
            />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Cleric' subclasses={[]} />
            <SubclassGroup
              selectAbilities={setAbilities}
              selectSubclass={setSubclass}
              title='Druid'
              subclasses={[
                {title: 'Circle of the Sun', slug: 'circle-of-the-sun', theme: 'weird-west'},
              ]}
            />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Fighter' subclasses={[]} />
            <SubclassGroup
              selectAbilities={setAbilities}
              selectSubclass={setSubclass}
              title='Monk'
              subclasses={[
                {title: 'Way of the Brave', slug: 'way-of-the-brave', theme: 'weird-west'},
              ]}
            />
            <SubclassGroup
              selectAbilities={setAbilities}
              selectSubclass={setSubclass}
              title='Paladin'
              subclasses={[
                {title: 'Oath of the Badge', slug: 'oath-of-the-badge', theme: 'weird-west'},
              ]}
            />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Ranger' subclasses={[]} />
            <SubclassGroup
              selectAbilities={setAbilities}
              selectSubclass={setSubclass}
              title='Rogue'
              subclasses={[
                {title: 'Detective', slug: 'detective', theme: 'noir'},
                {title: 'Gambler', slug: 'gambler', theme: 'weird-west'},
              ]}
            />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Sorcerer' subclasses={[]} />
            <SubclassGroup selectAbilities={setAbilities} selectSubclass={setSubclass} title='Warlock' subclasses={[]} />
            <SubclassGroup
              title='Wizard'
              subclasses={[
                {title: 'School of Spellslinging', slug: 'school-of-spellslinging', theme: 'weird-west'}
              ]}
              />
          </Col>
          <Col xs='9'>
            {subclass
              ? <SubclassDetail abilities={abilities} subclass={subclass} />
              : <>
                  <Card bg='dark' border='light' style={{ width: '90%' }}>
                    <Card.Body>
                      <Card.Text>
                        Select a subclass on the left to see it's unique abilities.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </>
            }
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  )
}

export default Subclasses
