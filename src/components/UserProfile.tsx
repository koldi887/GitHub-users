import React, { useEffect, useState } from "react";
import classes from "../App.module.css";
import { ISearchResult, ISearchUser, IUser } from "../App_";
import axios from "axios";
import { Timer } from "./Timer";
import PreLoader from "./Preloader/Preloader";

interface IUserProfileProps {
  selectedUser: ISearchUser | null;
}

export const UserProfile: React.FC<IUserProfileProps> = ({ selectedUser }) => {
  const startTimerValue = 10;
  const [userData, setUserData] = useState<IUser | null>(null);
  const [seconds, setSeconds] = useState<number>(startTimerValue);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 0) {
      setUserData(null);
    }
  }, [seconds]);

  useEffect(() => {
    if (!!selectedUser) {
      setIsFetching(true);
      axios
        .get<ISearchResult>(
          `https://api.github.com/search/users?q=${selectedUser.login}`
        )
        .then((response) => {
          setSeconds(startTimerValue);
          setIsFetching(false);
          setUserData(response.data.items[0]);
        });
    }
  }, [selectedUser]);

  if (isFetching) return <PreLoader />;
  return (
    <>
      {userData && (
        <div className={classes.userBlock}>
          <Timer
            onSecondChange={setSeconds}
            seconds={seconds}
            timerKey={userData.id}
          />
          {userData.login}
          <img className={classes.userImg} src={userData.avatar_url} alt="" />
          {userData.id}
        </div>
      )}
    </>
  );
};
