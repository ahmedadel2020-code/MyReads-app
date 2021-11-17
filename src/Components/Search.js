import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';
import SelectChanges from './SelectChanges';

class Search extends Component {
    
    state = {
        query: '',
        searchedBooks: []
    }
    
     /* 
        In handleInput function:
            - set current query
            - call search from BooksAPI and give it {query}
            - if there is no query will not show any books
            - if there is a query then will check that there is books
            - will iterate over the searchedBooks
            - Inside it will iterate over books that are coming from Wrapper Component
            - If we found a book in the home page existing in Search page then will make sure it has the same shelf
            - setState to make sure every time book is rendered to the correct Shelf
            - the last step is to put those Resulted books in searchedBooks array
    */
    handleInput = (query) => {
        this.setState(() => ({ query }));
        BooksAPI.search(this.state.query).then((booksResults) => {
            if(this.state.query === '') {
                this.setState({ 
                    searchedBooks: []
                })
            } else {
                if(booksResults && booksResults.length > 0) {
                    booksResults.forEach((bookRes) => {
                        this.props.books.forEach((book) => {
                            if(bookRes.id === book.id) {
                                const Index = this.props.books.findIndex((book) => book.id === bookRes.id)
                                bookRes.shelf = this.props.books[Index].shelf;
                            }
                            this.setState({})
                        })
                    })
                    
                }
                this.setState({
                    searchedBooks: booksResults
                })
            } 
        })

    
        
    }


    render() {
        // Destructuring query and searchedBooks from state
        // Destructuring updateShelf from Wrapper Component

        const { query, searchedBooks } = this.state;
        const { updateShelf } = this.props;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                
                {/* 
                    I used "a" tag here instead of "Link" to make sure that if I go back to
                    the home page, the page should refresh to update the books that are coming from Search page
                */}
                    <a href="/">
                        <button className="close-search">Close</button>      
                    </a>
                    
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.handleInput(event.target.value)}
                        />
                    </div>
                </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            { 
                                // check that there is books then map over them to display them.
                            }

                            {
                                searchedBooks && 
                                searchedBooks.length > 0 
                                && searchedBooks.map((book) => (
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
        )
    }
}

// validate updateShelf to be a function
Search.propTypes = {
    updateShelf: PropTypes.func.isRequired
}
export default Search
