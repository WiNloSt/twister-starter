import React from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'
import * as api from '../api'

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      username: 'kelvin',
      name: 'Mahatthana Nomsawadi'
    }
    this.addNewTweet = this.addNewTweet.bind(this)
  }

  componentDidMount() {
    const filter = {
      where: {
        username: this.state.username
      }
    }
    api.fetchTweets(filter)
      .then(tweets =>
        this.setState(() => ({
          tweets
        }))
      )
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
