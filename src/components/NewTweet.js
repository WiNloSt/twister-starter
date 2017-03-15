import React from 'react'

class NewTweet extends React.Component {
  state = {
    tweetText: ''
  }

  addNewTweet = () => {
    const tweetText = this.state.tweetText
    const { name, username, addNewTweet } = this.props
    addNewTweet({
      name,
      username,
      tweetText,
    })
    this.setState(prevState => ({
      tweetText: ''
    }))
  }

  handleOnChange = e => {
    const tweetText = e.target.value
    this.setState(prevState => ({
      tweetText
    }))
  }

  handleOnKeydown = e => {
    if (e.key === 'Enter') {
      this.addNewTweet()
      e.preventDefault()
    }
  }

  handleOnClick = () => {
    this.addNewTweet()
  }

  render() {
    return (
      <div className="new-tweet">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="tweet-text col-sm-10">
              <input
                type="text"
                id="tweetText"
                className="form-control"
                placeholder="What's happening"
                value={this.state.tweetText}
                onChange={this.handleOnChange}
                onKeyDown={this.handleOnKeydown}
              />
            </div>
            <div className="col-sm-2">
              <input type="button" className="btn btn-default" value="Tweet" onClick={this.handleOnClick} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

NewTweet.propTypes = {
  name: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  addNewTweet: React.PropTypes.func.isRequired,
}

export default NewTweet
