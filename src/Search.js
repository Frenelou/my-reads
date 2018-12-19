import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'

class Search extends Component {
  state = {
    books: []
  }
  search = (event) => {
    if (event.target.value.length < 1) {
      this.setState({books: []})
      return
    }
    BooksAPI.search(event.target.value).then((books) => {
      this.setState({books: books})
    })
  }
  render() {
    const {books} = this.state
    const {toTitlecase, shelves, updateBookList, library, fish} = this.props
    return (<div className="search-books">
      <div className="search-books-bar">

        <Link to='/'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={this.search}/>

        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
          {books.length > 0 && books.map((b, index) => <Book key={b.id} book={b} toTitlecase={toTitlecase} shelves={shelves} updateBookList={updateBookList} library={library} fish={fish}/>)}
        </ol>
      </div>
    </div>)
  }
}

export default Search
