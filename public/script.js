const urls_container = document.getElementById('urls');

const urls = {
    Interview: {
        GET: 'http://localhost:8080/interview',
        POST: 'http://localhost:8080/interview/insert/data',
        GET_id: 'http://localhost:8080/interview/:id',
        PUT: 'http://localhost:8080/interview/:id',
        DELETE: 'http://localhost:8080/interview/delete/:id',
    },
    Category: {
        GET: 'http://localhost:8080/category',
        POST: 'http://localhost:8080/category/data',
        GET_id: 'http://localhost:8080/category/:id',
        PUT: 'http://localhost:8080/category/:id',
        DELETE: 'http://localhost:8080/category/delete/:id',
    },
    User: {
        GET: 'http://localhost:8080/users',
        POST: 'http://localhost:8080/users/insert/data',
        GET_id: 'http://localhost:8080/users/:id',
        PUT: 'http://localhost:8080/users/:id',
        DELETE: 'http://localhost:8080/users/delete/:id',
    },
};

// console.log(urls);
let show = ``;
for (key in urls) {
    show += `<li class="url_li my-5">`;
    show += `<h2>${key}</h2>`;
    for (newkey in urls[key]) {
        let bg = 'white';
        if (newkey == 'GET') {
            bg = 'success';
        } else if (newkey == 'POST') {
            bg = 'warning';
        } else if (newkey == 'PUT') {
            bg = 'primary';
        } else if (newkey == 'DELETE') {
            bg = 'danger';
        } else if (newkey == 'GET_id') {
            bg = 'info';
        }
        show += `<div class="border-black border p-3 m-2 rounded ${newkey}">`;
        show += `<a href="${urls[key][newkey]}" target="_blank" class="text-decoration-none button px-3 py-2 me-3 rounded bg-${bg} text-white shadow">${newkey}</a>`;
        show += `<span>${urls[key][newkey]}</span>`;
        show += `</div>`;
    }
    show += `</li>`;
}

urls_container.innerHTML = show;


