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
            idLabel : '',
            pwLabel : '',
            rePwLabel : '',
            emailLabel : '',
            idCheck : false,
            pwCheck : false,
            rePwCheck : false,
            emailCheck : false,
            onSignUp : false
        }
    }

    signIn = () => {    //로그인
        const user = {
            id : this.state.id,
            pw : this.state.pw
        }
        if(user.id === '' || user.pw === '') {
            alert("아이디 혹은 비밀번호를 확인해주세요!")
        } else {
            fetch('/user/signIn', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                console.log(json)
                if(json.result === "success") {
                    window.location.replace("/main");
                } else {
                    alert("아이디 혹은 비밀번호를 확인해주세요!")
                }
            })
        }
    }

    signUp = () => {    //회원가입
        const user = {
            id : this.state.id,
            pw : this.state.pw,
            rePw : this.state.rePw,
            email : this.state.email,
            idCheck : this.state.idCheck,
            pwCheck : this.state.pwCheck,
            rePwCheck : this.state.rePwCheck,
            emailCheck : this.state.emailCheck
        }
        if(user.id === '' || user.pw === '' || user.rePw === '' || user.email === '') {
            alert("정보를 전부 입력해주세요!");
        } else if(!user.idCheck || !user.pwCheck || !user.rePwCheck || !user.emailCheck) {
            alert("잘못된 정보가 없는지 다시 한번 확인해보세요!");
        } else {
            fetch('/user/signUp', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
        }
    }

    idCheck = () => {   //아이디 중복검사
        const user = {
            id : this.state.id
        }
        if (!/^[a-z0-9]{7,20}$/.test(user.id)) {
            this.setState({ 
                idLabel : '소문자, 숫자 7~20자리로 입력해주세요!',
                idCheck : false
            })
        } else {
            fetch('/user/idCheck', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                if(json.length === 1) {
                    this.setState({ 
                        idLabel : '아이디가 존재합니다.',
                        idCheck : false
                    })
                } else {
                    this.setState({ 
                        idLabel : '사용 가능한 아이디입니다.',
                        idCheck : true
                    })
                }
            })
        }
    }

    pwCheck = () => {   //비밀번호 정규식 검사
        const user = {
            pw : this.state.pw
        }
        if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(user.pw)) {
            this.setState({ 
                pwLabel : '소문자, 숫자 8~20자리로 입력해주세요!',
                pwCheck : false
            })
        } else {
            this.setState({ 
                pwLabel : '사용 가능한 비밀번호입니다.',
                pwCheck : true
            });
        }
    }

    pwSameCheck = () => {   //비밀번호 같은지 검사
        const user = {
            pw : this.state.pw,
            rePw : this.state.rePw
        }

        if(user.rePw === '') {
            this.setState({ 
                rePwLabel : '필수사항 입니다. 입력해주세요.',
                rePwCheck : false
            })
        } else if(user.pw === user.rePw) {
            this.setState({ 
                rePwLabel : '비밀번호가 같습니다!',
                rePwCheck : true
            })
        } else {
            this.setState({ 
                rePwLabel : '비밀번호가 같지 않습니다!',
                rePwCheck : false
            })
        }
    }

    emailCheck = () => {    //이메일 정규식 검사
        const user = {
            email : this.state.email
        }
        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(user.email)) {
            this.setState({ 
                emailLabel : '이메일 형식을 지켜주세요!',
                emailCheck : false
            })
        } else {
            fetch('/user/emailCheck', {
                method: 'POST',
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => {
                if(json.length === 1) {
                    this.setState({ 
                        emailLabel : '이메일이 존재합니다.',
                        emailCheck : false
                    })
                } else {
                    this.setState({ 
                        emailLabel : '사용 가능한 이메일입니다!',
                        emailCheck : true
                    })
                }
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
            idLabel : '',
            pwLabel : '',
            rePwLabel : '',
            emailLabel : '',
            idCheck : false,
            pwCheck : false,
            rePwCheck : false,
            emailCheck : false,
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
                            <label className={`input_label ${this.state.idCheck ? 'green' : 'red'}`}>{this.state.idLabel}</label>
                            <input type='password' placeholder='비밀번호' onChange={this.handleChange} onBlur={this.pwCheck} name='pw'></input>
                            <label className={`input_label ${this.state.pwCheck ? 'green' : 'red'}`}>{this.state.pwLabel}</label>
                            <input type='password' placeholder='비밀번호 재확인' onChange={this.handleChange} name='rePw' onBlur={this.pwSameCheck}></input>
                            <label className={`input_label ${this.state.rePwCheck ? 'green' : 'red'}`}>{this.state.rePwLabel}</label>
                            <input type='text' placeholder='이메일' onChange={this.handleChange} onBlur={this.emailCheck} name='email'></input>
                            <label className={`input_label ${this.state.emailCheck ? 'green' : 'red'}`}>{this.state.emailLabel}</label>
                        </div>
                        <div className='user_btn' onClick={this.signUp}>회원가입</div>
                        <div className='user_signup' onClick={this.handleChangeSignUp}>계정이 이미 있습니다.</div>
                    </div> }  
            </div>
        )
    }
};

export default login;