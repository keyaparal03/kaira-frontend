import React from "react";

import {
    Link
} from "react-router-dom";

import "./NotFoundPage.scss";

function NotFoundPage() {
    return (
        <div className="not-found-page">

            <div className="not-found-overlay">

            <div className="not-found-content">

                <span>
                Oops...
                </span>

                <h1>
                404
                </h1>

                <h2>
                Page Not Found
                </h2>

                <p>
                Looks like this style has gone missing.
                Explore our beautiful collection and
                discover something elegant.
                </p>

                <Link to="/">

                <button>
                    Back To Home
                </button>

                </Link>

            </div>

            </div>

        </div>
    );
}

export default NotFoundPage;