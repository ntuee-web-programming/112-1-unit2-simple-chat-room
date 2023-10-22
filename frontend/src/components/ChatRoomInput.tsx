"use client";

import { MessagesContext } from "@/context/message";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const ChatRoomInput = () => {
  const { sendMessage } = useContext(MessagesContext);
  const { user } = useContext(UserContext);
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  if (!user) {
    router.push("/");
    return;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    sendMessage({ content, senderId: user.displayId });
    setContent("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="bg-black text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
};

export default ChatRoomInput;