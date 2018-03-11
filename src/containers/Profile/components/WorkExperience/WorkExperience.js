import React from 'react'
import PropTypes from 'prop-types'
import WorkExperienceItem from './components/WorkExperienceItem/'
import WorkItemEdit from './components/WorkItemEdit'

class WorkExperience extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blockIsEditing: false,
      addNew: false
    }
  }

  toggleBlockEditing = () => {
    this.setState({
      blockIsEditing: !this.state.blockIsEditing
    })
  }

  toggleAddNewItem = () => {
    this.setState({
      addNew: !this.state.addNew
    })
  }

  render() {
    const { editMode, jobs, reorder, industries, deleteWork, saveEntity, filterEntries, user } = this.props
    const { addNew } = this.state
    return(
      <section className="profile-experience-wrapper">
        {
          editMode &&
          <div className="profile-experience-block-btns">
            <button
              className="reorder-btn"
              onClick={this.props.toggleReorder}>&nbsp;</button>
            <button
              className="add-btn"
              onClick={this.toggleAddNewItem}
            >&nbsp;</button>
          </div>
        }
        <p className="profile-block-title">Work Experience</p>
        {!reorder &&
          <div>
            {editMode && addNew &&
              <WorkItemEdit
                toggleEdit={this.toggleAddNewItem}
                industries={industries}
                deleteWork={deleteWork}
                saveEntity={saveEntity}
                user={user}
              />
            }
            {
              jobs
              .filter(x => filterEntries(x))
              .sort((a, b) => {
                return new Date(b.end_date) - new Date(a.end_date)
              })
              .map((item, idx) => (
                <WorkExperienceItem
                  {...item}
                  editMode={editMode}
                  key={idx}
                  toggleBlockEditing={this.toggleBlockEditing}
                  industries={industries}
                  deleteWork={deleteWork}
                  saveEntity={saveEntity}
                  user={user}
                />
              ))
            }
          </div>
        }
      </section>
    )
  }
}

WorkExperience.propTypes = {
  editMode: PropTypes.bool,
  deleteWork: PropTypes.func.isRequired,
  jobs: PropTypes.array,
  reorder: PropTypes.bool,
  toggleReorder: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  industries: PropTypes.array,
  saveEntity: PropTypes.func.isRequired,
  filterEntries: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default WorkExperience
