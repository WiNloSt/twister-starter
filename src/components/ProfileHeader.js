import React from 'react'

const ProfileHeader = ({name, username}) => (
  <div className='header'>
    <a href='#me'>
      <div className='name'>{name}</div>
    </a>
    <a href='#me'>
      <div className='screen-name'>@{username}</div>
    </a>
  </div>
)

ProfileHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired
}

export default ProfileHeader
