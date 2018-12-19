import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  getNewShelf = (e) => {
    BooksAPI.update(this.props.book, e.target.value).then(() => {
      this.props.updateBookList()
    })
    this.props.goBack && this.props.goBack()
  }
  getBooksShelf = () => {
    const {library, book} = this.props
    if (book.shelf !== undefined) {
      return book.shelf
    } else {
      const match = library.filter((b) => {
        return b.id === book.id
      })
      return match.length > 0
        ? match[0].shelf
        : 'none'
    }
  }
  render() {
    const {book, shelves, toTitlecase} = this.props
    return (<li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: 'url("' + (
                typeof book.imageLinks != "undefined"
                ? book.imageLinks.thumbnail
                : '') + '")'
            }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.getNewShelf} value={this.getBooksShelf()}>
              <option value="move" disabled="disabled">Move to...</option>
              {shelves.map((s) => (<option value={s} key={s}>{toTitlecase(s)}</option>))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (book.authors.map((a, index) => <div className="book-authors" key={a}>{a}<br/></div>))}
      </div>
    </li>)
  }
}

export default Book
