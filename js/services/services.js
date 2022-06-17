const postData = async (url, data) => {
//ставимо await до початка метода fetch()
//оскільки потрібно дочекатись отримання promise
  const result = await fetch(url, {
    method: "POST",
    headers: {
    'Content-type': 'application/json'
    },
    body: data
    });

//ставимо await щоб вернути promise
//коли він буде готовий
  return await result.json();
};

const getRequest = async (url) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};

export {postData, getRequest};