import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="404">
      <h2>Page not found</h2>
      <p>
        <Link to='/'>Back to home</Link>
      </p>
    </div>
  )
}