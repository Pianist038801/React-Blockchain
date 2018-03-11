import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import List from './components/List'

class AccreditationQRCode extends Component {
  componentWillMount() {
    const { orgId, id } = this.props.match.params
    this.props.fetch({ orgId, id })
  }

  render() {
    const { pending, name, userAwards } = this.props.orgAccreditation
    if (pending === 'fetching') {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }
    const title = `Verifications for ${name}`

    return (
      <Layout>
        <div className="container">
          <PageTitle type="type2">
            <span>{title}</span>
          </PageTitle>
          <div className="row">
            <ContentCard title="Verifications">
              <List data={userAwards} />
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
    userAwards: PropTypes.array,
    pending: PropTypes.string
  })
}

export default AccreditationQRCode
