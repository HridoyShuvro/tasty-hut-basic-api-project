const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    console.log(meals);
    const mealsContainer = document.getElementById('food-card-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-md-6');
        mealDiv.classList.add('mb-3');
        mealDiv.innerHTML = `
        <div class="row text-white bg-danger bg-opacity-25 border border-primary-subtle rounded-3">
                        <div class="col-md-4">
                            <div class="food-card-image">
                                <img src="${meal.strMealThumb}" style="max-width: 100%; max-height: 100%;" alt="">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <h2>${meal.strMeal}</h2>
                            <p>Catogory: ${meal.strCategory}</p>
                            <p>Region: ${meal.strArea}</p>
                            <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#mealDetails">
    View Details
  </button>
                        </div>
                    </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })
}


const searchMeals = () =>{
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);
    loadMeals(searchText);

}


const loadMealDetail = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    document.getElementById('mealInstructions').innerText = meal.strInstructions;
    document.getElementById('meal-img').innerHTML = `<img class="img-fluid" src="${meal.strMealThumb}">`;
}

loadMeals('fish');