import React from 'react'

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <>
        <div role="alert">
          <p>Something went wrong:</p>
          <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    </>
  )
}

export default FallbackComponent