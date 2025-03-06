// import { Footer } from '@/widgets';
// import { Header } from '@/widgets';
import { Outlet, useLocation } from 'react-router';
// import { refreshTokensThunk } from "@/entities/user/api";
import React from "react";
// import { useAppDispatch } from "@/shared/hooks/reduxHooks";


export default function Layout(): React.JSX.Element {
  const location = useLocation();
  console.log(location);
  
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(refreshTokensThunk());
//   }, [dispatch]);

  

//   useEffect(() => {
//     dispatch(clearPoints());
//   }, [location.pathname]);
  
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
