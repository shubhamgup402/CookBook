// const apiKey = '7440ef8a41ef436eb2753ee85f343a75';

// // Function to handle recipe search
// document.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const query = params.get('q');
//     if (query) {
//         document.title = `Search Results for "${query}"`;
//         searchRecipes(query);
//     }
// });

// function searchRecipes(query) {
//     fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&apiKey=${apiKey}`)
//         .then(response => response.json())
//         .then(data => displaySearchResults(data.results))
//         .catch(error => console.error('Error fetching search results:', error));
// }

// function displaySearchResults(recipes) {
//     const recipeResultsContainer = document.getElementById('recipeResults');
//     recipeResultsContainer.innerHTML = recipes.map(recipe => `
//         <div class="col-md-4">
//             <div class="card mb-4 shadow-sm">
//                 <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
//                 <div class="card-body">
//                     <h5 class="card-title">${recipe.title}</h5>
//                     <a href="recipeDetail.html?id=${recipe.id}" class="btn btn-primary">View Recipe</a>
//                 </div>
//             </div>
//         </div>
//     `).join('');
// }

