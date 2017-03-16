import React from 'react'
import TweetList from './TweetList'
import NewTweet from './NewTweet'

class MainPanel extends React.Component {
  static propTypes = {
    enableTweet: React.PropTypes.bool,
    tweets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    name: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    addNewTweet: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='main-panel'>
        {
          this.props.enableTweet
            ? <NewTweet
              name={this.props.name}
              username={this.props.username}
              addNewTweet={this.props.addNewTweet}
            /> : ''
        }
        <TweetList tweets={this.props.tweets} />
      </div>
    )
  }
}

export default MainPanel
