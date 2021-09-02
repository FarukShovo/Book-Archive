document.getElementById('book-numbers').style.display = 'none'
document.getElementById('spinner').style.display = 'none'
const searchField = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';

    document.getElementById('spinner').style.display = 'block'

    const url = `http://openlibrary.org/search.json?q=${searchText}`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.docs, data.numFound))
}

const displaySearchResult = (books, bookNumber) => {
    const displayResult = document.getElementById('display-result');

    document.getElementById('spinner').style.display = 'none'

    /* --------cear privious result------- */
    document.getElementById('display-result').textContent = "";
    // console.log(books)

    // console.log(books.length)
    document.getElementById('book-numbers').style.display = 'block'
    document.getElementById('book-numbers').innerText = `You have found ${bookNumber} Books! `;

    books.forEach(book => {
        const resultDiv = document.createElement('div');
        // console.log(book.length)
        resultDiv.classList.add('col');
        resultDiv.innerHTML = `
        <div class="card h-100">
                        <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Title : ${book.title}</h5>
                            <p class="card-text">Author Name : ${book.author_name} </p>
                            <p class="card-text">Publisher : ${book.publisher} </p>
                            <p class="card-text">First Publish : ${book.first_publish_year ? book.first_publish_year : 'N/A'} </p>
                        </div>
                    </div>
        `;
        displayResult.appendChild(resultDiv);
    })
}