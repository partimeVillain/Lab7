// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let number = 0;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        number++;
        let num = number;
        newPost.id = number;
        newPost.addEventListener('click', ()=>{
        setState({name:'entry', id: num}, false);
        });//end of entry event listener
        document.querySelector('main').appendChild(newPost);
      });//end of each entries
    });
});

// Pop state happens when back button is clicked
window.addEventListener('popstate', (event) => {
 setState(history.state, true); 
});


//setting button
document.querySelector("header img").addEventListener("click", () => {
 setState({name:'setting'}, false);
});

//  home button
document.querySelector("header h1").addEventListener("click", () => {
 setState({name:'home'}, false);
});