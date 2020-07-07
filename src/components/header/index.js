import React from 'react';
import Login from "../auth/login";

import '../../index.scss';
import bbBrownMobile from '../../assets/bb-brown-mobile.png';

export default function Header() {
    //const theme = useTheme();

    return (
        <header>
            <div className="image-wrapper">
            <img alt="Barista Buddy Logo in soft caramel" src={bbBrownMobile} />
            </div>
            <div className="users">
                {/* <Login /> */}
            </div>
        </header>
    )
}