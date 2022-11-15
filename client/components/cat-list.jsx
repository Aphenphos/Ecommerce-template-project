import {useState, useEffect} from 'react'
// This imports a TypeScript file from JavaScript.
import listItemFn from './list-item'
import listItemStyles from './list-item.module.css'

// ignoreLoad allows us to prevent the "act" warning from react-testing-library
// by skipping useEffect. We should only pass true here when we care about
// testing the loading UI, and this should never see use in production code.
export default (ignoreLoad) => {
  const ListItem = listItemFn(listItemStyles.cat)
  const component = (props) => {
    const [cats, setCats ] = useState([])
    const [error, setError ] = useState(null)
    if(!ignoreLoad) {
      useEffect(() => {
        fetch('/api/v1/cats').then((res) => {
          return res.json().then(res.status < 400 ? setCats : setError)
        })
      }, [])
    }
    if(cats.length > 0) {
      return <ul>
        {cats.map((cat, i) => {
          return <ListItem key={i}>
            <span data-testid={'cat-' + i}>{cat.name}</span>
          </ListItem>
        })}
      </ul>
    } else if(error != null) {
      return <span style={{color: 'red'}}>{JSON.stringify(error)}</span>
    } else {
      return <span data-testid="cat-loader">Loading Cats!</span>
    }
  }
  component.displayName = 'CatList'
  return component
}
