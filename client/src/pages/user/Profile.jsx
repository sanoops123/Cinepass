import React from 'react'
import { useFetch } from '../../hooks/useFetch'

export const Profile = () => {

const [userProfile,isLoading] = useFetch('/user/profile')
console.log("userprofile====",userProfile);


  return (
    <div>Profile</div>
  )
}
