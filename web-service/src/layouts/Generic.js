
import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";


import Sidebar from "components/Sidebar/Sidebar";



import routes from "routes.js";

import sidebarImage from "assets/img/bus1.jpg";

function Generic() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/generic") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>

      <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        
        
    </>
  );
}

export default Generic;