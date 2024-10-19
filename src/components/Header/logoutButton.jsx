import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth'
import { logout } from '../../store/authSlice'


function LogoutButton() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logOut()
        .then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200 bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutButton
