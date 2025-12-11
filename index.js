// Step 1: Select the theme button
const themeButton = document.getElementById('theme-toggle');

// Loading Screen Animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Wait 2 seconds, then fade out
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 2000);
});

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        themeButton.textContent = 'Toggle Light Mode';
    } else {
        themeButton.textContent = 'Toggle Dark Mode';
    }
};

// Step 3: Register a 'click' event listener for the theme button
themeButton.addEventListener('click', toggleDarkMode);

// Initialize dark mode button text
themeButton.textContent = 'Toggle Dark Mode';

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [X] Project 6 (REQUIRED FEATURE)
  - [X] Project 6 (STRETCH FEATURE) 
  - [X] Project 7 (REQUIRED FEATURE)
  - [X] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById('rsvp-button');

// Initialize count variable starting at 0
let count = 0;

const addParticipant = (person) => {
    // Create a new paragraph element for the new participant
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `👋 ${person.name} from ${person.hometown} is joining the crew.`;
    
    // Find the participants container
    const participantsDiv = document.querySelector('.rsvp-participants');
    
    // Remove the old count element before adding new participant
    const oldCount = document.getElementById('rsvp-count');
    if (oldCount) {
        oldCount.remove();
    }
    
    // Add the new participant to the list
    participantsDiv.appendChild(newParticipant);
    
    // Increment the count
    count = count + 1;
    
    // Create new count element
    const newCount = document.createElement('p');
    newCount.id = 'rsvp-count';
    newCount.textContent = `🏃 ${count} runners are ready to hit the road!`;
    
    // Append the new count to the participants div
    participantsDiv.appendChild(newCount);
    
    // Call toggleModal after adding participant
    toggleModal(person);
};

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [X] Project 7 (REQUIRED FEATURE)
  - [X] Project 7 (STRETCH FEATURE)
  - [X] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;
  
  // Create person object with form data
  const person = {
    name: document.getElementById('name').value.trim(),
    hometown: document.getElementById('home-state').value.trim(),
    email: document.getElementById('email').value.trim()
  };
  
  // Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    // Skip the submit button
    if (rsvpInputs[i].type === 'submit') {
      continue;
    }
    
    // Validate the value of each input
    if (rsvpInputs[i].value.trim().length < 2) {
      containsErrors = true;
      rsvpInputs[i].classList.add('error');
    } else {
      rsvpInputs[i].classList.remove('error');
    }
  }

  // STRETCH FEATURE: Specific validation for email address
  if (!person.email.includes('@')) {
    containsErrors = true;
    document.getElementById('email').classList.add('error');
  } else {
    // Only remove error if it wasn't already marked as error for length
    if (person.email.length >= 2) {
      document.getElementById('email').classList.remove('error');
    }
  }

  // If no errors, call addParticipant() and clear fields
  if (containsErrors == false) {
    addParticipant(person);
    
    // Clear all input fields
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton.addEventListener('click', validateForm);

/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [X] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            current.classList.remove('active');
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', reveal);

/*** Success Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [X] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

// Animation variables
let rotateFactor = 0;
const modalImage = document.querySelector('.modal-image');

const animateImage = () => {
    // Check if rotateFactor is 0
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    
    // Apply rotation to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
    let modal = document.getElementById('success-modal');
    
    // Update modal display to flex
    modal.style.display = 'flex';
    
    // Update modal text to personalized message with user's name
    const modalText = document.getElementById('modal-text');
    modalText.textContent = `Welcome to the crew, ${person.name}!`;
    
    // Start the image animation - call animateImage every 500ms (half second)
    const intervalId = setInterval(animateImage, 500);
    
    // Set modal timeout to 6 seconds (to enjoy the celebration!)
    setTimeout(() => {
        // Update modal display to none
        modal.style.display = 'none';
        // Stop the animation
        clearInterval(intervalId);
    }, 6000);
};