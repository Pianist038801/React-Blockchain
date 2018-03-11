import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'

class TermsUse extends Component {
  renderContent() {
    return (
      <div className="container">
        <PageTitle title="Terms of Use" type="type2"/>
        <ContentCard className="static-page">
          <h3 className="content-title">1. Terms</h3>
          <p>By accessing the website at <a href="http://appii.io">appii.io</a>, you are agreeing to be bound by these
            terms of use, all applicable laws and regulations, and agree that you are responsible for compliance with
            any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or
            accessing this site. The materials contained in this website are protected by applicable copyright and
            trademark law.</p>
          <h3 className="content-title">2. Use License</h3>
          <ul type="disc" className="list-disc">
            <li>Permission is granted to temporarily download one copy of the materials (information or software) on
              APPII Pty Ltd&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may not:
              <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or
                  non-commercial);
                </li>
                <li>attempt to decompile or reverse engineer any software contained on APPII Pty Ltd&apos;s website;
                </li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.
                </li>
              </ul>
            </li>
            <li>This license shall automatically terminate if you violate any of these restrictions and may be
              terminated by APPII Pty Ltd at any time. Upon terminating your viewing of these materials or upon the
              termination of this license, you must destroy any downloaded materials in your possession whether in
              electronic or printed format.
            </li>
          </ul>
          <h3 className="content-title">3. Disclaimer</h3>
          <ul className="list-disc">
            <li>The materials on APPII Pty Ltd&apos;s website are provided on an &apos;as is&apos; basis. APPII Pty Ltd
              makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a particular
              purpose, or non-infringement of intellectual property or other violation of rights.
            </li>
            <li>Further, APPII Pty Ltd does not warrant or make any representations concerning the accuracy, likely
              results, or reliability of the use of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </li>
          </ul>
          <h3 className="content-title">4. Limitations</h3>
          <p>In no event shall APPII Pty Ltd or its suppliers be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or
            inability to use the materials on APPII Pty Ltd&apos;s website, even if APPII Pty Ltd or a APPII Pty Ltd
            authorised representative has been notified orally or in writing of the possibility of such damage.
            Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for
            consequential or incidental damages, these limitations may not apply to you.
          </p>
          <h3 className="content-title">5. Accuracy of materials</h3>
          <p>The materials appearing on APPII Pty Ltd&apos;s website could include technical,
            typographical, or photographic
            errors. APPII Pty Ltd does not warrant that any of the materials on its website are accurate, complete or
            current. APPII Pty Ltd may make changes to the materials contained on its website at any time without
            notice. However APPII Pty Ltd does not make any commitment to update the materials.</p>
          <h3 className="content-title">6. Links</h3>
          <p>APPII Pty Ltd has not reviewed all of the sites linked to its website and is not responsible for the
            contents of any such linked site. The inclusion of any link does not imply endorsement by APPII Pty Ltd of
            the site. Use of any such linked website is at the user&apos;s own risk.</p>
          <h3 className="content-title">7. Modifications</h3>
          <p>APPII Pty Ltd may revise these terms of use for its website at any time without notice. By using this
            website you are agreeing to be bound by the then current version of these terms of service.</p>
          <h3 className="content-title">8. Governing Law</h3>
          <p>These terms and conditions are governed by and construed in accordance with the laws of United Kingdom and
            you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </ContentCard>
      </div>
    )
  }

  render() {
    const { hasLayout } = this.props

    if (hasLayout) {
      window.scrollTo(0, 0)
      return (
        <Layout>
          { this.renderContent() }
        </Layout>
      )
    }

    return this.renderContent()
  }
}

TermsUse.defaultProps = {
  hasLayout: true
}

TermsUse.propTypes = {
  hasLayout: PropTypes.bool
}

export default TermsUse
