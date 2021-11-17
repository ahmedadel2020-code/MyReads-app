import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import AllBooks from './AllBooks';
import Search from './Search';

class Wrapper extends Component {

    state = {
        books: []
    }
    // Get existing books from BooksAPI
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
        
    }

    render() {

        // Destructuring books from state
        const { books } = this.state;
        

        /* 
            - this function will take the book and its shelf
            - will find the index of existing books
            - if there is index then will update the shelf of the book
            - push the shelf into Books array
            - update the state to have newBooks
        */
        const updateShelf = (book, shelf) => {

            const Index = books.find((bookID) => bookID === book.id)
            const newBooks = books
            
            if(Index === undefined) {
                book.shelf = shelf
                newBooks.push(book)
            } else {
                newBooks[Index].shelf = shelf
            }
            
            this.setState({ books: newBooks })

            BooksAPI.update(book, shelf);
            
        }
        
    

        return (
            <div>
                 {/*
                    - those are two routes: one for ALlBooks and the other is for Search.
                    - will send books array, updateShelf function to the two Components
                */}
                <Routes>
                    <Route path="/" element={<AllBooks books={books} updateShelf={updateShelf}/>} />
                    <Route path="/search" element={<Search books={books} updateShelf={updateShelf}/>} />
                </Routes>
            </div>
        )
    }
}

export default Wrapper
