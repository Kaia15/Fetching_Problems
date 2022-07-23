import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import ReactDOM from 'react'
import Films from '../src/Comps/films'

/*const RndImgUrls = ["https://image.shutterstock.com/image-photo/scenery-pink-cherry-blossom-trees-600w-2138787257.jpg",
                    "https://image.shutterstock.com/image-photo/pink-cherry-blossom-blooming-summer-600w-1371656231.jpg",
                    "https://i.pinimg.com/564x/8e/cb/1a/8ecb1a08f3f5ff3c4aa0054dc075509a.jpg"]

const RndImgUrl = (arr) => { return RndImgUrls[Math.floor(Math.random()*arr.length)]}


export default function App() {
  const listInnerRef = React.useRef();
  const [users, setUsers] = React.useState([])
  const [page, setPage] = React.useState(1)

  const buttonRef = React.useRef();

  // let size = 50;

  // tìm hiểu event loop, và debounce

  const onScroll = () => {
    // console.log(listInnerRef.current)
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight)
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        console.log("reached bottom");
        /*if (buttonRef.current) {
          clearTimeout(buttonRef.current)
        }
        buttonRef.current = setTimeout(() => setPage(page + 1), 800)
      }
    }
  };

  const fetchData = async(size) => {
    
    const response = await fetch(`http://localhost:9000/api/v1/fake_users/scroll/?page=${page.toString()}&size=${size}`)
    const jsonList = await response.json();
    console.log(jsonList)
    setUsers(users.concat(jsonList));
  }

  React.useEffect(() => {
    fetchData(100)
    return () => {}
  }, [page])

  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
      {users.length > 0 && users.map((obj, index) => {
        return (
        <div>
          <li key = {index}> {index}, {obj.username} </li>
        </div>
        
        )
      })}
      </div>
    </div>
  );
}
*/
/*async function d(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${page}`
  const fetched = await fetch(url)
  const a = await fetched.json()
  console.log(a)
}*/


export default function App() {
  const [all, setAll] = React.useState([])
  const [searchVal, setSearchVal] = React.useState('')
  const [searchList, setSearchList] = React.useState([])
  let list = []
  // const pages = [1,2,3,4,5,6,7,8,9,10]
  
  const data = async function () {
    

    const pages = Array.from({  
      length: 125  
    }, (v, k) => k + 1)

    let a = []
    let requests = pages.map(p => fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${p}`))
    let promise = await Promise.all(requests)
    let result = await Promise.all(promise.map(pr => 
                                                pr.json()))
    let films = await Promise.all(result.map(r => r['results']))                                            
    console.log(films)
    setAll(films)
  }

  const handleSearch = React.useEffect(
    () => {
      if (searchVal !== "") {
        setSearchList(() => {
          // console.log(list.length > 0)
          let searched = list.filter(item => {
            let title = item.title;
            return title.toLowerCase().includes(searchVal) || title.toUpperCase().includes(searchVal)
          
          })
          return searched
        })
      } else {
        setSearchList([])
        console.log("Please enter the movie")
      }
    }
  , [searchVal])
  
  
  React.useEffect(() => 
                { data()
                  return () => {}
                }, [])

  
  if (all.length > 0) {
    for (let i = 0; i < all.length; i ++) {
      let b = all[i]
      // console.log(all[i])
      // console.log(...b)
      list.push(...b)
    }
  }
  // console.log(list)
  // console.log(searchList)
  /*return (
    <div>
      Search: <input value = {searchVal} onChange = {(e) => setSearchVal(e.target.value)} handleSearch = {() => handleSearch}/>
      <br />
      {searchList.length > 0 && searchList.map(s => (<li key = {s.title}> {s.title} </li>))}
    </div>
  )*/
  
}
