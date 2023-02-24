function MyRecipesComponent({label, image, kcal, ingredients}) {
    return (
        <div>
            <div className="box">
            <h2>{label}</h2>
            </div>

            <div className="box">
            <img src={image} alt='food pic'></img>
            </div>

            <ul className="list">
                {ingredients.map(ingredient => (
                    <li>✔️ {ingredient}</li>
                ))}
            </ul>

            <div className="box">
            <h3>{kcal.toFixed()} kcal</h3>
            </div>
        </div>
    )
}

export default MyRecipesComponent;
