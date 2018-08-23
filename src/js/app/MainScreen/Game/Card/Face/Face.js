import React from 'react'

export function Face ({url}) {
  return <img src={url} onLoad={() => {console.log("Dadas")}}/>
}
