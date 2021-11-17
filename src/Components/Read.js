import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SelectChanges from './SelectChanges';

class Read extends Component {
    render() {

         // Destructuring books, updateShelf from Wrapper Component
        const { books, updateShelf } = this.props;

        // check that all books are unique
        let uniqueBooks = [...new Set(books)]

        // filter books to be with shelf "read"
        const filterRead = uniqueBooks.filter((book) => (
            book.shelf.includes('read')
        ))
        return (
            <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                    {
                        // map over filtered Books then display them
                    }
                        {filterRead.map((book) => (
                            <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" 
                                        style={{ 
                                            width: 128,
                                            height: 193, 

                                            // check that there is image for the book if there is not smallThumbnail will put none
                                            backgroundImage: ((book.imageLinks && book.imageLinks.smallThumbnail) ?
                                                                    `url(${book.imageLinks.smallThumbnail})` : "none")
                                        }}>
                                    </div>

                                     {/* 
                                        call SelectChanges Component and give it { shelf, onUpdateShelf, book}
                                    */}
                                    <SelectChanges 
                                        shelf={book.shelf} 
                                        onUpdateShelf={updateShelf}
                                        book={book}
                                    />
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {
                                        // check that there is multiple authors for the book then join them together
                                        ((book.authors && book.authors.length) > 1 
                                            ? book.authors.join(", ") 
                                            : book.authors
                                        )
                                    }
                                </div>
                                
                            </div>
                            </li>
                        ))}
                        
                    </ol>
                </div>
            </div>
        </div>
        )
    }
}

// validating books, updateShelf

Read.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}
export default Read
