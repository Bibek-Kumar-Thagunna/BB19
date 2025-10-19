document.addEventListener('DOMContentLoaded', () => {

    // Get all the necessary elements from the DOM
    const modal = document.getElementById('voteModal');
    const voteButtons = document.querySelectorAll('.vote-button');
    const closeBtn = document.querySelector('.close-button');
    const igButton = document.querySelector('.vote-button-ig');
    
    // Get the elements inside the modal that we need to update
    const modalImg = document.getElementById('modalContestantImage');
    const modalName = document.getElementById('modalContestantName');
    const modalProfession = document.getElementById('modalContestantProfession');

    // Loop through each "Vote Now" button and add a click event listener
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the data from the button's data attributes
            const name = button.dataset.name;
            const profession = button.dataset.profession;
            const imgSrc = button.dataset.img;

            // Populate the modal with the contestant's data
            modalName.textContent = name;
            modalProfession.textContent = profession;
            modalImg.src = imgSrc;

            // Display the modal
            modal.style.display = 'block';
        });
    });

    // NEW: Event listener for IG vote button
    igButton.addEventListener('click', () => {
        const name = modalName.textContent;
        closeModal();
        // Redirect to destination with contestant name as param
        window.location.href = `index2.html?votingFor=${encodeURIComponent(name)}`;
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    }

    // When the user clicks on the 'x' (close button), close the modal
    closeBtn.addEventListener('click', closeModal);

    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // NEW: Handle return from destination (check URL param for voted contestant)
    const urlParams = new URLSearchParams(window.location.search);
    const voted = urlParams.get('voted');
    if (voted) {
        const cards = document.querySelectorAll('.contestant-card');
        cards.forEach(card => {
            const h3 = card.querySelector('h3');
            if (h3 && h3.textContent.trim() === decodeURIComponent(voted)) {
                const btn = card.querySelector('.vote-button');
                if (btn) {
                    btn.innerHTML = 'Voted <span class="tick">✓</span>';
                    btn.classList.add('voted-button');
                    btn.disabled = true;
                    // Optional: Clear URL param after handling
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        });
    }
});