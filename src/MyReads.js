import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import {Link, Route} from 'react-router-dom'

class MyReads extends Component {
  state = {
    books: [],
    shelves: [
      'wantToRead', 'currentlyReading', 'read'
    ],
    showSearchPage: false
  }
  componentDidMount() {
    this.updateBookList()
  }
  updateBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({books: books}))
    })
  }
  toTitlecase = (string) => string.charAt(0).toUpperCase() + string.slice(1).replace(/([A-Z])/g, ' $1').trim()

  render() {
    const {shelves, books} = this.state
    return (<div className="app">

      <Route path='/search' render={({history}) => (<Search toTitlecase={this.toTitlecase} shelves={shelves} updateBookList={this.updateBookList} library={books} fish={() => {
            history.push('/')
          }}/>)}/>

      <Route exact={true} path='/' render={() => (<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>
              {
                shelves.map((s) => (<BookShelf key={s} name={s} booksOnShelves={this.state.books.filter((b) => {
                    return (b.shelf === s)
                  })} toTitlecase={this.toTitlecase} shelves={shelves} updateBookList={this.updateBookList}/>))
              }
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>
              <button>Add a book</button>
            </Link>
          </div>
        </div>)}/>

    </div>)
  }
}

export default MyReads
