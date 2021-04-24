/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import UserCharge from "views/UserCharge.js";
import TableList from "views/TableList.js";
import TableList2 from "views/TableList2.js";
import Typography from "views/Typography.js";
import PagarRuta from "views/PagarRuta.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import SignUp from "views/SignUp.js";
import Login from "views/Login.js";
import AgregarChofer from "views/AgregarChofer.js";
import AgregarRuta from "views/AgregarRuta.js";
import AdminConsole from "views/AdminConsole.js";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Inicio",
    icon: "nc-icon nc-tablet-2",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Reportes Chofer",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
 {
    path: "/reportescliente",
    name: "Reportes Cliente",
    icon: "nc-icon nc-notes",
    component: TableList2,
    layout: "/admin",
  },
  {
    path: "/adminConsole",
    name: "Administración",
    icon: "nc-icon nc-tablet-2",
    component: AdminConsole,
    layout: "/admin",
  },
];

export default dashboardRoutes;
