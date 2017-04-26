import React, { Component } from 'react'
import moment from 'moment'

import styles from './message.css'

class Message extends React.Component {
  constructor() {
    super()
    this.state = {
      clickRetweet: false,
      clickFavourite: false
    }
    this.onClickRetweet = this.onClickRetweet.bind(this)
    this.onClickFavourite = this.onClickFavourite.bind(this)
  }

  onClickRetweet() {
    this.props.onRetweet()
    this.setState({
      clickRetweet: true
    })
  }

  onClickFavourite() {
    this.props.onFavourite()
    this.setState({
      clickFavourite: true
    })
  }

  render() {
    const dateFormat = moment(this.props.date).fromNow()

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <figure>
            <img
              className={styles.avatar}
              src={this.props.picture}
            />
          </figure>
          <span className={styles.displayName}>{this.props.displayName}</span>
          <span className={styles.username}>{this.props.username}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3>{this.props.text}</h3>
        <div className={styles.buttons}>
          <div
            className={styles.icon}
            onClick={this.props.onReplyTweet}
          >
            <span className="fa fa-reply"></span>
          </div>
          <div
            className={(this.state.clickRetweet ? styles.rtGreen : '')}
            onClick={this.onClickRetweet}
          >
            <span className="fa fa-retweet"></span>
            <span className={styles.num}>{this.props.retweets}</span>
          </div>
          <div
            className={(this.state.clickFavourite ? styles.favYellow : '')}
            onClick={this.onClickFavourite}
          >
            <span className="fa fa-star"></span>
            <span className={styles.num}>{this.props.favourites}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
