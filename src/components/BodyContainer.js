import React from 'react'
import MainPanel from './MainPanel'
import Profile from './Profile'

import * as api from '../api'

class BodyContainer extends React.Component {
  static propTypes = {
    pageUsername: React.PropTypes.string,
    pageName: React.PropTypes.string,
    enableTweet: React.PropTypes.bool
  }

  state = {
    username: 'kelvin',
    name: 'Kelvin ja',
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
    const pageUsername = this.props.pageUsername || this.state.username
    const filter = {
      where: {
        username: pageUsername
      }
    }
    api.fetchTweets(filter)
      .then(tweets =>
        this.setState(() => ({
          tweets
        }))
      )

    api.fetchProfile(pageUsername)
      .then(profile => this.setState(prevState => ({
        numFollowers: profile.numFollowers,
        numFollowings: profile.numFollowings
      })))

    api.fetchFollowStatus(pageUsername, this.state.username)
      .then(isFollowing => this.setState(prevState => ({
        isFollowing
      })))
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
            name={this.props.pageName}
            username={this.props.pageUsername}
            numTweets={tweets.length}
            numFollowers={numFollowers}
            numFollowings={numFollowings}
            isOwnProfile={this.state.username === this.props.pageUsername}
            isFollowing={isFollowing}
            toggleFollow={this.toggleFollow}
          />
        </div>
        <MainPanel
          tweets={this.state.tweets}
          name={this.state.name}
          username={this.state.username}
          addNewTweet={this.addNewTweet}
          enableTweet={this.props.enableTweet} />
      </div>
    )
  }
}

export default BodyContainer
