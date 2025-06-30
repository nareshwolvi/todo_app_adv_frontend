import React, { Children } from "react";
import Header from "./Header";
import CopyRightNotice from "./CopyRightNotice";
import NoTask from "./NoTask";

export default function MainLayout({showHeader=true, children }){
    return (
    <div className="layout-container-div">
        {/* Header   */}
        {showHeader && <Header />}
        {/* <NoTask /> */}
        {/* Footer */}
        {children}
        <CopyRightNotice /> 
    </div>
    );
}