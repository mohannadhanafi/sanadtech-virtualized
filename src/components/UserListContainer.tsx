import React, { Ref } from "react";
import { List, ListRowRenderer } from "react-virtualized";
import Placeholder from "./Placeholder";
import AutoSizer from "react-virtualized-auto-sizer";

interface UserListContainerProps {
  filteredUsernames: string[];
  isLoading: boolean;
  listRef: Ref<List>;
  renderRow: ListRowRenderer;
}

const UserListContainer: React.FC<UserListContainerProps> = ({
  filteredUsernames,
  isLoading,
  listRef,
  renderRow,
}) => (
  <div className="user-list">
    {isLoading ? (
      <Placeholder />
    ) : filteredUsernames.length === 0 ? (
      <div className="no-results">No results found</div>
    ) : (
<AutoSizer>
        {({ height, width }: any) => (
          <List
            ref={listRef}
            height={height}
            rowCount={filteredUsernames.length}
            rowHeight={40}
            width={width}
            rowRenderer={renderRow}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    )}
  </div>
);

export default UserListContainer;
