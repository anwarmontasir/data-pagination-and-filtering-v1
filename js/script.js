/* 9 items per page */
const itemsPerPage = 9;

/* showPage function */
function showPage(list, page) {
   /* where to start counting */
   const startIndex = page * itemsPerPage - itemsPerPage;
   /* where to end counting. ternary is used to stop counting at the end of the list */
   const endIndex = (page * itemsPerPage <= list.length) ? page * itemsPerPage : list.length;
   /* select ul */
   const studentListUL = document.querySelector('.student-list');
   /* clear old contents */
   studentListUL.innerHTML = '';
   /* loop */
   for (let i=startIndex; i<endIndex; i++) {
      /* create student object for storing name, email, date, photo */
      const student = {};
      student.name = `${list[i].name.first} ${list[i].name.last}`;
      student.email = list[i].email;
      student.registeredDate = list[i].registered.date;
      student.photo = list[i].picture.large;
      /* create HTML for displaying student */
      const studentListLI = 
      `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.photo}" alt="${student.name} Profile Picture">
           <h3>${student.name}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${student.registeredDate}</span>
         </div>
      </li>`;
      /* insert li at the end of the ul */
      studentListUL.insertAdjacentHTML('beforeend', studentListLI);
   }
}

/* addPagination function */
function addPagination(list) {
   /* how many buttons needed? */
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   /* select ul */
   const linkListUL = document.querySelector('.link-list');
   /* clear old contents */
   linkListUL.innerHTML = '';
   /* loop */
   for (let i=1; i<=numberOfButtons; i++) {
      /* create HTML for displaying buttons */
      const linkListLI = 
      `<li>
         <button type="button">${i}</button>
      </li>`;
      /* insert li at the end of the ul */
      linkListUL.insertAdjacentHTML('beforeend', linkListLI);
   }
   /* select first button */
   const activeButton = linkListUL.childNodes[0].getElementsByTagName('button')[0];
   /* highlight active button */
   highlightButton(activeButton);
   /* make pagination clickable */
   activatePagination(list, linkListUL, numberOfButtons);
}

/* activatePagination function */
function activatePagination(list, linkListUL, numberOfButtons) {
   /* select array of li elements */
   const linkListLIs = linkListUL.childNodes;
   /* loop */
   for (let i=0; i<numberOfButtons; i++) {
      /* add click listener */
      linkListLIs[i].addEventListener('click', (e) => {
         /* find page number by reading innerHTML */
         const buttonNum = e.target.innerHTML;
         /* show page corresponding to button number */
         showPage(list, buttonNum);
         /* clear 'active' class from pagination */
         removeNavHighlights();
         /* select clicked button */
         const activeButton = linkListLIs[i].getElementsByTagName('button')[0];
         /* highlight active button */
         highlightButton(activeButton);
      })
   }
}

/* highlightButton function */
function highlightButton(activeButton) {
   /* add 'active' class to current button */
   activeButton.className = 'active';
}

/* removeNavHighlights function */
function removeNavHighlights() {
   /* select 'active' class */
   const previousActive = document.querySelector('.active');
   /* remove 'active' class */
   previousActive.classList.remove('active');
}

/* call showPage starting with page 1 */
showPage(data, 1);
/* call addPagination */
addPagination(data);

/* addSearch function */
function addSearch() {
   /* create search bar HTML */
   const searchBar = 
   `<label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>`;
    /* select header */
   const header = document.querySelector('header');
   /* add search bar to header */
   header.insertAdjacentHTML('beforeend', searchBar);
}

/* activateSearch function */
function activateSearch(list) {
   /* select search bar */
   const search = document.querySelector('#search');
   /* add search bar keyup listener */
   search.addEventListener('keyup', () => {
      searchList(list, search.value);
   });

   /* select submit button */
   const submit = document.querySelector('.student-search button');
   /* add submit listener */
   submit.addEventListener('click', (e) => {
      e.preventDefault();
      searchList(list, search.value,);
   });
}

/* searchList function */
function searchList(list, searchTerm) {
   /* filter list of students */
   const filteredList = filterList(list, searchTerm);
   /* if filtered list has at least one student, update page */
   if (filteredList.length > 0) {
      showPage(filteredList, 1);
      addPagination(filteredList);
   } else {
      /* if zero results, display message on screen */
      noResults(searchTerm);
   }
}

/* filterList function */
function filterList(list, searchTerm) {
   /* return array of matches for first name or last name. Ignore case when searching */
   return list.filter(listItem => listItem.name.first.toLowerCase().includes(searchTerm.toLowerCase()) || listItem.name.last.toLowerCase().includes(searchTerm.toLowerCase()));
}

/* noResults function */
function noResults(searchTerm) {
   /* select linkListUL */
   const linkListUL = document.querySelector('.link-list');
   /* clear old contents */
   linkListUL.innerHTML = '';
   /* select studentListUL */
   const studentListUL = document.querySelector('.student-list');
   /* update studentListUL with 'no results' message */
   studentListUL.innerHTML = `<li>No results found for “${searchTerm}”</li>`;
}

/* add search bar to DOM */
addSearch();
/* activate search listeners */
activateSearch(data);