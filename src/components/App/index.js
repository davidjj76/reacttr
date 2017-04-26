import React, { Component } from 'react'
import 'normalize-css'

import Header from '../Header'
import Main from '../Main'
import styles from './app.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        photoURL: 'https://pbs.twimg.com/profile_images/1831915227/96906236445bdd4662ac5a.jpg',
        email: 'davidjj76@gmail.com',
        displayName: 'David Jiménez',
      }
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Main user={this.state.user} />
      </div>
    )
  }
}

export default App
