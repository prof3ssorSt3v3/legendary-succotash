(() => {
  //init function
  //generate a loader from a template
  const honeycomb = (() => {
    let temp = document.querySelector('#honeycomb');
    let spinner = temp.content.cloneNode(true); // documentFragment
    return spinner.firstElementChild; //html inside the fragment
  })();
  fetchImage(honeycomb);
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

function fetchImage(spinner) {
  //use fetch to get an image
  //if a spinner is provided show before fetch and remove after
}

function storeData(key, value) {
  //insert or update a value in sessionStorage
}

function readData(key) {
  //read and return a value from sessionStorage
}
