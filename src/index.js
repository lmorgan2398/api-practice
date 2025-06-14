import './styles.css';
import { IPLocate } from 'node-iplocate';

const client = new IPLocate('6f10dfa2e3fe653c9be9c11f29d2e6e0');
const button = document.querySelector('button');
const search = document.querySelector('#search')

let location;

const getIP = function(){
    return client.lookupSelf()
    .then(result => {
        location = result.country;
        console.log(`Country: ${location}`);
        return location;
    })
    .catch(error => 
        {
            console.log(`Error fetching IP: ${error}`);
            return null;
        })
};

getIP();

const img = document.querySelector('img');

fetch('https://api.giphy.com/v1/gifs/translate?api_key=EzH3JZxw0p6AgCIhNvoYdGN5AMkxYohO&s=cats', {mode: 'cors'})
    .then(function(response) {
        return (response.json());
    })
    .then(function(response) {
        img.src = response.data.images.original.url;
    });

button.addEventListener('click', () => {
    let searchValue = search.value;
    if(searchValue.trim() == '') searchValue = 'cats';
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=EzH3JZxw0p6AgCIhNvoYdGN5AMkxYohO&s=${searchValue}`, {mode: 'cors'})
    .then(function(response) {
        return (response.json());
    })
    .then(function(response) {
        if (response == 200) {
            alert('Error Code 200: No Results Found');
            return;
        }
        img.src = response.data.images.original.url;
    })
    .catch((error) => console.error(error))
});
