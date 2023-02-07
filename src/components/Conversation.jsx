import React from 'react';
import RenameButton from './RenameButton';
import DeleteButton from './DeleteButton';

export default function Conversation({
  id,
  parentMessageId,
  convo,
  convoHandler,
  title = 'New conversation'
}) {
  return (
    <a
      onClick={() => convoHandler(id, parentMessageId)}
      className="animate-flash group relative flex cursor-pointer items-center gap-3 break-all rounded-md bg-gray-800 py-3 px-3 pr-14 hover:bg-gray-800"
    >
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
        {title}
      </div>
      <div className="visible absolute right-1 z-10 flex text-gray-300">
        <RenameButton />
        <DeleteButton />
      </div>
    </a>
  );
}
