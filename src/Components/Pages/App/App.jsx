import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
 
function App() {

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default App;
