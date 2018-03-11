import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

const ListItem = (props) => {
  const { item, deleteAccreditation } = props
  const statusLabel = (item.enabled) ? 'Active' : 'Inactive'
  let qrCodeUrl = ROUTE_URL.orgAccreditationQRCode.replace(':orgId', item.organisation_id)
  qrCodeUrl = qrCodeUrl.replace(':id', item.id)
  let editUrl = ROUTE_URL.orgAccreditationEdit.replace(':orgId', item.organisation_id)
  editUrl = editUrl.replace(':id', item.id)
  let membersUrl = ROUTE_URL.orgAccreditationMembers.replace(':orgId', item.organisation_id)
  membersUrl = membersUrl.replace(':id', item.id)

  return (
    <tr className="row ListItem">
      <td className="col-xs-12 col-md-2">
        <p>{item.name}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{item.level}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{statusLabel}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{item.type}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{item.delivery_type}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p className="table-btn-holder">
          <Link to={qrCodeUrl} className="btn yellow-btn action-btn">
            QR code
          </Link>
        </p>
        <p className="table-btn-holder">
          <Link to={editUrl} className="btn blue-btn action-btn text-center">
            Edit
          </Link>
        </p>
        <p className="table-btn-holder">
          <button
            className="btn red-btn action-btn"
            onClick={() => {
              deleteAccreditation(item.id)
            }}
          >
            Delete
          </button>
        </p>
        <p className="table-btn-holder">
          <Link to={membersUrl} className="btn green-btn action-btn text-center">
            Members
          </Link>
        </p>
      </td>
    </tr>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
  deleteAccreditation: PropTypes.func.isRequired
}

export default ListItem
