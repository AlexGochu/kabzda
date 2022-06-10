import React from 'react';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status});
    }
  }

  toggleEditMode = () => {
    this.setState((prevState) => {
      return {editMode: !prevState.editMode};
    }, () => {
      if (this.state.editMode === false) {
        this.props.updateUserStatus(this.state.status || '');
      }
    });
  };
  onStatusChange = (e) => {
    this.setState({status: e.currentTarget.value});
  };

  render() {
    return (
      <div>
        {this.state.editMode ?
          (
            <div>
              <input
                autoFocus={true}
                value={this.state.status}
                onBlur={this.toggleEditMode}
                onChange={this.onStatusChange}/>
            </div>

          ) :
          (
            <div>
              <span onDoubleClick={this.toggleEditMode}>{this.props.status || 'No status'}</span>
            </div>
          )
        }
      </div>);
  }
}

export default ProfileStatus;