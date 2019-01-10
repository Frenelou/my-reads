import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import {Link} from 'react-router-dom'

class Search extends Component {
  state = {
    books: [],
    searched: ''
  }
  search = (event) => {
    const searched = event.target.value
    if (event.target.value.length < 1) {
      this.setState({books: []})
      return
    }
    BooksAPI.search(searched).then((books) => {
      this.setState({books: books, searched: searched})
    })
  }
  render() {
    const {books} = this.state
    const {toTitlecase, shelves, updateBookList, library, goBack} = this.props
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
          {books.length > 0 && books.map((b, index) => <Book key={b.id} book={b} toTitlecase={toTitlecase} shelves={shelves} updateBookList={updateBookList} library={library} goBack={goBack}/>)}
          {this.state.searched.length > 0 && <p>No book title contains the word {this.state.searched}</p>}
        </ol>
      </div>
    </div>)
  }
}

export default Search
