import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'


const LoginComponent = lazy(() => import('./components/loginpage/Login'))
const DashBoard = lazy(() => import("./components/Dashboard/DashBoard"))
const Topbarcomponent = lazy(() => import('./components/navbar/TopBarComponent'))
const SideBarComponent = lazy(() => import('./components/navbar/SideBar'))

const ManageUserComponent = lazy(() => import('./components/manageUser/ManageUser'))
const UpdateUserComponent = lazy(() => import('./components/manageUser/UpdateUser'))
const ViewBusinessDetails = lazy(() => import('./components/userBusinessDetails/ViewBusinessDetails'))
const ViewSubscription = lazy(() => import('./components/useSubscriptionDetails/ViewSubscription'))
const EditSubscriptionComponent = lazy(() => import('./components/useSubscriptionDetails/EditSubscription'))
const ViewVehicleDetails = lazy(() => import('./components/userVehicleDetails/ViewVehicleDetails'))
const ViewVehicleDocDetailsComponent = lazy(() => import('./components/vehicleDocDetails/ViewVehicleDocDetails'))
const EditVehicleDocDetailsComponent = lazy(() => import('./components/vehicleDocDetails/EditVehicleDocDetails'))
const ViewUserDocDetails = lazy(() => import('./components/userDocDetails/ViewUserDocDetails'))
const EditUserDocDetailsComponent = lazy(() => import('./components/userDocDetails/EditUserDocDetails'))

const ManageVehicleComponent = lazy(() => import('./components/manageVehicle/Managevehicle'))
const AddVehicleComponent = lazy(() => import('./components/manageVehicle/AddVehicle'))
const UpdateVehicleComponent = lazy(() => import('./components/manageVehicle/UpdateVehicle'))

const ManageVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/ManageVehicleType'))
const UpdateVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/UpdateVehicleType'))
const AddVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/AddVehicleType'))

// const AddBookingComponent = lazy(() => import('./components/manageBooking/AddBooking'))
const ManageBookingComponent = lazy(() => import('./components/manageBooking/ManageBooking'))
const ManagePakageComponent = lazy(() => import('./components/manageBooking/ManagePakages'))
const UpdatePakagesComponent = lazy(() => import("./components/manageBooking/UpdatePakages"))
const AddPakagesComponent = lazy(() => import("./components/manageBooking/AddPakages"))

const ManageSubscriptionComponent = lazy(() => import("./components/manageSubscription/ManageSubscription"))
const AddSubscriptionComponent = lazy(() => import("./components/manageSubscription/AddSubscription"))
const UpdateSubscriptionComponent = lazy(() => import("./components/manageSubscription/UpdateSubscription"))

const ManageReportsComponent = lazy(() => import("./components/manageReports/Reports"))

