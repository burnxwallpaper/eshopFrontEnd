import React from 'react';
import './CompletedPage.css';
import { Link } from 'react-router-dom';

function CompletedPage() {
    return (
        <div className="CompletedPage">
            <div className="alert alert-success" role="alert">
                <h4 class="alert-heading">Your transaction is completed!</h4>
                <hr>
                </hr>
                <div style={{ margin: "10px 10px" }} className="btn btn-success"><Link to="/profile">Record</Link></div>
                <div style={{ margin: "10px 10px" }} className="btn btn-success"><Link to="/">Shopping</Link></div>
            </div>
        </div>)

}

export default CompletedPage;