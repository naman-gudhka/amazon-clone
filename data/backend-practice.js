const xhr = new XMLHttpRequest();

// Why we create xhr response here and not after xhr.send() is because we want to set up the event listener before sending the request. This way, we can handle the response as soon as it arrives.
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); 
// This creates a new GET request to the specified URL.

xhr.send(); 
// This sends the request to the server.