const itemsPerPage = 9;
let currentPage = 1;

function showPage(list, page) {
   const startIndex = page * itemsPerPage - itemsPerPage;
   const endIndex = page * itemsPerPage;
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



showPage(data, currentPage);