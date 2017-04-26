import React, { Component } from 'react'
import uuid from 'uuid'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: Object.assign({}, props.user, {
        retweets: [],
        favourites: []
      }),
      openText: false,
      usernameToReply: '',
      messages: [{
        id: uuid.v4(),
        text: 'Mensaje del tweet',
        picture: props.user.photoURL,
        displayName: props.user.displayName,
        username: props.user.email.split('@')[0],
        date: Date.now() - 180000,
        retweets: 0,
        favourites: 0
      }, {
        id: uuid.v4(),
        text: 'Este es un nuevo mensaje',
        picture: props.user.photoURL,
        displayName: props.user.displayName,
        username: props.user.email.split('@')[0],
        date: Date.now() - 1800000,
        retweets: 0,
        favourites: 0
      }]
    }
    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleReplyTweet = this.handleReplyTweet.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavourite = this.handleFavourite.bind(this)
  }

  handleOpenText(event) {
    event.preventDefault()
    this.setState({
      openText: true,
      usernameToReply: ''
    })
  }

  handleCloseText(event) {
    event.preventDefault()
    this.setState({
      openText: false
    })
  }

  handleSendText(event) {
    event.preventDefault()
    const newMessage = {
      id: uuid.v4(),
      text: event.target.text.value,
      picture: this.props.user.photoURL,
      displayName: this.props.user.displayName,
      username: this.props.user.email.split('@')[0],
      date: Date.now(),
      retweets: 0,
      favourites: 0
    }
    this.setState({
      messages: this.state.messages.concat(newMessage),
      openText: false
    })
  }

  handleReplyTweet(messageId, usernameToReply) {
    this.setState({
      openText: true,
      usernameToReply
    })
  }

  handleRetweet(messageId) {
    const alreadyRetweeted = this.state.user.retweets.filter(fav => fav === messageId)

    if (alreadyRetweeted.length === 0) {
      const messages = this.state.messages.map(msg => {
        if (msg.id === messageId) {
          msg.retweets += 1
        }
        return msg
      })

      const user = Object.assign({}, this.state.user)
      user.retweets.push(messageId)

      this.setState({
        messages,
        user,
      })
    }
  }

  handleFavourite(messageId) {
    const alreadyFavourited = this.state.user.favourites.filter(fav => fav === messageId)

    if (alreadyFavourited.length === 0) {
      const messages = this.state.messages.map(msg => {
        if (msg.id === messageId) {
          msg.favourites += 1
        }
        return msg
      })

      const user = Object.assign({}, this.state.user)
      user.favourites.push(messageId)

      this.setState({
        messages,
        user,
      })
    }
  }

  renderOpenText() {
    if (this.state.openText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onReplyTweet={this.handleReplyTweet}
          onRetweet={this.handleRetweet}
          onFavourite={this.handleFavourite}
        />
      </div>
    )
  }
}

export default Main
