import React from 'react'

import Comment from '../Comment'
import {Block} from '../Layouts'
import Title from '../Title'

const Comments = ({
  items,
  onDeleteComment,
  onDeleteReply
}) => {
  const sortedComments = items.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    } else if (a.createdAt < b.createdAt) {
      return 1
    } else {
      return 0
    }
  })

  const comments = sortedComments.map(i =>
    <Comment key={i._id} item={i} onDeleteComment={onDeleteComment} onDeleteReply={onDeleteReply} />
  )

  return (
    <div>
      <Block>
        <Title label="Comments" />
      </Block>

      {comments}
    </div>
  )
}

export default Comments
