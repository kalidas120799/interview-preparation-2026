import React from 'react'

const Header = () => {
    return (
        <div>{
            ['Home', 'Users', 'Settings'].map((item) => (
                <span key={item} style={{ marginRight: '10px' }}>{item}</span>
            ))
        }</div>
    )
}

export default Header