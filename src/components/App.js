import React from 'react'
import MainPanel from './MainPanel'
import Profile from './Profile'

const App = () => (
  <div className='container body'>
    <div className='left-panel'>
      <Profile
        name='name'
        username='username'
        numTweets={1}
        numFollowers={2}
        numFollowings={3}
        isOwnProfile={false}
        isFollowing={false}
        toggleFollow={() => console.log('eiei click me tum mai')}
      />
    </div>
    <MainPanel enableTweet/>
  </div>
)

export default App