function App() {
  const location = useLocation()
  const isLogin = location.pathname === '/'
  return (
    <>
      <div className='app' >
        {!isLogin && <SideBarComponent />}
        <main className='content'>
          {!isLogin && <Topbarcomponent />}
          <Routes>
            <Route path='/'>
              <Route index element={<Suspense fallback={<h1>Loading...</h1>}><LoginComponent /></Suspense>} />
            </Route>
            <Route path='/ShareTrip/'>
              <Route index element={<Suspense fallback={<h1>Loading...</h1>}><DashBoard /></Suspense>} />
              <Route path='Dashboard' element={<Suspense fallback={<h1>Loading...</h1>}><DashBoard /></Suspense>} />

              <Route path='ManageBooking' element={<Suspense fallback={<h1>Loading...</h1>}><ManageBookingComponent /></Suspense>} />
              <Route path='UpdateBookingType/:bid' element={<Suspense fallback={<h1>Loading...</h1>}><ManagePakageComponent /></Suspense>} />
              <Route path='UpdatePakages/:pid' element={<Suspense fallback={<h1>Loading...</h1>}><UpdatePakagesComponent /></Suspense>} />
              <Route path='AddPakages' element={<Suspense fallback={<h1>Loading...</h1>}><AddPakagesComponent /></Suspense>} />

              <Route path='ManageUser' element={<Suspense fallback={<h1>Loading...</h1>}><ManageUserComponent /></Suspense>} />
              <Route path='UpdateUser/:uid' element={<Suspense fallback={<h1>Loading...</h1>}><UpdateUserComponent /></Suspense>} />
              <Route path='ViewBusinessDetails/:bid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewBusinessDetails /></Suspense>} />
              <Route path='ViewSubscription/:sid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewSubscription /></Suspense>} />
              <Route path='EditSubscription/:suid' element={<Suspense fallback={<h1>Loading...</h1>}><EditSubscriptionComponent /></Suspense>} />
              <Route path='ViewVehicleDetails/:uid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewVehicleDetails /></Suspense>} />
              <Route path='ViewVehicleDocDetails/:vdid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewVehicleDocDetailsComponent /></Suspense>} />
              <Route path='EditVehicleDocDetails/:evdid' element={<Suspense fallback={<h1>Loading...</h1>}><EditVehicleDocDetailsComponent /></Suspense>} />
              <Route path='EditUserDocDetails/:eudid' element={<Suspense fallback={<h1>Loading...</h1>}><EditUserDocDetailsComponent /></Suspense>} />
              <Route path='ViewUserDocDetails/:udid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewUserDocDetails /></Suspense>} />

              <Route path='ManageVehicle' element={<Suspense fallback={<h1>loading....</h1>}><ManageVehicleComponent /></Suspense>} />
              <Route path='AddVehicle' element={<Suspense fallback={<h1>loading....</h1>}><AddVehicleComponent /></Suspense>} />
              <Route path='UpdateVehicle/:vid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateVehicleComponent /></Suspense>} />

              <Route path='ManageVehicleType' element={<Suspense fallback={<h1>loading....</h1>}><ManageVehicleTypeComponent /></Suspense>} />
              <Route path='UpdateVehicleType/:vtid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateVehicleTypeComponent /></Suspense>} />
              <Route path='AddVehicleType' element={<Suspense fallback={<h1>loading....</h1>}><AddVehicleTypeComponent /></Suspense>} />

              <Route path='ManageSubscription' element={<Suspense fallback={<h1>loading....</h1>}><ManageSubscriptionComponent /></Suspense>} />
              <Route path='AddSubscription' element={<Suspense fallback={<h1>loading....</h1>}><AddSubscriptionComponent /></Suspense>} />
              <Route path='UpdateSubscription/:sid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateSubscriptionComponent /></Suspense>} />

              <Route path='ManageReports' element={<Suspense fallback={<h1>loading....</h1>}><ManageReportsComponent /></Suspense>} />
            </Route>
          </Routes>
        </main>
      </div>

    </>
  );
}
export default App;



// import { lazy, Suspense, startTransition } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import './App.css'

// const LoginComponent = lazy(() => import('./components/loginpage/Login'))
// const DashBoard = lazy(() => import("./components/Dashboard/DashBoard"))
// const Topbarcomponent = lazy(() => import('./components/navbar/TopBarComponent'))
// const SideBarComponent = lazy(() => import('./components/navbar/SideBar'))
// const ManageUserComponent = lazy(() => import('./components/manageUser/ManageUser'))
// const UpdateUserComponent = lazy(() => import('./components/manageUser/UpdateUser'))
// const ViewBusinessDetails = lazy(() => import('./components/userBusinessDetails/ViewBusinessDetails'))
// const ViewSubscription = lazy(() => import('./components/useSubscriptionDetails/ViewSubscription'))
// const EditSubscriptionComponent = lazy(() => import('./components/useSubscriptionDetails/EditSubscription'))
// const ViewVehicleDetails = lazy(() => import('./components/userVehicleDetails/ViewVehicleDetails'))
// const ViewVehicleDocDetailsComponent = lazy(() => import('./components/vehicleDocDetails/ViewVehicleDocDetails'))
// const EditVehicleDocDetailsComponent = lazy(() => import('./components/vehicleDocDetails/EditVehicleDocDetails'))
// const ViewUserDocDetails = lazy(() => import('./components/userDocDetails/ViewUserDocDetails'))
// const EditUserDocDetailsComponent = lazy(() => import('./components/userDocDetails/EditUserDocDetails'))

// const ManageVehicleComponent = lazy(() => import('./components/manageVehicle/Managevehicle'))
// const AddVehicleComponent = lazy(() => import('./components/manageVehicle/AddVehicle'))
// const UpdateVehicleComponent = lazy(() => import('./components/manageVehicle/UpdateVehicle'))

// const ManageVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/ManageVehicleType'))
// const UpdateVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/UpdateVehicleType'))
// const AddVehicleTypeComponent = lazy(() => import('./components/manageVehicleType/AddVehicleType'))

// // const AddBookingComponent = lazy(() => import('./components/manageBooking/AddBooking'))
// const ManageBookingComponent = lazy(() => import('./components/manageBooking/ManageBooking'))
// const ManagePakageComponent = lazy(() => import('./components/manageBooking/ManagePakages'))
// const UpdatePakagesComponent = lazy(() => import("./components/manageBooking/UpdatePakages"))
// const AddPakagesComponent = lazy(() => import("./components/manageBooking/AddPakages"))

