import { createApi } from "@reduxjs/toolkit/query/react";
import { db } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case "GET":
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };

    case "POST":
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    case "DELETE":
      await deleteDoc(doc(db, url));
      return { data: {} };

    case "PUT": // Using PUT for full update, but PATCH could also be used for partial updates
      await setDoc(doc(db, url), body);
      return { data: { id: url, ...body } };

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["users"],
  endpoints: (builder) => ({

    //POST query
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: "",
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"]
    }),

    //GET query
    getUsers: builder.query({
      query: () => ({
        baseUrl: "",
        url: "users",
        method: "GET",
        body: "",
      }),
      providesTags: ["users"]
    }),

    // DELETE query
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        baseUrl: "",
        url: `users/${userId}`,
        method: "DELETE",
        body: "",
      }),
      invalidatesTags: ["users"],
    }),

    // EDIT query (using PUT for full update, but PATCH could also be used for partial updates)
    editUser: builder.mutation({
      query: ({ userId, updatedUser }) => ({
        baseUrl: "",
        url: `users/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["users"],
    }),

  }),
});

export const { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation, useEditUserMutation } = usersApi;
