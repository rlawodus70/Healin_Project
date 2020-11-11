import React, { Component } from 'react';
import '../css/login.css';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            introFlag : false,
            intro2Flag : false,
            intro3Flag : false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                introFlag: true
            })
        }, 1000)
        setTimeout(() => {
            this.setState({
                intro2Flag: true
            })
        }, 2000)
        setTimeout(() => {
            this.setState({
                intro3Flag: true
            })
        }, 3000)
    }

    render() {
        const appName = 'HEALIN';
        return (
            <div className={
                "login " + (this.state.introFlag ? "" : "intro ") + 
                (this.state.intro2Flag ? "" : "intro2 ") + 
                (this.state.intro3Flag ? "" : "intro3")}>
                <div className='logo'>{appName}</div>
                <div className='input'>
                    <input type='text' className='login_id' placeholder='아이디'></input>
                    <input type='password' className='login_pw' placeholder='비밀번호'></input>
                </div>
                <div className='login_btn'>로그인</div>
                <div className='login_signup'>손님, 회원 등록 하시겠어요?</div>
            </div>
        )
    }
};

export default login;