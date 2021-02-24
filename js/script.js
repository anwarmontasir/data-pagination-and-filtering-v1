const itemsPerPage = 9;
let currentPage = 1;

function showPage(list, page) {
   const maxItems = (page * itemsPerPage <= list.length) ? page * itemsPerPage : list.length;

   const startIndex = maxItems - itemsPerPage;
   const endIndex = maxItems;
   const studentListUL = document.querySelector('.student-list');
   studentListUL.innerHTML = '';

   for (let i=startIndex; i<endIndex; i++) {
      
      const student = {};
      student.name = `${list[i].name.first} ${list[i].name.last}`;
      student.email = list[i].email;
      student.registeredDate = list[i].registered.date;
      student.photo = list[i].picture.large;

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

      studentListUL.insertAdjacentHTML('beforeend', studentListLI);
   }
}

function addPagination(list) {
   const numberOfButtons = Math.ceil(list.length / itemsPerPage);
   const linkListUL = document.querySelector('.link-list');
   linkListUL.innerHTML = '';

   for (let i=1; i<=numberOfButtons; i++) {
      const linkListLI = 
      `<li>
         <button type="button">${i}</button>
      </li>`;

      linkListUL.insertAdjacentHTML('beforeend', linkListLI);
   }

   const activeButton = linkListUL.childNodes[0].getElementsByTagName('button')[0];
   highlightButton(activeButton);

   activatePagination(linkListUL, numberOfButtons);
}

function activatePagination(linkListUL, numberOfButtons) {
   const linkListLIs = linkListUL.childNodes;
   for (let i=0; i<numberOfButtons; i++) {
      linkListLIs[i].addEventListener('click', (e) => {
         const buttonNum = e.target.innerHTML;
         showPage(data, buttonNum);
         
         removeNavHighlights();
         
         const activeButton = linkListLIs[i].getElementsByTagName('button')[0];
         highlightButton(activeButton);
      })
   }
}

function highlightButton(activeButton) {
   activeButton.className = 'active';
}

function removeNavHighlights() {
   const previousActive = document.querySelector('.active');
   previousActive.classList.remove('active');
}

showPage(data, currentPage);
addPagination(data);