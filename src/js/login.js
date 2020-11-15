import React, { Component } from 'react';
import '../css/login.css';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            introCnt : 0,
            id : '',
            pw : ''
        }
    }

    signIn = () => {
        const user = {
            id : this.state.id,
            pw : this.state.pw
        }
        //fetch('/api/signIn')
        fetch('/api/signIn', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
    }

    handleChange = e => {
        if(e.target.className === 'login_id') {
            this.setState({ id: e.target.value });
        } else if(e.target.className === 'login_pw') {
            this.setState({ pw: e.target.value });
        }
    }

    addIntroCnt = () => {
        this.setState({
            introCnt: this.state.introCnt+1
        });
    }

    componentDidMount() {
        for(let i = 1; i < 4; i++) {
            setTimeout(this.addIntroCnt, i*1000)
        }
    }

    render() {
        const appName = 'HEALIN';
        const introClassArr = ["intro3 intro2 intro", "intro3 intro2", "intro3", ""];
        return (
            <div className={
                "login " + (introClassArr[this.state.introCnt])}>
                <div className='logo'>{appName}</div>
                <div className='input'>
                    <input type='text' className='login_id' onChange={this.handleChange} placeholder='아이디'></input>
                    <input type='password' className='login_pw' onChange={this.handleChange} placeholder='비밀번호'></input>
                </div>
                <div className='login_btn' onClick={this.signIn}>로그인</div>
                <div className='login_signup'>손님, 회원 등록 하시겠어요?</div>
            </div>
        )
    }
};

export default login;