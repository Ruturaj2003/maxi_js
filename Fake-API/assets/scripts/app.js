//JSON-JavaScript Object Notation
const listElelment = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url, data = null) {
    const promise = new Promise((res, rej) => {
        //This "Object" will allow me to send HTTP requests which is built into the browser
        const xhr = new XMLHttpRequest();

        //Configuration of object
        //With open alone no network activity will be started
        xhr.open(method, url);
        //We can use this to parse it behind the scenes
        xhr.responseType = 'json';

        //AddEVLis can also be used
        xhr.onload = function () {
            res(xhr.response);
        };
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

function fetchPosts() {
    sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
        (responseData) => {
            // console.log(xhr.response);
            //Stringyfiy helpls convert JS data to JSON data
            //Parse helps converting JSON data to JS data
            //const listOfPosts = JSON.parse(xhr.response);
            const listOfPosts = responseData;
            //We are using the for loop here since it is async code and if the loop is outside it may or maynot have the data available,
            //Here it is garented that the data will be available
            for (const post of listOfPosts) {
                //Replicate temp for every post
                const postEl = document.importNode(postTemplate.content, true);
                postEl.querySelector('h2').textContent =
                    post.title.toUpperCase();
                postEl.querySelector('p').textContent = post.body;
                listElelment.append(postEl);
            }
        }
    );
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId,
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}
fetchPosts();
createPost('DUMMY', 'adssafa');
