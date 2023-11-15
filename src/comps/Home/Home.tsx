import { useState } from "react";
import { CreateUser } from "../CreateUser"
import { UsersList } from "../UsersList"
import { useGetUsersQuery } from "../../store/api/usersApi"

export const Home = () => {
  const { refetch } = useGetUsersQuery({})
  const [displayedComponent, setDisplayedComponent] = useState("UsersList");

  return (
    <>
      <h2>Cross-Platform Lab - CRUD Web App</h2>
      <button onClick={() => setDisplayedComponent("CreateUser")}>Create User</button>
      <button onClick={() => setDisplayedComponent("UsersList")}>Users List</button>
      <button onClick={() => refetch()}>Refresh</button>

      {displayedComponent === "CreateUser" && <CreateUser />}
      {displayedComponent === "UsersList" && <UsersList />}
    </>
  )
}
