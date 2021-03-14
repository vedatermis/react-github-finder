import React, { useState } from 'react';

const Search = ({ setAlert, searchUsers, clearUsers, showClearButton }) => {

    const [keyword, setKeyword] = useState("");

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (keyword === "") {
            setAlert("Lütfen bir anahtar kelime giriniz.", "danger");
        } else {
            searchUsers(keyword);

            setKeyword("");
        }
    }


    return (
        <div className="container my-3">

            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input type="text" value={keyword} onChange={onChange}
                           className="form-control"/>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
            {
                showClearButton &&
                <button className="btn btn-secondary btn-sm btn-block mt-2" onClick={clearUsers}>Clear
                    Results</button>
            }

        </div>
    );

}

export default Search;