// const ManageSubscriptionComponent = lazy(() => import("./components/manageSubscription/ManageSubscription"))
// const AddSubscriptionComponent = lazy(() => import("./components/manageSubscription/AddSubscription"))
// const UpdateSubscriptionComponent = lazy(() => import("./components/manageSubscription/UpdateSubscription"))

// const ManageReportsComponent = lazy(() => import("./components/manageReports/Reports"))
// // Other imports...

// function App() {
//   const location = useLocation();
//   const isLogin = location.pathname === '/';

//   // Use startTransition to ensure smooth transitions
//   const renderRoutes = () => {
//     startTransition(() => {
//       return (
//         <Routes>
//           <Route path='/'>
//             <Route index element={<Suspense fallback={<h1>Loading...</h1>}><LoginComponent /></Suspense>} />
//           </Route>
//           <Route path='/ShareTrip/'>
//             <Route index element={<Suspense fallback={<h1>Loading...</h1>}><DashBoard /></Suspense>} />
//             <Route path='ManageBooking' element={<Suspense fallback={<h1>Loading...</h1>}><ManageBookingComponent /></Suspense>} />
//             <Route path='UpdateBookingType/:bid' element={<Suspense fallback={<h1>Loading...</h1>}><ManagePakageComponent /></Suspense>} />
//             <Route path='UpdatePakages/:pid' element={<Suspense fallback={<h1>Loading...</h1>}><UpdatePakagesComponent /></Suspense>} />
//             <Route path='AddPakages' element={<Suspense fallback={<h1>Loading...</h1>}><AddPakagesComponent /></Suspense>} />

//             <Route path='ManageUser' element={<Suspense fallback={<h1>Loading...</h1>}><ManageUserComponent /></Suspense>} />
//             <Route path='UpdateUser/:uid' element={<Suspense fallback={<h1>Loading...</h1>}><UpdateUserComponent /></Suspense>} />
//             <Route path='ViewBusinessDetails/:bid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewBusinessDetails /></Suspense>} />
//             <Route path='ViewSubscription/:sid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewSubscription /></Suspense>} />
//             <Route path='EditSubscription/:suid' element={<Suspense fallback={<h1>Loading...</h1>}><EditSubscriptionComponent /></Suspense>} />
//             <Route path='ViewVehicleDetails/:uid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewVehicleDetails /></Suspense>} />
//             <Route path='ViewVehicleDocDetails/:vdid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewVehicleDocDetailsComponent /></Suspense>} />
//             <Route path='EditVehicleDocDetails/:evdid' element={<Suspense fallback={<h1>Loading...</h1>}><EditVehicleDocDetailsComponent /></Suspense>} />
//             <Route path='EditUserDocDetails/:eudid' element={<Suspense fallback={<h1>Loading...</h1>}><EditUserDocDetailsComponent /></Suspense>} />
//             <Route path='ViewUserDocDetails/:udid' element={<Suspense fallback={<h1>Loading...</h1>}><ViewUserDocDetails /></Suspense>} />

//             <Route path='ManageVehicle' element={<Suspense fallback={<h1>loading....</h1>}><ManageVehicleComponent /></Suspense>} />
//             <Route path='AddVehicle' element={<Suspense fallback={<h1>loading....</h1>}><AddVehicleComponent /></Suspense>} />
//             <Route path='UpdateVehicle/:vid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateVehicleComponent /></Suspense>} />

//             <Route path='ManageVehicleType' element={<Suspense fallback={<h1>loading....</h1>}><ManageVehicleTypeComponent /></Suspense>} />
//             <Route path='UpdateVehicleType/:vtid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateVehicleTypeComponent /></Suspense>} />
//             <Route path='AddVehicleType' element={<Suspense fallback={<h1>loading....</h1>}><AddVehicleTypeComponent /></Suspense>} />

//             <Route path='ManageSubscription' element={<Suspense fallback={<h1>loading....</h1>}><ManageSubscriptionComponent /></Suspense>} />
//             <Route path='AddSubscription' element={<Suspense fallback={<h1>loading....</h1>}><AddSubscriptionComponent /></Suspense>} />
//             <Route path='UpdateSubscription/:sid' element={<Suspense fallback={<h1>loading....</h1>}><UpdateSubscriptionComponent /></Suspense>} />

