import React from 'react'
import {connect} from 'react-redux'
import Time from 'react-time'

import Badge from '../Badge'
import {DirectoryEntry, DirectoryEntryTitle, DirectoryEntryInfo} from '../DirectoryEntry'
import {Block, ListInline, ListInlineItem, Flex} from '../Layouts'
import {Button} from '../UI'
import {updateQuestion, deleteQuestion} from '../../store/questionsActions'

class QuestionsDirectoryEntry extends React.Component {
  constructor (props) {
    super(props)

    this.markSeen = this.markSeen.bind(this)
    this.delete = this.delete.bind(this)
  }

  markSeen () {
    const {dispatch, item} = this.props
    const payload = {
      isSeen: !item.data.isSeen
    }

    dispatch(updateQuestion(item.data._id, payload))
  }

  delete () {
    const {dispatch, item} = this.props

    dispatch(deleteQuestion(item.data._id))
  }

  render () {
    const {item} = this.props

    return (
      <DirectoryEntry draft={!item.data.isSeen}>
        <Block n={0.5}>
          <Flex justifyContent="space-between" alignItems="center">
            <ListInline>
              <ListInlineItem>
                <Badge label={item.data.isSeen ? 'Seen' : 'New'}
                  theme={item.data.isSeen ? 'default' : 'Accent2'} />
              </ListInlineItem>

              <ListInlineItem>
                <DirectoryEntryInfo>Posted by {item.data.posterName} ({item.data.posterEmail}) on <Time value={item.data.createdAt} format="MMMM Do YYYY (h:mm a)" /></DirectoryEntryInfo>
              </ListInlineItem>
            </ListInline>

            <ListInline>
              {item.data.isSeen
              ? ''
              : <ListInlineItem>
                <Button small
                  disabled={item.isUpdating}
                  theme="accent1"
                  href={`mailto:${item.data.posterEmail}?subject=Reply to your questions on antivax&body=Reply to your question:\n ${item.data.question}`}>respond via email</Button>
              </ListInlineItem>
              }

              <ListInlineItem>
                <Button small
                  disabled={item.isUpdating}
                  inverse
                  theme="accent1"
                  onClick={this.markSeen}>{item.data.isSeen ? 'mark as new' : 'mark as seen'}</Button>
              </ListInlineItem>

              <ListInlineItem>
                <Button small
                  disabled={item.isUpdating || item.data.isPublished}
                  inverse
                  theme="error"
                  onClick={this.delete}>Delete</Button>
              </ListInlineItem>
            </ListInline>
          </Flex>
        </Block>

        <DirectoryEntryTitle>{item.data.question}</DirectoryEntryTitle>
      </DirectoryEntry>
    )
  }
}

export default connect()(QuestionsDirectoryEntry)
