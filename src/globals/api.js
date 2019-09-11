import { apiDomain, apiRelativePath } from './constants';

export function submit(url, token, method, data) {
  console.log('globals api submit')
  const request = {
    method,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    request.body = JSON.stringify(data);
  }
  console.log('This is the API call that will be made: url %s, method %s', url, method);
  console.dir(request.body);  
  console.log('token: %s', token);


  return fetch(url, request)
  .then((response) => {
    if (!response.ok) {  // All http.2xx responses
      throw Error(response.statusText);
    }
    return response;
  })
  .then((response) => {
    return response.json();
  });
}


// =================== BORROWER API ======================

// This is the backdoor!!
export function mockLogin({ payload: { isBorrower, kt } }) {
  const apiPath = isBorrower ? apiRelativePath.devLoginB : apiRelativePath.devLoginI;  
  const url = apiDomain() + apiPath + kt;  
  const request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(url, request)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  })
  .then((response) => {
    return response.json()
  });
}

