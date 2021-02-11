import './styles.css';
import fetchCountry from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import countryCard from './templates/countryCard.hbs';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    list: document.querySelector('.js-list'),
    searchForm: document.querySelector('input'),
    article: document.querySelector('.js-article')
};

let countryName;

function debounce(callback) {
    let timeout;
    return function(argument) {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 500, argument);
    };
  }
  function onInput(event) {
    event.preventDefault();
    countryName = event.target.value;
    refs.list.innerHTML = '';
    refs.article.innerHTML = '';
    if(countryName.length > 0){
      fetchCountry(countryName)
      .then(buildcountriesList)
  }
  }
  const debouncedOnInput = debounce(onInput);
  refs.searchForm.addEventListener('input', debouncedOnInput);

  function buildcountriesList(items) {
    if (items.length > 1 && items.length <= 10){
      updateCountriesList(countriesList(items));
    } else if (items.length > 10){
      error({
        text: 'Too many matches found. Please enter a more specific query'
      });
    } else if(items.length === 1){
      updateCountry(countryCard(items));
    } else {
      info({text: 'Not found.'})
    }
    
  }


function updateCountriesList (data){
  refs.list.insertAdjacentHTML('beforeend', data);
}
function updateCountry (data){
  refs.article.insertAdjacentHTML('beforeend', data);
}