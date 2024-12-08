


var siteNameInput = document.getElementById("nameInput");
var siteURLInput = document.getElementById("webURL");
var bookmarkTable = document.getElementById("bookmarkTable");
var siteArray = [];
var submitButton = document.querySelector(".btn-danger");
submitButton.addEventListener("click", addBookmark);

if (localStorage.getItem("bookmarksList")) {
    siteArray = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmarks();
}

function addBookmark(event) {
    event.preventDefault();
    var siteName = siteNameInput.value.trim();
    var siteURL = siteURLInput.value.trim();

  
    if (!isValidName(siteName)) {
        showNameAlert();
        return;
    }

    if (!isValidURL(siteURL)) {
        showURLAlert();
        return;
    }

    if (isDuplicate(siteName)) {
        alert("Bookmark name already exists!");
        return;
    }


    var bookmark = {
        name: siteName,
        url: siteURL,
    };
    siteArray.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(siteArray));
    displayBookmarks();
    clearInput();
}

function isValidName(name) {
    console.log("Checking name:", name); 
    return name.length >= 3; 
}


function isValidURL(url) {
    var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
}


function isDuplicate(name) {
    return siteArray.some((bookmark) => bookmark.name.toLowerCase() === name.toLowerCase());
}

function displayBookmarks() {
    bookmarkTable.innerHTML = "";
    siteArray.forEach((bookmark, index) => {
        var row = `
           <tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${bookmark.name}</td>
            <td class="text-center"><a href="${bookmark.url}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
            <td class="text-center"><button class="btn btn-danger" onclick="deleteBookmark(${index})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
          </tr>
        `;
        bookmarkTable.innerHTML += row;
    });
}

function deleteBookmark(index) {
    siteArray.splice(index, 1);
    localStorage.setItem("bookmarksList", JSON.stringify(siteArray));
    displayBookmarks();
}


function clearInput() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}


function showNameAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Invalid Site Name',
        text: 'Site name must be at least 3 characters long.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
    });
}


function showURLAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Invalid URL',
        text: 'Site URL must be a valid one.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
    });
}
