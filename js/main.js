let token = null;

(() => {
  //init function
  //generate a loader from a template
  const honeycomb = (() => {
    let temp = document.querySelector('#honeycomb');
    let spinner = temp.content.cloneNode(true); // documentFragment
    return spinner.firstElementChild; //html inside the fragment
  })();
  document.body.addEventListener('click', () => {
    if (token) {
      //logged in
      console.log('fetch');
      fetchImage(honeycomb);
    } else {
      //not logged in yet
      login();
    }
  });

  document.querySelector('#logout').addEventListener('click', (ev) => {
    ev.preventDefault();
    ev.stopPropagation(); //stop bubbling from triggering login
    token = null;
    document.querySelector('header').classList.remove('logged-in');
  });

  document.addEventListener('fullscreenchange', (ev) => {
    console.log(ev);
  });
  document.querySelector('main > img').addEventListener('dblclick', (ev) => {
    //toggle fullscreen on image
    let img = ev.target;
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      img.requestFullscreen().catch((err) => {
        console.error('failed to make image fullscreen');
      });
    } else {
      document.exitFullscreen();
    }
  });
})();

function login() {
  let req = new Request('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
    }),
  });
  fetch(req)
    .then((response) => {
      if (!response.ok) throw new Error('Invalid login attempt');
      token = null;
      return response.json();
    })
    .then((data) => {
      token = data.accessToken;
      document.querySelector('header').classList.add('logged-in');
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function fetchImage(spinner) {
  //use fetch to get an image
  //if a spinner is provided show before fetch and remove after
  const main = document.querySelector('main');
  main.classList.add('loading'); // in the css
  main.append(spinner);

  //prepare the request
  let width = Math.floor(Math.random() * 2000) + 1000;
  let height = Math.floor(Math.random() * 1000) + 1000;
  const url = `https://dummyjson.com/auth/image/${width}x${height}`;
  const request = new Request(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  fetch(request)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) throw new Error('Bad dog');
      return response.blob();
    })
    .then((blob) => {
      let img = document.querySelector('main img');
      const src = URL.createObjectURL(blob);
      console.log(src);
      img.src = src;
      main.classList.remove('loading');
      main.removeChild(spinner);
    })
    .catch((err) => {
      console.warn(err.message);
      main.classList.remove('loading');
      main.removeChild(spinner);
      main.querySelector('img').src = 'img/placeholder.png';
      main.innerHTML += 'Tell your developer to think harder.';
    });
}

function storeData(key, value) {
  //insert or update a value in sessionStorage
}

function readData(key) {
  //read and return a value from sessionStorage
}
