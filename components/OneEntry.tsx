import React, { useContext } from "react";

import { entryType, OneEntryContext } from "./Diary";

type oneEntryType = {
  entry: entryType;
};

export const OneEntry: React.FC<oneEntryType> = ({ entry }) => {
  const context = useContext(OneEntryContext);

  return (
    <div>
      <div className={"text-3xl"}>
        {entry.changed ? (
          <div>
            <span className={"underline"}>{entry.timeOfChange}</span>
            <span className={"text-sm"}> (Changed)</span>
          </div>
        ) : (
          <div className={"underline"}>{entry.time}</div>
        )}
      </div>
      <div className={"text-2xl whitespace-pre-wrap mt-5"}>{entry.text}</div>
      <div className={"flex justify-end"}>
        <button
          className={"blinkingUnderline text-2xl mt-5"}
          onClick={() => context.setShowEntry(false)}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default OneEntry;
