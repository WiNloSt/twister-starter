import React from 'react'
import MainPanel from './MainPanel'
import Profile from './Profile'

import * as api from '../api'

const nameMap = {
  kaizerwing: `P' Ping`,
  topscores: `P' Top`
}

class BodyContainer extends React.Component {
  static propTypes = {
    match: React.PropTypes.object
  }

  state = {
    username: 'topscores',
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
      api.unfollow(this.props.match.params.pageUsername, this.state.username)
        .catch(toggleFollowState)
    } else {
      api.follow(this.props.match.params.pageUsername, this.state.username)
        .catch(toggleFollowState)
    }

    toggleFollowState()
  }

  fetchData = (pageUsername) => {
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

  componentDidMount() {
    const pageUsername = this.props.match.params.pageUsername || this.state.username
    this.fetchData(pageUsername)
  }

  componentWillReceiveProps(nextProps) {
    const pageUsername = nextProps.match.params.pageUsername || this.state.username
    this.fetchData(pageUsername)
  }

  render() {
    const {
      tweets,
      numFollowers,
      numFollowings,
      isFollowing
    } = this.state
    const username = this.props.match.params.pageUsername || this.state.username
    const name = nameMap[username]

    return (
      <div className='container body'>
        <div className='left-panel'>
          <Profile
            name={name}
            username={username}
            numTweets={tweets.length}
            numFollowers={numFollowers}
            numFollowings={numFollowings}
            isOwnProfile={this.state.username === this.props.match.params.pageUsername}
            isFollowing={isFollowing}
            toggleFollow={this.toggleFollow}
          />
        </div>
        <MainPanel
          tweets={this.state.tweets}
          name={name}
          username={this.state.username}
          addNewTweet={this.addNewTweet}
          enableTweet={username === this.state.username} />
      </div>
    )
  }
}

export default BodyContainer
