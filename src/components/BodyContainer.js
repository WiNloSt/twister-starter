import React from 'react'
import MainPanel from './MainPanel'
import Profile from './Profile'

import * as api from '../api'

class BodyContainer extends React.Component {
  static propTypes = {
    pageUsername: React.PropTypes.string,
    pageName: React.PropTypes.string
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
    const toggleFollowState = () =>
      this.setState(prevState => ({
        isFollowing: !prevState.isFollowing
      }))

    if (this.state.isFollowing) {
      api.unfollow(this.props.pageUsername, this.state.username)
        .catch(toggleFollowState)
    } else {
      api.follow(this.props.pageUsername, this.state.username)
        .catch(toggleFollowState)
    }

    toggleFollowState()
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
    const name = this.props.pageUsername ? this.props.pageName : this.state.name
    const username = this.props.pageUsername || this.state.username

    return (
      <div className='container body'>
        <div className='left-panel'>
          <Profile
            name={name}
            username={username}
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
          enableTweet={username === this.state.username} />
      </div>
    )
  }
}

export default BodyContainer
