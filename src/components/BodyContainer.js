import React from 'react'
import MainPanel from './MainPanel'
import Profile from './Profile'

import * as api from '../api'

class BodyContainer extends React.Component {
  static propTypes = {
    ownerUsername: React.PropTypes.string,
    enableTweet: React.PropTypes.bool
  }

  state = {
    username: 'kelvin',
    name: 'Mahatthana Nomsawadi',
    tweets: [],
    numFollowers: 0,
    numFollowings: 0,
    isFollowing: false
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

  toggleFollow = () => {
    this.setState(prevState => ({
      isFollowing: !prevState.isFollowing
    }))
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

  render() {
    const {
      tweets,
      numFollowers,
      numFollowings,
      isFollowing
    } = this.state

    return (
      <div className='container body'>
        <div className='left-panel'>
          <Profile
            name='name'
            username='username'
            numTweets={tweets.length}
            numFollowers={numFollowers}
            numFollowings={numFollowings}
            isOwnProfile={false}
            isFollowing={isFollowing}
            toggleFollow={this.toggleFollow}
          />
        </div>
        <MainPanel
          tweets={this.state.tweets}
          name={this.state.name}
          username={this.state.username}
          addNewTweet={this.addNewTweet}
          enableTweet />
      </div>
    )
  }
}

export default BodyContainer
