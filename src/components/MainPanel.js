import React from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'
import * as api from '../api'

class MainPanel extends React.Component {
  static propTypes = {
    enableTweet: React.PropTypes.bool
  }

  state = {
    tweets: [],
    username: 'kelvin',
    name: 'Mahatthana Nomsawadi'
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

  addNewTweet = (newTweet) => {
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
        {
          this.props.enableTweet ?
            <NewTweet
              name={this.state.name}
              username={this.state.username}
              addNewTweet={this.addNewTweet}
            /> : ''
        }
        <TweetList tweets={this.state.tweets} />
      </div>
    )
  }
}

export default MainPanel
