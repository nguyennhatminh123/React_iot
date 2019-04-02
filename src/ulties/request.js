function formatQueryParams(params) {
    return Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    return parseJSON(response).then(responseFormatted => {
      const error = new Error(response.statusText);
      error.response = response;
      error.status = response.status;
      error.response.payload = responseFormatted;
      throw error;
    });
  }
    
  function parseJSON(response) {
    return response.json ? response.json() : response;
  }
  
  function serverRestartWatcher(response) {
    return new Promise((resolve, reject) => {
      fetch(`${window.app.apiUrl}/_health`, {
        method: "HEAD",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Keep-Alive": false
        }
      })
        .then(() => {
          resolve(response);
        })
        .catch(err => {
          setTimeout(() => {
            return serverRestartWatcher(response).then(resolve);
          }, 100);
        });
    });
  }
    

export default async function request(
    url,
    options = {},
    shouldWatchServerRestart = false
  ) {
    // Set headers
    options.headers = Object.assign(
      {
        "Content-Type": "application/json"
      },
      options.headers
    );
  
    if (options && options.params) {
      const params = formatQueryParams(options.params);
      url = `${url}?${params}`;
    }
  
    // Stringify body object
    if (options && options.body) {
      options.body = JSON.stringify(options.body);
    }
  
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          if (shouldWatchServerRestart) {
            return serverRestartWatcher(response);
          }
          if (response.error) {
            return reject(response);
          }
          resolve(response)
        })
        .catch(e => {
          console.log(e)
        })
    });
  }