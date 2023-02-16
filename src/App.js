import './App.css';
import { useEffect, useState } from 'react';
import video from './food.mp4';
import MyRecipesComponent from './MyRecipesComponent';

function App() {

  const myID = '20d9a58b';
  const myKey = 'f766421f20f280ff0f8c2615c14156cf';
  const query = 'avocado'

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]); // это состояния у нас отвечает за рецепты, мы ввели состояние myRecipes и приравняли его к пустому массиву, тк рецептов много
  const [wordSubmitted, setWordSubmitted] = useState('avocado'); // это состояние нам нужно для того, чтобы каждый раз при вводе хоть одной буквы состояние не обновлялось, иначе будет слишком много запросов для АПИ

  useEffect(() => {
    const getRecipe = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=20d9a58b&app_key=f766421f20f280ff0f8c2615c14156cf`);
        const data = await response.json();
        console.log(data.hits);
        setMyRecipes(data.hits); // когда мы пропишем setMyRecipes он будет связан с полученным от АПИ результатом
  }
  getRecipe();
  }, [wordSubmitted]) // здесь мы связываем 

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }


  return (
    <div className="App">
      <div className='box'>
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <h1>Find a Recipe</h1>
      </div>

      <div className='box'>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}></input>
        </form>
      </div>

        <div className='box'>
          <button>🔍</button>
        </div>


      <div>
      {myRecipes.map(element => ( // тут мы берем наше состояние и для того, чтобы увидеть каждый рецепт используем map
        <MyRecipesComponent 
        label={element.recipe.label} 
        image={element.recipe.image} 
        kcal={element.recipe.calories} 
        ingredients={element.recipe.ingredientLines}/>
      ))}
      </div>
    </div>
  );
}

export default App;
