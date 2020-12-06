import React, { Component } from 'react';
import '../css/main.css';

class Main extends Component {

    componentDidMount() {
        fetch('/home/check', {
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
                <div className='profile'>
                    <div className='profile-image'></div>
                    <div className='profile-welcome'>
                        <div>안녕하세요</div>
                        <div className='profile-nickname'>짱구님</div>
                    </div>
                    <div className='profile-push'></div>
                </div>
                <div>추천</div>
                <div>부우ㅣ</div>
                <div>ㅔㅁ뉴</div>
            </div>
        )
    }
}

export default Main;