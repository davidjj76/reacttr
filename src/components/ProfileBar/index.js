import React from 'react'

import styles from './profile-bar.css'

function ProfileBar(props) {
  return (
    <div className={styles.root}>
      <figure>
        <img className={styles.avatar} src={props.picture} />
      </figure>
      <span className={styles.username}>Hola @{props.username}!</span>
      <button onClick={props.onOpenText} className={styles.button}>
        <span className="fa fa-lg fa-edit"></span>
        Tweet!
      </button>
    </div>
  )
}

export default ProfileBar
