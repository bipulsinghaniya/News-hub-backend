const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");

// Fetch news from BACKEND (API key hidden)
async function fetchNews(query = "") {
  newsContainer.innerHTML = `<p class="text-center w-full">Loading...</p>`;

  try {
    const response = await fetch(
      query ? `http://localhost:5000/api/news?q=${query}` : `http://localhost:5000/api/news`
    );

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = `<p class="text-center w-full">No results found.</p>`;
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p class="text-red-600 text-center">Error fetching news</p>`;
  }
}

// Display news cards
function displayNews(articles) {
  newsContainer.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition";

    card.innerHTML = `
      <img src="${article.urlToImage || "https://via.placeholder.com/400"}"
           class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="font-bold text-lg mb-2">${article.title}</h2>
        <p class="text-sm mb-3">${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank"
           class="text-blue-600 font-semibold">Read more →</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

// Search on Enter
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchNews(searchInput.value);
  }
});

// Load default news
fetchNews();
