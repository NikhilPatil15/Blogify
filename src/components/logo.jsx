import React from 'react'

function Logo({width ='100px',height='200px'}) {
    return (
        <div className={`w-[${width}] h-[${height}]`}>Blogify</div>
    )
}

export default Logo
