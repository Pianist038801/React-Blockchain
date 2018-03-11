import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Avatar from 'components/Avatar'
import 'containers/UserVerifications/style.css'

const ListItem = (props) => {
  const { item } = props
  const name = `${item.user.first_name} ${item.user.last_name}`
  const date = (item.date) ? moment(item.date).format('DD/MM/YYYY') : ''
  const time = (item.time) ? moment(item.time).format('h:mm') : ''

  return (
    <tr className="VerificationItem">
      <td className="col-xs-12 col-md-2">
        <Avatar
          size="45"
          theme="blue"
          label={name}
          imageUrl={item.user.profile_image}
        />
      </td>
      <td className="col-xs-12 col-md-2 text-center">
        {date}
      </td>
      <td className="col-xs-12 col-md-4">
        {time}
      </td>
      <td className="col-xs-12 col-md-3">
        {item.location || ''}
      </td>
    </tr>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.object,
    date: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    time: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  })
}

export default ListItem
