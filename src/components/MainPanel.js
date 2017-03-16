import React from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'
import * as api from '../api'

const tweets = [
  {
    id: 0,
    name: 'Proyood ChanOlala',
    username: 'Prayood-Naruk',
    tweetText: 'roa ja tum tarm sun ya'
  }, {
    id: 1,
    name: 'Tolaer Jung',
    username: 'NatKungzInwZa007',
    tweetText: 'Pim Thai Mai dai ka'
  }
]

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets,
      username: 'kelvin',
      name: 'Mahatthana Nomsawadi'
    }
    this.addNewTweet = this.addNewTweet.bind(this)
  }

  addNewTweet(newTweet) {
    api.addNewTweet(newTweet)
      .then(newTweet =>
        this.setState(prevState => ({
          tweets: [
            ...prevState.tweets,
            {
              ...newTweet,
              id: prevState.tweets.length
            }
          ]
        })))
  }

  render() {
    return (
      <div className='main-panel'>
        <NewTweet
          name={this.state.name}
          username={this.state.username}
          addNewTweet={this.addNewTweet}
        />
        <TweetList tweets={this.state.tweets} />
      </div>
    )
  }
}

export default MainPanel
