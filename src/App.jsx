import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './components/Messages';
import TextChat from './components/TextChat';
import Nav from './components/Nav';
import MobileNav from './components/MobileNav';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
// const postRequest = async (url, { arg }) => await axios.post(url, { arg });

const App = () => {
  const messages = useSelector((state) => state.messages);
  const { data, error, isLoading, mutate } = useSWR('http://localhost:3050/convos', fetcher);

  return (
    <div className="flex h-screen">
      {/* <div className="w-80 bg-slate-800"></div> */}
      <Nav conversations={data} />
      {/* <div className="flex h-full flex-1 flex-col md:pl-[260px]"> */}
      <div className="flex h-full w-full flex-1 flex-col bg-gray-50 md:pl-[260px]">
        {/* <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1"> */}
        <MobileNav />
        <Messages messages={messages} />
        <TextChat messages={messages} reloadConvos={mutate} />
        {/* </main> */}
      </div>
    </div>
  );
};

export default App;
