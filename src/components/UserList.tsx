import React, { useState, useEffect, useRef } from "react";
import { getUsernames } from "../utils";
import { List, ListRowRenderer } from "react-virtualized";
import Search from "./Search";
import AlphabetMenu from "./AlphabetMenu";
import UserListContainer from "./UserListContainer";
import { toast } from "react-toastify";

const NUMBER_OF_ITEMS_IN_LIST = 17;

const UserList: React.FC = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef<List>(null);

  useEffect(() => {
    async function fetchUsernames() {
      try {
        const fetchedUsernames = await getUsernames();
        setUsernames(fetchedUsernames);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setIsLoading(false);
      }
    }
    fetchUsernames();
  }, []);

  const scrollToLetter = async (letter: string, prevLetter?: string) => {
    await setSearchQuery("");
    const index = usernames.findIndex((name) => name.startsWith(letter));
    if (index !== -1 && listRef.current) {
      if (prevLetter && prevLetter < letter) {
        listRef.current.scrollToRow(
          index === 0 ? index : index + NUMBER_OF_ITEMS_IN_LIST
        );
      } else {
        listRef.current.scrollToRow(index);
      }
    } else {
      toast.error(`There are no words start with ${letter} letter`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsernames = usernames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyText = (copiedText: string) => {
    navigator.clipboard.writeText(copiedText).then(
      () => {
        toast.info(`Copied ${copiedText} to clipboard`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const renderRow: ListRowRenderer = ({ index, key, style }) => (
    <div
      key={key}
      style={style}
      className={index % 2 === 0 ? "list-item-even" : "list-item-odd"}
      onClick={() => handleCopyText(filteredUsernames[index])}
    >
      {filteredUsernames[index]}
    </div>
  );

  return (
    <>
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="user-list-container">
        <AlphabetMenu scrollToLetter={scrollToLetter} />
        <UserListContainer
          filteredUsernames={filteredUsernames}
          isLoading={isLoading}
          listRef={listRef}
          renderRow={renderRow}
        />
      </div>
    </>
  );
};

export default UserList;