//             <Route path='ManageReports' element={<Suspense fallback={<h1>loading....</h1>}><ManageReportsComponent /></Suspense>} />
//             {/* Other routes */}
//           </Route>
//         </Routes>
//       );
//     });
//   };

//   return (
//     <>
//       <div className='app'>
//         {!isLogin && <SideBarComponent />}
//         <main className='content'>
//           {!isLogin && <Topbarcomponent />}
//           {renderRoutes()}
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;






// import { lazy, Suspense } from 'react';
// import './App.css';
// import { Route, Routes, useLocation } from 'react-router-dom';
// //login component
// const LoginComponet = lazy(() => import("./components/login/Login"))
// //sidebar component
// const SideBarComponent = lazy(() => import("./components/navbar/SideBarComponent"))
// //topbar component
// const TopBarComponent = lazy(() => import("./components/navbar/TopBarComponent"))
// //dashboard component
// const DashBoardComponent = lazy(() => import("./components/dashboard/DashBoard"))
// //user component
// const ManageUserComponent = lazy(() => import("./components/manageUser/ManageUser"))
// const UpdateUserComponent = lazy(() => import("./components/manageUser/UpdateUser"))
// //vehicle-Type component
// const ManageVehicleTypeComponent = lazy(() => import("./components/manageVehicleType/ManageVehicleType"))
// const AddVehicleTypeComponent = lazy(() => import("./components/manageVehicleType/AddNewVehicleType"))
// const UpdateVehicleTypeComponent = lazy(() => import("./components/manageVehicleType/UpdateVehicleType"))
// //vehicle component
// const ManageVehicleComponent = lazy(() => import("./components/manageVehicle/ManageVehicle"))
// const AddVehicleComponent = lazy(() => import("./components/manageVehicle/AddVehicle"))
// const UpdateVehicleComponent = lazy(() => import("./components/manageVehicle/UpdateVehicle"))
// //booking component
// const ManageBookingComponent = lazy(() => import("./components/manageBooking/ManageBooking"))
// const AddBookingComponent = lazy(() => import("./components/manageBooking/AddBooking"))
// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/";
//   return (
//     <>
//       <div className="app">
//         {!isLoginPage && (
//           <Suspense fallback={<div>Loading...</div>}>
//             <SideBarComponent />
//           </Suspense>
//         )}
//         <main className="content">
//           {!isLoginPage && (
//             <Suspense fallback={<div>Loading...</div>}>
//               <TopBarComponent />
//             </Suspense>
//           )}

//           <Routes>
//             <Route path='/'>
//               <Route index element={<Suspense fallback={<div>Loading..</div>}><LoginComponet /></Suspense>} />
//             </Route>
//             <Route path="/shareTrip">
//               <Route index element={<Suspense fallback={<div>Loading..</div>}><DashBoardComponent /></Suspense>} />
//               <Route path="DashBoard" element={<Suspense fallback={<div>Loading..</div>}><DashBoardComponent /></Suspense>} />

//               <Route path="ManageUser" element={<Suspense fallback={<div>Loading..</div>}><ManageUserComponent /></Suspense>} />
//               <Route path="UpdateUser/:uid" element={<Suspense fallback={<div>Loading..</div>}><UpdateUserComponent /></Suspense>} />

//               <Route path='ManageVehicle' element={<Suspense fallback={<div>Loading..</div>}><ManageVehicleComponent /></Suspense>} />
//               <Route path='AddNewVehicle' element={<Suspense fallback={<div>Loading..</div>}><AddVehicleComponent /></Suspense>} />
//               <Route path='UpdateVehicle/:vid' element={<Suspense fallback={<div>Loading..</div>}><UpdateVehicleComponent /></Suspense>} />

//               <Route path='ManageVehicleType' element={<Suspense fallback={<div>Loading..</div>}><ManageVehicleTypeComponent /></Suspense>} />
//               <Route path='AddNewVehicleType' element={<Suspense fallback={<div>Loading..</div>}><AddVehicleTypeComponent /></Suspense>} />
//               <Route path='UpdateVehicleType/:vtid' element={<Suspense fallback={<div>Loading..</div>}><UpdateVehicleTypeComponent /></Suspense>} />

//               <Route path='ManageBooking' element={<Suspense fallback={<div>Loading..</div>}><ManageBookingComponent /></Suspense>} />
//               <Route path='AddBooking' element={<Suspense fallback={<div>Loading..</div>}><AddBookingComponent /></Suspense>} />

//             </Route>
//             <Route path="*" element={<div>Page Not Found..</div>} />
//           </Routes>
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;
