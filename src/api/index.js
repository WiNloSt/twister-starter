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

export const fetchProfile = username =>
  fetch(`${baseURL}/api/TwisterUsers/${username}`, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })

export const fetchFollowStatus = (username, followedUsername) => new Promise((resolve, reject) => {
  // Cannot follow oneself
  if (username === followedUsername) {
    resolve(false)
  }

  const uri = `${baseURL}/api/Follows/count?where={"username":"${username}","followedUsername":"${followedUsername}", "isFollowing": true}`

  fetch(uri, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      if (json.count === 0) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
    .catch(err => reject(err))
})

export const follow = (username, followedUsername) => new Promise((resolve, reject) => {
  const uri = `${baseURL}/api/Follows/upsertWithWhere?where={"username":"${username}", "followedUsername":"${followedUsername}"}`
  fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      username,
      followedUsername,
      isFollowing: true
    })
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(() => {
    resolve(true)
  })
  .catch(err => reject(err))
})

export const unfollow = (username, followedUsername) => new Promise((resolve, reject) => {
  const uri = `${baseURL}/api/Follows/upsertWithWhere?where={"username":"${username}","followedUsername":"${followedUsername}"}`
  fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      username,
      followedUsername,
      isFollowing: false
    })
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(() => {
    resolve(false)
  })
  .catch(err => reject(err))
})
