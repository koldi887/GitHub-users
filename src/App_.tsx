import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import { Users } from "./components/Users";
import { UserProfile } from "./components/UserProfile";
import { Search } from "./components/Search";

export interface ISearchUser {
  login: string;
  id: number;
}

export interface IUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface ISearchResult {
  items: IUser[];
}

export const App_ = () => {
  const [selectedUser, setSelectedUser] = useState<ISearchUser | null>(null);
  const [search, setSearch] = useState<string>("lukso");

  useEffect(() => {
    if (selectedUser !== null) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  return (
    <div className={classes.AppContainer}>
      <div>
        <Search search={search} setSearch={setSearch} />
        <Users
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          search={search}
        />
      </div>
      <UserProfile selectedUser={selectedUser} />
    </div>
  );
};
