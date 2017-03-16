import React from 'react'
import classNames from 'classnames'

const ProfileFollow = ({
  isFollowing,
  handleToggleFollow
}) => (
  <div className='action last-section'>
    <button
      onClick={handleToggleFollow}
      type='button'
      className={classNames('btn btn-lg', isFollowing ? 'btn-danger' : 'btn-default')}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  </div>
)

ProfileFollow.propTypes = {
  isFollowing: React.PropTypes.bool,
  handleToggleFollow: React.PropTypes.func
}

export default ProfileFollow
