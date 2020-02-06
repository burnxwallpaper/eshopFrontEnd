import React from 'react';
import './ProfilePage.css'

function ProfilePage() {
    return (
        <div className="profilePage">
            <ul>
                <li>Name:{document.cookie ? document.cookie.substring(9) : "error"}</li>
                <li>Purchase History</li>
            </ul>


        </div>
    )
}

export default ProfilePage;