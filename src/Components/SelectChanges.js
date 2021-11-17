import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectChanges extends Component {

    render() {
        
        // Destructuring onUpdateShelf, shelf, book
        
        const { onUpdateShelf, shelf, book } = this.props;

        // handle any change when selecting any option then invoke onUpdateShelf function
        const handleChange = (event) => {
            onUpdateShelf(book, event.target.value);
            
        }

        return (
            <div className="book-shelf-changer">

                {/* if there is not shelf then will select it as none */}

                <select value={shelf ? shelf : "none"} onChange={handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

// validating book to be object and onUpdateShelf to be function

SelectChanges.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

export default SelectChanges
