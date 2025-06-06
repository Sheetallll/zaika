// import React, { useState, FormEvent, Suspense, useContext } from "react";
// import useSWR from "swr";
// import cogoToast from "cogo-toast";

// import { RecipeCard, SearchBox } from "../../components";
// import { instance } from "../../config";
// import { AUTH_TYPE, IRECIPERESPONSE } from "../../@types";
// import { AuthenticationContext } from "../../context";
// import { NoRecipe } from "./common";
// import { useRecipe } from "../../hooks";
// import { SearchLoader, UILoader } from "../../components/loaders";

// export const MyRecipes = () => {
//   const { loading, searchRecipe } = useRecipe();
//   const { user } = useContext(AuthenticationContext) as AUTH_TYPE;

//   //useswr fetcher
//   const fetcher = (url: string) => instance.get(url).then((res) => res.data);
//   const { data, error } = useSWR(
//     `/recipe/user/${sessionStorage.getItem("id")}`,
//     fetcher,
//     {
//       suspense: true,
//     }
//   );

//   if (error) {
//     console.log(error);
//     cogoToast.error(error?.response?.data?.error);
//     return null;
//   }

//   const [state, setState] = useState<IRECIPERESPONSE[]>(data || {});
//   const [query, setQuery] = useState<string>("");

//   const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!query) return;
//     const result: IRECIPERESPONSE[] = await searchRecipe(query);
//     console.log(result, "RESULT");
//     if (result) {
//       setState(result);
//     }
//   };

//   return (
//     <Suspense fallback={<UILoader />}>
//       <div className="text-white w-full h-full">
//         <SearchBox
//           title="My Recipes"
//           onSearch={handleSearch}
//           setQuery={setQuery}
//           query={query}
//           disabled={!data?.length}
//         />
//         {loading ? (
//           <SearchLoader />
//         ) : (
//           <>
//             {!!state?.length ? (
//               <div className="flex flex-wrap gap-3 flex-col md:flex-row w-ful">
//                 {state.map((recipe: IRECIPERESPONSE, index: number) => (
//                   <RecipeCard
//                     key={index + recipe._id}
//                     {...recipe}
//                     user={user}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <>
//                 <NoRecipe />
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </Suspense>
//   );
// };

import React, { useState, FormEvent, Suspense, useContext, useEffect } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard, SearchBox } from "../../components";
import { instance } from "../../config";
import { AUTH_TYPE, IRECIPERESPONSE } from "../../@types";
import { AuthenticationContext } from "../../context";
import { NoRecipe } from "./common";
import { useRecipe } from "../../hooks";
import { SearchLoader, UILoader } from "../../components/loaders";

export const MyRecipes = () => {
  const { loading, searchRecipe } = useRecipe();
  const { user } = useContext(AuthenticationContext) as AUTH_TYPE;

  //useswr fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `http://localhost:4000/recipe/user/${sessionStorage.getItem("id")}`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  // Initialize state with an empty array instead of an empty object
  const [state, setState] = useState<IRECIPERESPONSE[]>(Array.isArray(data) ? data : []);
  const [query, setQuery] = useState<string>("");

  // Add useEffect to update state when data changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setState(data);
    }
  }, [data]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    const result: IRECIPERESPONSE[] = await searchRecipe(query);
    console.log(result, "RESULT");
    if (Array.isArray(result)) {  // Check if result is an array
      setState(result);
    }
  };

  return (
    <Suspense fallback={<UILoader />}>
      <div className="text-white w-full h-full">
        <SearchBox
          title="My Recipes"
          onSearch={handleSearch}
          setQuery={setQuery}
          query={query}
          disabled={!data?.length}
        />
        {loading ? (
          <SearchLoader />
        ) : (
          <>
            {(state && state.length > 0) ? (
              <div className="flex flex-wrap gap-3 flex-col md:flex-row w-full">
                {state.map((recipe: IRECIPERESPONSE, index: number) => (
                  <RecipeCard
                    key={index + recipe._id}
                    {...recipe}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <>
                <NoRecipe />
              </>
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};