import React from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileDetail from './ProfileDetail'
import ProfileFollow from './ProfileFollow'

const Profile = props => (
  <div className='profile'>
    <ProfileHeader
      name={props.name}
      username={props.username}
    />
    <ProfileDetail
      numTweets={props.numTweets}
      numFollowers={props.numFollowers}
      numFollowings={props.numFollowings}
    />
    {
      props.isOwnProfile ? null : <ProfileFollow
        isFollowing={props.isFollowing}
        handleToggleFollow={props.toggleFollow}
      />
    }
  </div>
)

Profile.propTypes = {
  name: React.PropTypes.string,
  username: React.PropTypes.string,
  numTweets: React.PropTypes.number,
  numFollowers: React.PropTypes.number,
  numFollowings: React.PropTypes.number,
  isOwnProfile: React.PropTypes.bool,
  isFollowing: React.PropTypes.bool,
  toggleFollow: React.PropTypes.func
}

export default Profile
