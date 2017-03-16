import config from '../config'

const { api } = config
const baseURL = `http://${api.host}:${api.port}`

export const addNewTweet = newTweet =>
  fetch(baseURL + '/api/Tweets', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(newTweet)
  })
  .then(res => res.json())

export const fetchTweets = filter =>
  fetch(baseURL + '/api/Tweets' + (filter ? '?filter=' + JSON.stringify(filter) : ''))
    .then(res => res.json())
