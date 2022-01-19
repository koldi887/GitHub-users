import React, { useEffect, useState } from "react";
import classes from "../App.module.css";
import { ISearchResult, ISearchUser, IUser } from "../App_";
import axios from "axios";
import PreLoader from "./Preloader/Preloader";

interface IUsersProps {
  selectedUser: ISearchUser | null;
  setSelectedUser: (user: IUser) => void;
  search: string;
}

export const Users: React.FC<IUsersProps> = ({
  selectedUser,
  setSelectedUser,
  search,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get<ISearchResult>(`https://api.github.com/search/users?q=${search}`)
      .then((response) => {
        setIsFetching(false);
        setUsers(response.data.items);
      });
  }, [search]);

  if (isFetching) return <PreLoader />;
  return (
    <ul>
      {users.map((u) => (
        <li
          className={`${classes.selected} ${
            u.id === selectedUser?.id ? classes.active : ""
          }`}
          key={u.id}
          onClick={() => setSelectedUser(u)}
        >
          {u.login}
        </li>
      ))}
    </ul>
  );
};
