import React from 'react'
import Book from './Book'

const BookShelf = (props) => {
  const {booksOnShelves, name, toTitlecase, shelves, updateBookList} = props
  return (<div className="bookshelf">
    <h2 className="bookshelf-title">{toTitlecase(name)}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {booksOnShelves.map((b, index) => <Book key={b.id} book={b} toTitlecase={toTitlecase} shelves={shelves} updateBookList={updateBookList}/>)}
      </ol>
    </div>
  </div>)
}

export default BookShelf
