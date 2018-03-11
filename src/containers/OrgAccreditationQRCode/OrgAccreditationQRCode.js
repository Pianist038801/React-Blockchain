import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import './style.css'

class AccreditationQRCode extends Component {
  componentWillMount() {
    const { orgId, id } = this.props.match.params
    this.props.fetch({ orgId, id })
  }

  render() {
    const { pending, name, qrCode } = this.props.orgAccreditation
    if (pending === 'fetching') {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    return (
      <Layout>
        <div className="container OrgAccreditationQRCode">
          <PageTitle title={name} />
          <div className="row">
            <ContentCard className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="text-center">
                <img src={qrCode} alt={name} />
              </div>
            </ContentCard>
          </div>
        </div>
      </Layout>
    )
  }
}

AccreditationQRCode.propTypes = {
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  orgAccreditation: PropTypes.shape({
    name: PropTypes.string,
    qrCode: PropTypes.string,
    pending: PropTypes.string
  })
}

export default AccreditationQRCode
