import React, { Component } from 'react';
import '../css/login.css';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            introCnt : 0,
            id : '',
            pw : '',
            rePw : '',
            email : '',
            idCheck : 0,
            onSignUp : false
        }
    }

    signIn = () => {
        const user = {
            id : this.state.id,
            pw : this.state.pw
        }
        fetch('/api/signIn', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
    }

    signUp = () => {
        const user = {
            id : this.state.id,
            pw : this.state.pw,
            email : this.state.email
        }
        fetch('/api/signUp', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
    }

    idCheck = () => {
        const user = {
            id : this.state.id
        }
        fetch('/api/idCheck', {
            method: 'POST',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(user)
        })
        .then(data => data.json())
        .then(json => {
            this.setState({ idCheck : json.result })
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleKeyPress = e => {
        if(e.key === 'Enter') {
            this.signIn();
        }
    }

    handleChangeSignUp = e => {
        this.setState({
            onSignUp : this.state.onSignUp ? false : true
        })
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
            <div className='user'>
                {this.state.onSignUp === false ? 
                    <div className={`login ${introClassArr[this.state.introCnt]}`}>
                        <div className='logo'>{appName}</div>
                        <div className='input'>
                            <input type='text' className='login_id' onChange={this.handleChange} name='id' placeholder='아이디'></input>
                            <input type='password' className='login_pw' onChange={this.handleChange} name='pw' placeholder='비밀번호' onKeyPress={this.handleKeyPress}></input>
                        </div>
                        <div className='user_btn' onClick={this.signIn}>로그인</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>손님, 회원 등록 하시겠어요?</div>
                    </div>
                :   <div className='signup'>
                        <div className='input'>
                            <input type='text' placeholder='아이디' onChange={this.handleChange} name='id'></input>
                            <label>{this.state.idCheck === 1 ? '아이디가 존재합니다.' : '사용 가능한 아이디 입니다!'}</label>
                            <input type='password' placeholder='비밀번호' onChange={this.handleChange} onFocus={this.idCheck} name='pw'></input>
                            <input type='password' placeholder='비밀번호 재확인'></input>
                            <input type='text' placeholder='이메일' onChange={this.handleChange} name='email'></input>
                        </div>
                        <div className='user_btn' onClick={this.signUp}>회원가입</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>계정이 이미 있습니다.</div>
                    </div> }  
            </div>
        )
    }
};

export default login;