import { createContext } from 'react'

const SignedInContext = createContext({
  signedIn: false,
  setSignedIn: () => {},
})

export default SignedInContext;