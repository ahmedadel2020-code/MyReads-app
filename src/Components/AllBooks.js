import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import SearchButton from './SearchButton';
import TitleOfApp from './TitleOfApp';

class AllBooks extends Component {
 
    render() {
        
        // Destructuring books, updateShelf from Wrapper component
        const { books, updateShelf } = this.props
        
        return (
            <div>
                {/*
                    - render the title of the page
                    - sending books and updateShelf to each shelf then rendering each shelf
                    - render SearchButton
                */}
                <TitleOfApp />
                <CurrentlyReading books={books} updateShelf={updateShelf}/>
                <WantToRead books={books} updateShelf={updateShelf}/>
                <Read books={books} updateShelf={updateShelf}/>
                <SearchButton />
            </div>
        )
    }
}


// validate that books is array and updateShelf is function

AllBooks.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default AllBooks
