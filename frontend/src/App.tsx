// import { Suspense } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { UILoader } from "./components/loaders/index";
// import { DashboardLayout } from "./layouts/dashboard";
// import { AddRecipe, Home, More, MyRecipes } from "./pages/Dashboard";
// import { ErrorPage } from "./pages/Error";
// import { Landing } from "./pages/Landing";
// import { AuthenticationContext } from "./context/auth-context";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Landing />,
//       errorElement: <ErrorPage />,
//     },

//     {
//       path: "/dashboard",
//       element: <DashboardLayout />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           path: "/dashboard/",
//           element: <Home />,
//         },
//         {
//           path: "/dashboard/addrecipe",
//           element: <AddRecipe />,
//         },
//         {
//           path: "/dashboard/myrecipes",
//           element: <MyRecipes />,
//         },
//         {
//           path: "/dashboard/recipe/:id",
//           element: <More />,
//         },
//       ],
//     },
//   ]);
//   return (
//     <div className="container h-[100vh] w-[100vw]">
//       <Suspense fallback={<UILoader />}>
//         <RouterProvider router={router} fallbackElement={<UILoader />} />
//       </Suspense>
//       <AuthenticationContext.Provider value={{ loading: false, onLogin: async () => {} }}>
//   <Landing />
// </AuthenticationContext.Provider>
//     </div>
//   );
// }

// export default App;
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UILoader } from "./components/loaders/index";
import { DashboardLayout } from "./layouts/dashboard";
import { AddRecipe, Home, More, MyRecipes } from "./pages/Dashboard";
import { ErrorPage } from "./pages/Error";
import { Landing } from "./pages/Landing";
import { AuthenticationContext } from "./context/auth-context";
import { AUTH_TYPE } from "./@types"; // Assuming you have this type definition

function App() {
  // Authentication context value
  const authContextValue: AUTH_TYPE = {
    loading: false,
    onLogin: async (credentials) => {
      // Implement your login logic here
      console.log("Login attempt with:", credentials);
      return true; // Return true if login successful
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard/",
          element: <Home />,
        },
        {
          path: "/dashboard/addrecipe",
          element: <AddRecipe />,
        },
        {
          path: "/dashboard/myrecipes",
          element: <MyRecipes />,
        },
        {
          path: "/dashboard/recipe/:id",
          element: <More />,
        },
      ],
    },
  ]);

  return (
    <div className="container h-screen w-screen">
      <AuthenticationContext.Provider value={authContextValue}>
        <Suspense fallback={<UILoader />}>
          <RouterProvider router={router} fallbackElement={<UILoader />} />
        </Suspense>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;