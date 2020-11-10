import React from 'react';

const appName = 'HEALIN';

const login = props => {
    return (
        <div className='login'>
            <div className='logo'>{appName}</div>
            <div className='input'>
                <input type='text' className='login_id' placeholder='아이디'></input>
                <input type='password' className='login_pw' placeholder='비밀번호'></input>
            </div>
            <div className='login_btn'>로그인</div>
            <div className='login_signup'>손님, 회원 등록 하시겠어요?</div>
        </div>
    )
};

export default login;