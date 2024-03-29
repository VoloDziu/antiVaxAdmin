import React from 'react'
import Time from 'react-time'

import styles from './Comment.css'
import {Block, Flex, ListInline, ListInlineItem} from '../Layouts'
import {Button} from '../UI'

const Reply = ({
  item,
  onDeleteReply,
  commentId,
  commentIsDeleted
}) => {
  let actions = ''
  if (item.isDeleted) {
    actions = (
      <ListInline>
        <ListInlineItem>
          <div className={styles.Reply__deleteInfo}>
            reply will be deleted on save
          </div>
        </ListInlineItem>

        <ListInlineItem>
          <Button small
            inverse
            theme="accent1"
            disabled={commentIsDeleted}
            onClick={() => onDeleteReply(item._id, commentId)}>Put back</Button>
        </ListInlineItem>
      </ListInline>
    )
  } else {
    actions = (
      <Button small
        inverse
        theme="error"
        disabled={commentIsDeleted}
        onClick={() => onDeleteReply(item._id, commentId)}>Delete</Button>
    )
  }

  return (
    <div className={`${styles.Reply} ${item.isDeleted ? styles.Reply_deleted : ''}`}>
      <Block n={0.5}>
        <Flex justifyContent="space-between">
          <div className={styles.Reply__info}>Posted by {item.lastModifiedBy} on <Time value={item.createdAt} format="MMMM Do YYYY (h:mm a)" /></div>

          {actions}
        </Flex>
      </Block>

      <div
        className={styles.Reply__body}
        dangerouslySetInnerHTML={{__html: item.content}} />
    </div>
  )
}

const Comment = ({
  item,
  onDeleteComment,
  onDeleteReply
}) => {
  const sortedReplies = item.replies.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    } else if (a.createdAt < b.createdAt) {
      return 1
    } else {
      return 0
    }
  })

  const replies = sortedReplies.map(r =>
    <Reply key={r._id} commentId={item._id} item={r} onDeleteReply={onDeleteReply} commentIsDeleted={item.isDeleted} />
  )

  let actions = ''
  if (item.isDeleted) {
    actions = (
      <ListInline>
        <ListInlineItem>
          <div className={styles.Comment__deleteInfo}>
            comment will be deleted on save
          </div>
        </ListInlineItem>

        <ListInlineItem>
          <Button small
            inverse
            theme="accent1"
            onClick={() => onDeleteComment(item._id)}>Put back</Button>
        </ListInlineItem>
      </ListInline>
    )
  } else {
    actions = (
      <Button small
        inverse
        theme="error"
        onClick={() => onDeleteComment(item._id)}>Delete</Button>
    )
  }

  return (
    <div className={`${styles.Comment} ${item.isDeleted ? styles.Comment_deleted : ''}`}>
      <div className={styles.Comment__comment}>
        <Block n={0.5}>
          <Flex justifyContent="space-between">
            <div className={styles.Comment__info}>Posted by {item.lastModifiedBy} on <Time value={item.createdAt} format="MMMM Do YYYY (h:mm a)" /></div>

            {actions}
          </Flex>
        </Block>

        <Block n={1}>
          <div
            className={styles.Comment__body}
            dangerouslySetInnerHTML={{__html: item.content}} />
        </Block>

        <div className={styles.Comment__replies}>
          {replies}
        </div>
      </div>
    </div>
  )
}

export default Comment
