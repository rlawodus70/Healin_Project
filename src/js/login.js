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
            pwCheck : 0,
            pwSameCheck : 0,
            emailCheck : 0,
            onSignUp : false
        }
    }

    signIn = () => {    //로그인
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

    signUp = () => {    //회원가입
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

    idCheck = () => {   //아이디 중복검사
        const user = {
            id : this.state.id
        }
        if (!/^[a-z0-9]{7,20}$/.test(user.id)) {
            this.setState({ idCheck : 2 })
        } else {
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
                this.setState({ idCheck : json.length })
            })
        }
    }

    pwCheck = () => {   //비밀번호 정규식 검사
        const user = {
            pw : this.state.pw
        }

        if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(user.pw)) {
            this.setState({ pwCheck : false })
        } else {
            this.setState({ pwCheck : true });
        }
    }

    pwSameCheck = () => {   //비밀번호 같은지 검사
        const user = {
            pw : this.state.pw,
            rePw : this.state.rePw
        }
        
        if(user.pw === user.rePw) {
            this.setState({ pwSameCheck : true })
        } else {
            this.setState({ pwSameCheck : false })
        }
    }

    emailCheck = () => {    //이메일 정규식 검사
        const user = {
            email : this.state.email
        }
        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(user.email)) {
            this.setState({ emailCheck : 2 })
        } else {
            fetch('/api/emailCheck', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                this.setState({ emailCheck : json.length })
            })
        }
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
        for(let i = 1; i < 5; i++) {
            setTimeout(this.addIntroCnt, i*1000)
        }
    }

    render() {
        const appName = 'HEALIN';
        const introClassArr = ["intro4 intro3 intro2 intro", "intro4 intro3 intro2", "intro4 intro3", "intro4", ""];
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
                            <input type='text' placeholder='아이디' onChange={this.handleChange} name='id' onBlur={this.idCheck}></input>
                            {this.state.idCheck === 0 ? '' : <label>{this.state.idCheck === 1 ? '아이디가 존재합니다.' : '소문자, 숫자 7~20자리로 입력해주세요!'}</label>}
                            <input type='password' placeholder='비밀번호' onChange={this.handleChange} onBlur={this.pwCheck} name='pw'></input>
                            {this.state.pwCheck === 0 ? '' : <label>{!this.state.pwCheck ? '소문자, 숫자 8~20자리로 입력해주세요!' : ""}</label>}
                            <input type='password' placeholder='비밀번호 재확인' onChange={this.handleChange} name='rePw' onBlur={this.pwSameCheck}></input>
                            {this.state.pwSameCheck === 0 ? '' : <label>{!this.state.pwSameCheck ? '비밀번호가 같지 않습니다!' : ''}</label> }
                            <input type='text' placeholder='이메일' onChange={this.handleChange} onBlur={this.emailCheck} name='email'></input>
                            {this.state.emailCheck === 0 ? '' : <label>{this.state.emailCheck === 1 ? '이메일이 존재합니다.' : '이메일 형식을 지켜주세요!'}</label>}
                        </div>
                        <div className='user_btn' onClick={this.signUp}>회원가입</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>계정이 이미 있습니다.</div>
                    </div> }  
            </div>
        )
    }
};

export default login;