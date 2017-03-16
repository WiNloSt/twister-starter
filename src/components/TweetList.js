import React from 'react'
import Tweet from './Tweet'

const TweetList = ({ tweets }) => (
  <div className='tweet-list'>
    {
      tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))
    }
  </div>
)

TweetList.propTypes = {
  tweets: React.PropTypes.arrayOf(React.PropTypes.object)
}

TweetList.defaultProps = {
  tweets: []
}

export default TweetList
