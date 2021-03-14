import React, {Component, Fragment} from 'react';
import loading from "./loading.gif";

class Loading extends Component {
    render() {
        return (
            <Fragment>
                <img src={`/${loading}` } alt="Loading..." style={{width: "200px", display: "block", margin: "auto"}}/>
            </Fragment>
        );
    }
}

export default Loading;