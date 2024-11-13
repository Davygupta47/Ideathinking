const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
document.addEventListener('DOMContentLoaded', function() {
    // Get the "Sign In" button by its ID
    const signInButton = document.getElementById('SignIn');

    // Add a click event listener to the button
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            // Redirect to profile.html
            window.location.href = 'profile.html';
        });
    }
});
