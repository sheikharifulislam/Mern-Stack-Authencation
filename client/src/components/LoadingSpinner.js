import React from "react";
import LoadingGif from "../assets/loading.gif";

export default function LoadingSpinner() {
    return (
        <div>
            <img
                src={LoadingGif}
                style={{ width: "100%" }}
                alt="Loading Spinner"
            />
        </div>
    );
}
