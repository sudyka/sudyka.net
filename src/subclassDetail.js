import { Card } from 'react-bootstrap'
import './scss/app.scss'

const SubclassDetail = (props) => {
  const { abilities, subclass } = props
  return <>
    {abilities.map(ability => <>
      <Card bg='dark' border={subclass.theme} style={{ width: '90%' }}>
        <Card.Header>Level {ability.level}: {ability.title}</Card.Header>
        <Card.Body><Card.Text>{ability.text}</Card.Text></Card.Body>
      </Card>
      <br />
    </>)}
  </>
}

export default SubclassDetail
