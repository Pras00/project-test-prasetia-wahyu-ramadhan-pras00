// Navbar

const navbar = document.getElementById('navbar');
let prevScrollPos = window.scrollY;

window.onscroll = function() {
  const currentScrollPos = window.scrollY;
  
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = '0';
    navbar.style.backgroundColor = 'rgba(237, 99, 7, 0.9)';
  } else {
    navbar.style.top = `-${navbar.offsetHeight}px`;
    navbar.style.backgroundColor = 'transparent';
  }

  prevScrollPos = currentScrollPos;
};


document.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const parallaxElement = document.getElementById("parallax");

  // Adjust background-position based on scroll position
  parallaxElement.style.backgroundPosition = `50% ${scrollPosition * 0.2}px`;
});




// Filter
const Data = [
  { 
    created_at: "2023-07-11 17:30:17",
    deleted_at: null,
    id: 279,
    published_at: "2023-07-14 12:00:00",
    slug: "balanced-scorecard-pengertian-manfaat-dan-perspektif",
    title: "Balanced Scorecard: Pengertian, Manfaat dan Perspektif",
    updated_at: "2023-07-11 17:30:17"
  },
  {
    created_at: "2023-07-11 16:19:12",
    deleted_at: null,
    id: 278,
    published_at: "22023-07-12 12:00:00",
    slug: "System-design-pengertian-prinsip-dan-jenis",
    title: "System Design: Pengertian, Prinsip, dan Jenis",
    updated_at: "2023-07-11 16:19:12"
  },
  {
    created_at: "2023-06-27 11:26:39",
    deleted_at: null,
    id: 277,
    published_at: "2023-06-28 12:00:00",
    slug: "devops-arti-manfaat-metode-dan-contoh",
    title: "DevOps: Arti, Manfaat, Metode, dan Contoh",
    updated_at: "2023-07-05 09:30:53"
  },
];


let currentPage = 1;
let itemsPerPage = 10;

function renderData() {
  const dataList = document.getElementById('dataList');
  dataList.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedData = sortDataByDate(Data);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.title} - ${item.date}`;
    dataList.appendChild(li);
  });

  const itemCount = sortedData.length;
  const showingInfo = document.getElementById('showingInfo');
  showingInfo.textContent = `Showing ${startIndex + 1} - ${Math.min(endIndex, itemCount)} of ${itemCount}`;

  // Enable or disable "Next" and "Previous" buttons
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = endIndex >= itemCount;

  // Generate page numbers
  renderPageNumbers();
}

function renderPageNumbers() {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = '';

  const sortedData = sortDataByDate(Data);
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberButton = document.createElement('button');
    pageNumberButton.textContent = i;
    pageNumberButton.onclick = () => goToPage(i);

    if (i === currentPage) {
      pageNumberButton.classList.add('active');
    }

    pageNumbersContainer.appendChild(pageNumberButton);
  }
}

function sortDataByDate(data) {
  const sortValue = document.getElementById('sort').value;

  return data.slice().sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (sortValue === 'latest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
}

function updatePerPage() {
  itemsPerPage = parseInt(document.getElementById('perPage').value);
  currentPage = 1;
  renderData();
}

function sortData() {
  renderData();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderData();
  }
}

function nextPage() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemCount = sortDataByDate(Data).length;

  if (endIndex < itemCount) {
    currentPage++;
    renderData();
  }
}

function goToPage(pageNumber) {
  currentPage = pageNumber;
  renderData();
}

// Initial rendering
renderData();



// Fetch API
const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

axios.get(apiUrl)
  .then(response => {
    const Data = response.data.data
    console.log(Data);
  })
  .catch(error => {
    console.error('There was an error with the request', error);
  });
