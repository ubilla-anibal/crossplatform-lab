import { useEffect, useState } from "react"
import { TextInput } from "../TextInput"
import styles from "./EditUser.module.css"
import { useEditUserMutation } from "../../store/api/usersApi"

export const EditUser = ({ userId, userFirstName, userLastName }) => {
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [id, setId] = useState(userId)

  const [editUser] = useEditUserMutation()
  const [feedback, setFeedback] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setId(userId);
    setFirstName(userFirstName);
    setLastName(userLastName);
  }, [userId, userFirstName, userLastName]);

  const saveHandler = () => {
    if (firstName !== "" && lastName !== "") {
      setFeedback(`User ${firstName} ${lastName} has been updated`)
      setSaved(true)

      editUser({
        userId: id,
        updatedUser: {
          firstName: firstName,
          lastName: lastName
        }
      })

      setId("");
      setFirstName("");
      setLastName("");

    } else {
      setSaved(false)
      setFeedback("Both fields have to be filled")
    }
    setTimeout(() => { setFeedback("") }, 2500)
  }

  return (
    <>
      <h2>Edit User</h2>
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
        <button onClick={saveHandler}>Saved</button>
      </div >
      <p style={{ color: saved ? "green" : "red" }}>{feedback}</p>
    </>
  )
}
