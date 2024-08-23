// Event listeners
document.addEventListener('DOMContentLoaded', function() {
        // // Initialize EmailJS
        // emailjs.init('AV_0u2dO6Qg12ljT_');

    // Load random recipes
    loadRandomRecipes();

    // Add event listener to search button
    document.querySelector('header button').addEventListener('click', function() {
        searchRecipes();
    });

    // Add event listener to the contact form
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        sendContactMessage();
    });

    // Add event listener for "Add to Favorites" buttons using event delegation
    document.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.add-to-fav')) {
            const recipeId = event.target.getAttribute('data-id');
            addToFavorites(recipeId);
        } else if (event.target && event.target.closest('.add-to-fav')) {
            const recipeId = event.target.closest('.add-to-fav').getAttribute('data-id');
            addToFavorites(recipeId);
        }
    });
});

// Function to load random recipes
function loadRandomRecipes() {
    const apiKey = '850cdd494c884456a200b02987f6d624';
    const randomRecipesContainer = document.getElementById('randomRecipesContainer');

    fetch(`https://api.spoonacular.com/recipes/random?number=8&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="card-content">
                        <h5>${recipe.title}</h5>
                        <p>${recipe.summary}</p>
                        <a href="recipeDetail.html?id=${recipe.id}" class="button">View Recipe</a>
                        <button class="button add-to-fav" data-id="${recipe.id}">
                            <i class="fas fa-heart"></i> Add to Favorites
                        </button>
                    </div>
                `;
                randomRecipesContainer.appendChild(recipeCard);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to handle search
function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
        // Redirect to search results page with query
        window.location.href = `search.html?q=${encodeURIComponent(searchInput)}`;
    }
}


// Function to send contact message to Firebase Realtime Database
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    sendContactMessage();
});

function sendContactMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        emailjs.send('service_s55auvk', 'template_tlge95g', {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(() => {
            alert('Your message has been sent!');
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        });
    } else {
        alert('Please fill in all fields.');
    }
}


// Function to add recipe to favorites
function addToFavorites(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Recipe added to favorites!');
    } else {
        alert('Recipe is already in favorites.');
    }
}

// Function to toggle menu
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// Smooth scrolling for internal links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) { // Only prevent default for internal links
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Do not prevent default for external links
    });
});

function showSearchSuggestions() {
    const searchInput = document.getElementById('searchInput').value;
    const apiKey = '850cdd494c884456a200b02987f6d624';
    const suggestionsContainer = document.getElementById('suggestionsContainer');

    if (searchInput.length > 2) {
        fetch(`https://api.spoonacular.com/recipes/autocomplete?query=${searchInput}&number=5&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                suggestionsContainer.innerHTML = '';
                data.forEach(recipe => {
                    const suggestionItem = document.createElement('a');
                    suggestionItem.href = `recipeDetail.html?id=${recipe.id}`;
                    suggestionItem.textContent = recipe.title;
                    suggestionsContainer.appendChild(suggestionItem);
                });
                suggestionsContainer.style.display = 'block'; // Show the dropdown
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
                suggestionsContainer.style.display = 'none'; // Hide the dropdown in case of error
            });
    } else {
        suggestionsContainer.style.display = 'none'; // Hide the dropdown if input length is less than 3 characters
    }
}

// Optionally, hide suggestions when clicking outside
document.addEventListener('click', function(event) {
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    if (!document.getElementById('searchInput').contains(event.target)) {
        suggestionsContainer.style.display = 'none';
    }
});
