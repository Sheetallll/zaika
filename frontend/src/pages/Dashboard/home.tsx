// import React, { useState, FormEvent, Suspense } from "react";
// import useSWR from "swr";
// import cogoToast from "cogo-toast";

// import { RecipeCard, SearchBox } from "../../components";
// import { NoRecipe } from "./common";
// import { useRecipe } from "../../hooks";
// import { SearchLoader, UILoader } from "../../components/loaders/index";
// import { IRECIPERESPONSE } from "../../@types";
// import { instance } from "../../config";

// export const Home = () => {
//   const { loading, searchRecipe } = useRecipe();
//   //useswr fetcher
//   const fetcher = (url: string) => instance.get(url).then((res) => res.data);
//   const { data, error } = useSWR("/recipe", fetcher, { suspense: true });

//   if (error) {
//     console.log(error);
//     cogoToast.error(error?.response?.data?.error);
//     return null;
//   }
//   const [query, setQuery] = useState<string>("");
//   const [state, setState] = useState<IRECIPERESPONSE[]>(
//     (data as unknown as IRECIPERESPONSE[]) || {}
//   );
//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!query) return;
//     const result: IRECIPERESPONSE[] = await searchRecipe(query);
//     if (result) {
//       setState(result);
//     }
//   };
//   const props = {
//     title: "Recipes",
//     onSearch: onSubmit,
//     query,
//     setQuery,
//   };
//   return (
//     <Suspense fallback={<UILoader />}>
//       <div className="text-white w-full h-full">
//         <SearchBox {...props} />
//         {/* <SearchBox
//           title="Recipe"
//           onSearch={handleSearch}
//           setQuery={setQuery}
//           query={query}
//           disabled={!data?.data}
//         /> */}
//         {loading ? (
//           <SearchLoader />
//         ) : (
//           <>
//             {!!state?.length ? (
//               <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
//                 {state.map((recipe: IRECIPERESPONSE, index: number) => (
//                   <RecipeCard
//                     key={index + recipe._id}
//                     {...recipe}
//                     user={recipe?.user?.email as string}
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
import React, { useState, FormEvent, Suspense } from "react";
import useSWR from "swr";
import cogoToast from "cogo-toast";

import { RecipeCard, SearchBox } from "../../components";
import { NoRecipe } from "./common";
import { useRecipe } from "../../hooks";
import { SearchLoader, UILoader } from "../../components/loaders/index";
import { IRECIPERESPONSE } from "../../@types";
import { instance } from "../../config";

export const Home = () => {
  const { loading, searchRecipe } = useRecipe();
  // useSWR fetcher
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("http://localhost:4000/recipe", fetcher, { suspense: true });

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  const [query, setQuery] = useState<string>("");
  // Initialize state with an empty array if data isn't available or isn't an array
  const [state, setState] = useState<IRECIPERESPONSE[]>(
    Array.isArray(data) ? data : []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    const result: IRECIPERESPONSE[] = await searchRecipe(query);
    if (result) {
      setState(result);
    }
  };

  // Effect to update state when data loads
  React.useEffect(() => {
    if (Array.isArray(data)) {
      setState(data);
    }
  }, [data]);

  const props = {
    title: "Recipes",
    onSearch: onSubmit,
    query,
    setQuery,
  };

  return (
    <Suspense fallback={<UILoader />}>
      <div className="text-white w-full h-full">
        <SearchBox {...props} />
        {loading ? (
          <SearchLoader />
        ) : (
          <>
            {state && state.length > 0 ? (
              <div className="flex flex-wrap gap-3 flex-col items-center justify-center md:justify-start md:items-start md:flex-row w-full">
                {state.map((recipe: IRECIPERESPONSE, index: number) => (
                  <RecipeCard
                    key={index + recipe._id}
                    {...recipe}
                    user={recipe?.user?.email as string}
                  />
                ))}
              </div>
            ) : (
              <NoRecipe />
            )}
          </>
        )}
      </div>
    </Suspense>
  );
};