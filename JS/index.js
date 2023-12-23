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
  parallaxElement.style.backgroundPosition = `50% ${scrollPosition * 0.2}px`;
});



let currentPage = 1;
let itemsPerPage = 10;
let Data = []; // Menyimpan data dari API

// Fungsi untuk mengubah format tanggal
function formatTanggal(tanggal) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(tanggal).toLocaleDateString('id-ID', options);
}

function renderData() {
  const dataList = document.getElementById('dataList');
  dataList.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedData = sortDataByDate(Data);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  let imageNumber = 1;

  paginatedData.forEach(item => {
    const div = document.createElement('div');
    div.setAttribute('class', 'dataItems');
    dataList.appendChild(div);
  
    // Gunakan imageNumber untuk menentukan nomor urutan gambar
    div.innerHTML = `
      <div class="itemImg">
        <img loading="lazy" src="https://raw.githubusercontent.com/Pras00/imgHTML/main/suitmedia${imageNumber}.jpg" alt="ItemImg">
      </div>
      <div class="itemDesc">
        <h3>${formatTanggal(item.created_at)}</h3>
        <h2>${item.title}</h2>
      </div>
    `;
  
    // Update nomor urutan gambar untuk urutan selanjutnya
    imageNumber = (imageNumber % 2) + 1;
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


// Fetch API
const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    Data = response.data.data;
    renderData();
  } catch (error) {
    console.error('There was an error with the request', error);
  }
}

// Panggil fungsi fetchData
fetchData();

