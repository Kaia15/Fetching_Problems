import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import ReactDOM from 'react'
import Films from './Comps/films'





export default function App() {
  const [dt, setDt] = React.useState([])
  let list = []
  const data = async function () {
    // let list = []
    const pages = Array.from({  
      length: 125  
    }, (v, k) => k + 1)
  for (let p of pages) {
    let req = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${p}`)
    let jsonReq = await req.json()
    let propJsonReq = await jsonReq['results']
    console.log(p, propJsonReq)
    setDt(prev => {
      let l = []
      const contained = propJsonReq.every((i) => prev.includes(i))
      if (!contained) {
        l = [...prev, ...propJsonReq]
      } 
      return l
      }
      )
   }
  
  }

  React.useEffect(() => 
  {
    data()
    return () => {}
  }, [] )
  
  console.log(dt)

  return (
    <div>
      
    </div>
  )
}
