// Створи додаток для туристичного агенства. Користувач має форму в яку може додавати довільну кількість полів. В кожне поле він вводить назву країни. Після сабміту фрми форма відправляє запит на бекенд та отримує назви столиць цих країн.
// На основі відподвіді попереднього сервісу потрібно створити прогноз погоди по кожній столиці. Використовуй паралельні запити. Бекенд для пошуку країн https://restcountries.com/
// Бекенд для прогнозу погоди https://www.weatherapi.com/docs/

const elements = {
  form: document.querySelector('.js-search'),
  formContainer: document.querySelector('.js-form-container'),
  addField: document.querySelector('.js-add'),
  list: document.querySelector('.js-list'),
};

elements.addField.addEventListener('click', handlerAddField);
elements.form.addEventListener('submit', handleSubmit);

function handlerAddField() { 
  elements.formContainer.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="input-country" name="country" />'
  );
}

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const countries = formData
    .getAll('country')
    .map(item => item.trim())
    .filter(item => item)
	.filter((item,idx,arr) => arr.indexOf(item) === idx);

  try {
    const capitals = await servicesCountry(countries);
    const weather = await serviceWeather(capitals);
    elements.list.innerHTML = createMarkup(weather);
  } catch (error) {
    console.log(error);
  } finally {
    elements.formContainer.innerHTML =
      '<input type="text" class="input-country" name="country" />';
  }
}

async function servicesCountry(countries) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const responses = countries.map(async country => {
    const resp = await fetch(`${BASE_URL}${country}`);
    if (!resp.ok) {
      // throw new Error(resp.statusText);
      return Promise.reject(resp.statusText);
    }
    return resp.json();
  });

  const data = await Promise.allSettled(responses);
  return data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value[0].capital[0]);
}

async function serviceWeather(capitals) {
  const BASE_URL = 'http://api.weatherapi.com/v1/';
  const END_POINT = 'current.json';
  const API_KEY = '033b369d9d6241bab00133843241004';

  const responses = capitals.map(async capital => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: capital,
      lang: 'en',
    });
    const resp = await fetch(`${BASE_URL}${END_POINT}?${params}`);

    if (!resp.ok) {
      return Promise.reject(resp.statusText);
    }
    return resp.json();
  });

  const data = await Promise.allSettled(responses);
  
  return data
    .filter(({ status }) => status === 'fulfilled').map(
      ({
       value: {
		current: {
			condition: { text, icon },
			temp_c,
		  },
		  location: { name, country },
	   },
      }) => {
        return { text, icon, temp_c, name, country };
      });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ country, icon, name, temp_c, text }) => `
	<li>
	<img src="${icon}" alt="${text}">
	<h2>${country}</h2>
	<h2>${name}</h2>
	<p>${text}</p>
	<p>${temp_c} °C</p>
  </li>
	`
    )
    .join('');
}
