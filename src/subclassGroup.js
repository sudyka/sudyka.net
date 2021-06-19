import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './scss/app.scss'

const SubclassGroup = (props) => {
  const {title, subclasses} = props
  const [expanded, setExpanded] = useState(false)
  return <>
    <Button
      active={expanded}
      disabled={!subclasses || subclasses.length === 0}
      className='class'
      onClick={() => setExpanded(!expanded)}
      size='lg'
      variant='dark'
    >
      {title}
    </Button>
    {expanded &&
      subclasses.map(subclass => <Button as={Link} className='subclass' variant={'outline-'+subclass.theme} to={'#'+subclass.slug}>{subclass.title}</Button>)
    }
  </>
}

export default SubclassGroup
