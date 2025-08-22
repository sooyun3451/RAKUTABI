import React from 'react'

export default function sign_in() {
  return (
    <div>
      <p>로그인</p>
      <div>
        <input type="text" placeholder='아이디' />
        <input type="text" placeholder='비밀번호' />
        <button>로그인</button>
      </div>
    </div>
  )
}
