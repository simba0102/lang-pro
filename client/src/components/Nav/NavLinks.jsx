import React from 'react';
import NavLink from './NavLink';
import LogOutIcon from '../svg/LogOutIcon';
import SearchBar from './SearchBar';
import ClearConvos from './ClearConvos';
import DarkMode from './DarkMode';
import Logout from './Logout';

export default function NavLinks({ onSearchSuccess, clearSearch }) {
  return (
    <>
      <SearchBar onSuccess={onSearchSuccess} clearSearch={clearSearch}/>
      <ClearConvos />
      <DarkMode />
      <Logout />
      {/* <NavLink
        svg={LogOutIcon}
        text="Log out"
      /> */}
    </>
  );
}
