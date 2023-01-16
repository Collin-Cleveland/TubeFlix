import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';
import Login from "app/modules/login/login";


function searchBox(): React.FC = () {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then(response => response.json())
      .then(data => setVideos(data));
  }, []);

  return (
    <div>
      {videos.map(video => (
        <video key={video.id} />
      ))}
    </div>
  );
}

export default searchBox;

// function searchBox(){
//   const [recipesFound, setRecipesFound] = useState([]);
//   const [recipeSearch, setRecipesSearch] = useState('');
//
//   const searchForRecipes = async (query: String): Promise<any> => {
//     const result = await fetch(`http://localhost:3001/?search=${query}`);
//     return (await result.json()).results;
//   }
//
//   const search = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.target as HTMLFormElement;
//     const input = form.querySelector(`#searchText`) as HTMLInputElement;
//     setRecipesSearch(input.value);
//   };
//
//   useEffect(() => {
//     (async () => {
//       const query = encodeURIComponent(recipeSearch);
//       if(query) {
//         const response = await searchForRecipes(query);
//         setRecipesSearch(response);
//       }
//     })();
//   });
//
//   return (
//     <div className="searchBox">
//       <h1>Recipe Search App</h1>
//       <form className="searchForm" onSubmit={event => search(event)}>
//         <input id="searchText" type="text"/>
//         <button>Search</button>
//       </form>
//     </div>
//   )
// }
// export default searchBox;
