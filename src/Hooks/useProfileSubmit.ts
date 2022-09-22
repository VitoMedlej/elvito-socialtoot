import React, {FormEvent, useContext, useEffect} from 'react'
import {ChangeEvent} from 'react';
import {UserContext} from '../../pages/_app';

const defaultValues = {
    name: '',
    bio: ''
}
const useProfileSubmit = () => {
    const {user, setUser} = useContext(UserContext);

    const [warning,
        setWarning] = React.useState('');
    const [value,
        setValue] = React.useState(defaultValues);
    const handleChange = (e : ChangeEvent < HTMLInputElement | HTMLTextAreaElement >) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {

        if (warning) {
          setTimeout(() => {
              setWarning('')
          }, 2000);
        }
  
      },[warning])
    const handleProfileSubmit = async(e:FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        try {

            let {name, bio} = value
            if (name.length !== 0 && name.length < 4) {
                setWarning('Your name should be taller than your height (+3 letters)')
                return
            }
            if (bio.length !== 0 && bio.length < 10) {
                setWarning('Is this all you gonna write in your bio? add more')
                return
            }
            const updatedBio = bio.length > 10
                ? bio
                : user.bio;
            const updatedName = name.length > 3
                ? name
                : user.bio;

           const req= await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/update-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: updatedName, bio: updatedBio, _id: user._id})
            })
            const res = await req.json()
            
            if (!res.success) {
            setWarning('Failed to update profile')
            return
            }

            const newUser = {
                ...user,
                bio: updatedBio,
                name: updatedName
            }
            setUser(newUser)
            localStorage.setItem('LocalUser', JSON.stringify(newUser))
            setValue(defaultValues)
            setWarning('Profile Updated, I look like an error coz the dev is lazy, just close this modal')
            } catch (err) {
            console.log(err)
        }
    }

    return {handleProfileSubmit, warning, value, handleChange}
}

export default useProfileSubmit