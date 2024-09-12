import React from 'react'
import { NavLink } from 'react-router-dom';

function Error() {
  return (
    <div>Error
      <NavLink to={'/home/letter-selection'}>Go Back--</NavLink>
    </div>
  )
}

export default Error;