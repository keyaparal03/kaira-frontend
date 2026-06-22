import React from "react";

import {
  useSelector
} from "react-redux";

function ProfileSection() {

  const {
    user
  } = useSelector(
    (state:any)=>
      state.auth
  );

  return (

    <div className="profile-box">

      <h2>
        Personal Details
      </h2>

      <p>

        <strong>
          Name:
        </strong>

        {user?.name}

      </p>

      <p>

        <strong>
          Email:
        </strong>

        {user?.email}

      </p>

      {/* <p>

        <strong>
          Role:
        </strong>

        {user?.role}

      </p> */}

    </div>
  );
}

export default ProfileSection;