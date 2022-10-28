/** @format */

import React from 'react';

export default function Header(props) {
  console.log(props);
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  );
}
