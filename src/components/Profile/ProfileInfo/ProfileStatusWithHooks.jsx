import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = ({statusProps, updateUserStatus}) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(statusProps);
  }, [statusProps]);

  const toggleEditMode = () => {
    if (editMode) {
      updateUserStatus(status || '');
    }
    setEditMode(!editMode);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ?
        (
          <div>
            <input
              autoFocus={true}
              value={status}
              onBlur={toggleEditMode}
              onChange={onStatusChange}/>
          </div>

        ) :
        (
          <div>
            <b>Status: </b><span onDoubleClick={toggleEditMode}>{status || 'No status'}</span>
          </div>
        )
      }
    </div>);

};

export default ProfileStatusWithHooks;