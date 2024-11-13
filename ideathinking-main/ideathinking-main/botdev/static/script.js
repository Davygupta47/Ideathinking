/*function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    
    if (input !== "") {
      const data = {
        genre: "action",  // Replace with input from user question
        mood: "exciting", // Replace with input from user question
        language: "english", // Replace with input from user question
        time_period: "moderate", // Replace with input from user question
        director: "Nolan" // Optional
      };
  
      fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(recommendations => {
        let movieList = recommendations.join(', ');
        addChat(input, movieList); // Show recommendations in chat
      })
      .catch(error => console.error('Error:', error));
    }
  
    inputField.value = "";
  }
  */
function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, ""); 

    const genre = extractGenre(text); 
    const mood = extractMood(text); 
    const language = extractLanguage(text);
    const time_period = extractTimePeriod(text);
    const director = extractDirector(text); 

    const requestData = {
        genre: genre,
        mood: mood,
        language: language,
        time_period: time_period,
        director: director
    };

    fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            product = "Recommended movies: " + data.join(', ');
        } else {
            product = "Sorry, no recommendations found.";
        }
        addChat(input, product);
    })
    .catch(error => {
        console.error('Error:', error);
        addChat(input, "Sorry, there was an error processing your request.");
    });
}
function extractGenre(text) {
    const genres = ["action", "comedy", "drama", "horror", "romantic"];
    for (let genre of genres) {
        if (text.includes(genre)) {
            return genre;
        }
    }
    return "any"; 
}
function extractMood(text) {
    const moods = ["happy", "sad", "exciting", "calm"];
    for (let mood of moods) {
        if (text.includes(mood)) {
            return mood;
        }
    }
    return "any"; 
}

function extractLanguage(text) {
    const languages = ["english", "spanish", "french", "german"];
    for (let language of languages) {
        if (text.includes(language)) {
            return language;
        }
    }
    return "any";
}

function extractTimePeriod(text) {
    if (text.includes("old")) {
        return "old";
    } else if (text.includes("new")) {
        return "new";
    } else if (text.includes("moderate")) {
        return "moderate";
    }
    return "any";
}

function extractDirector(text) {
    const directors = ["nolan", "spielberg", "tarantino"];
    for (let director of directors) {
        if (text.includes(director)) {
            return director;
        }
    }
    return ""; 
}
