import { layouts } from './modules/core/';
import { scenes as clientsDataScenes } from './modules/clients-data/';

console.log("layouts", layouts);
console.log("clientsDataScenes", clientsDataScenes);
// const layouts = {};
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', exact: true, name: 'Home', component: layouts.DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: clientsDataScenes.Dashboard },
];

export default routes;
