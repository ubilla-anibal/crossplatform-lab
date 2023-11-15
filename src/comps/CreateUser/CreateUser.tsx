import { useState } from "react"
import { TextInput } from "../TextInput/TextInput"
import styles from "./CreateUser.module.css"
import { useCreateUserMutation } from "../../store/api/usersApi"

export const CreateUser = () => {
  const [createUser] = useCreateUserMutation()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const submitHandler = () => {
    if (firstName !== "" && lastName !== "") {
      console.log("User: ", firstName, lastName)
      setFeedback(`User ${firstName} ${lastName} has been created`)
      setFirstName("")
      setLastName("")
      setSubmitted(true)

      createUser({
        user: {
          firstName: firstName,
          lastName: lastName
        }
      })

    } else {
      setSubmitted(false)
      setFeedback("Both fields have to be filled")
    }
    setTimeout(() => { setFeedback("") }, 2500)
  }

  return (
    <>
      <h2>Create User</h2>
      <div className={styles.container}>
        <TextInput
          id="FirstName"
          value={firstName}
          placeholder="FirstName"
          onInput={(event) => setFirstName(event.target.value)}
        />
        <TextInput
          id="LastName"
          value={lastName}
          placeholder="LastName"
          onInput={(event) => setLastName(event.target.value)}
        />
        <button onClick={submitHandler}>Create</button>
      </div >
      <p style={{ color: submitted ? "green" : "red" }}>{feedback}</p>
    </>
  )
}
