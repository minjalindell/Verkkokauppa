document.addEventListener('DOMContentLoaded', function() {
    calculateAverageRating(); 

    document.getElementById('arvosteluLomake').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nimi = document.getElementById('nimi').value;
        const rating = parseInt(document.getElementById('rating').value);
        const kommentti = document.getElementById('kommentti').value;

        const uusiArvostelu = document.createElement('div');
        uusiArvostelu.classList.add('arvostelu');

        uusiArvostelu.innerHTML = `
            <p class="nimi"><strong>${nimi}</strong></p>
            <p class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
            <p class="kommentti">${kommentti}</p>
        `;

        document.getElementById('arvosteluContainer').appendChild(uusiArvostelu);

        
        calculateAverageRating();

        document.getElementById('arvosteluLomake').reset();
    });
});


function calculateAverageRating() {
    const arvostelut = document.querySelectorAll('.arvostelu .rating');
    let totalRating = 0;
    let count = 0;

    arvostelut.forEach(function(ratingElement) {
        const stars = ratingElement.textContent;
        const rating = stars.split('★').length - 1; 
        totalRating += rating;
        count++;
    });

    const average = count > 0 ? (totalRating / count).toFixed(1) : 0; 
    const averageRating = document.getElementById('average-rating');
    const averageStar = document.getElementById('average-star');

    averageRating.textContent = average; 
    averageStar.textContent = '★'; 
}
