import React, { Component } from 'react';

class Main extends Component {

    componentDidMount() {
        fetch('/mainModule/checkSession', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    render() {
        return (
        <div>
            <h2>아 생각없네</h2>
        </div>
        )
    }
}

export default Main;