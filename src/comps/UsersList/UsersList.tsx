import { useDeleteUserMutation, useGetUsersQuery } from "../../store/api/usersApi"
import { EditUser } from "../EditUser"
import { useState } from "react"

export const UsersList = () => {
  const { data, isLoading, isError } = useGetUsersQuery({})
  const [editUser, setdisplayedEditUser] = useState<{ userId: any, userFirstName: any; userLastName: any } | undefined>();
  const [deleteUser] = useDeleteUserMutation()
  console.log("data: ", data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  const deleteHandler = (userId) => {
    deleteUser({
      userId: userId
    })

  }

  //const updateHandler = () => {
  //updateUser({
  //
  //})
  //}

  return (
    <>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button onClick={() => setdisplayedEditUser({ userId: user.id, userFirstName: user.firstName, userLastName: user.lastName })}>Edit</button>
                <button onClick={() => deleteHandler(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && <EditUser {...editUser} />}
    </>
  )
}
