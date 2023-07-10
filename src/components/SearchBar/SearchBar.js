import css from './searchBar.module.css';
import PropTypes from "prop-types";
import { useState } from 'react';

const SearchBar = (props) => {
    const [inputValue, setInpueValue] = useState('');


    const handleFormInput = (e) => {
        setInpueValue(e.target.value)
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(inputValue)
        resetForm();
    };

    const resetForm = () => {
        setInpueValue('')
    };

        return (
            <header className={css.searchbar}>
                <form className={css.searchform} onSubmit={handleFormSubmit}>
                    <button type="submit" className={css.searchform_button} >
                        <span className="button-label">Search</span>
                    </button>
    
                    <input
                        className={css.searchform_input}
                        value={inputValue}
                        onChange={handleFormInput}
                        type="text"
                        autoComplete="off"
                        name="query"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }


SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchBar;