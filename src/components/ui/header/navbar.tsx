import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import SearchAsset from "./search-asset";
import authService from "@/services/auth.service";
import { useGlobalContext } from "@/contexts";
import { MenuUnstyled } from "@mui/base";
import { Popper, StyledListbox, StyledMenuItem } from "./menu";
import LoadingSpinner from "@/components/shared/loadingSpinner";
import Divider from "@/components/shared/divider";
import IconButton from "@/components/shared/iconButton";

function Navbar() {
  const { user, setUser, loading, setLoading } = useGlobalContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loginLink, setLoginLink] = useState("");
  const [iframeToken, setIframeToken] = useState<string>("");
  const [logoutLink, setLogoutLink] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const iframeCurrent = iframeRef.current;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof location !== "undefined") {
      setLoginLink(
        "https://dashboard.spicaengine.com/login?callback=" + location.href
      );
      setLogoutLink(
        "https://dashboard.spicaengine.com/login?callback=" +
          location.href +
          "/&operation=logOut"
      );
    }
  }, []);
  useEffect(() => {
    iframePostMessage();
  }, [iframeCurrent]);
  useEffect(() => {
    if (!iframeToken) {
      authService.deleteLocalStorage();
      setLoading(false);
      return;
    }
    authService
      .setHqToken(iframeToken)
      .then((user) => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  }, [iframeToken]);

  useEffect(() => {}, [user]);
  function iframePostMessage() {
    setLoading(true);
    onLoad();
    iframeCurrent?.contentWindow?.postMessage(
      "exchange",
      "https://hq.spicaengine.com/api"
    );
  }

  async function handler({
    origin,
    data,
  }: {
    origin: string;
    data: { key: string; authorization: string };
  }) {
    const { key, authorization } = data;
    if (origin != window.origin) {
      const { key, authorization } = data;
      setIframeToken(authorization);
    }
  }
  function onLoad() {
    if (typeof window !== "undefined") {
      window.addEventListener("message", handler);
    }
  }

  const handleButtonClick = (event: any) => {
    if (isOpen) {
      setAnchorEl(null);
      setIsOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsOpen(true);
    }
  };

  const close = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };
  return (
    <nav className="w-full bg-theme-color bg-cover">
      <div className="flex-center md:px-5 justify-between mx-auto lg:max-w-7xl">
        <div className="flex-center">
          <Link href="/" className="text-xl text-primary font-leighter">
            Assetstore
          </Link>
        </div>
        <ul className="justify-evenly md:justify-end flex-1 flex-center md:space-x-6 ">
          <li>
            <SearchAsset />
          </li>
          <li className="text-primary">
            {user && (
              <Link href="/card">
                <IconButton>
                  <ShoppingCartIcon className="h-6 w-6" />
                </IconButton>
              </Link>
            )}
          </li>
          <li className="text-primary">
            {loading ? (
              <LoadingSpinner loading />
            ) : (
              <a href={user ? undefined : loginLink}>
                <IconButton onClick={user && handleButtonClick}>
                  <UserIcon className="h-6 w-6" />
                </IconButton>
              </a>
            )}
          </li>
        </ul>
      </div>
      <MenuUnstyled
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
      >
        <StyledMenuItem>
          <Link href="/author">Author Page</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link href="/upload-asset">Upload An Asset</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link href="/my-assets">My Assets</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <a
            href="https://dashboard.spicaengine.com/profile"
            rel="noreferrer"
            target="_blank"
          >
            Settings
          </a>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <a
            href="https://dashboard.spicaengine.com/terms"
            rel="noreferrer"
            target="_blank"
          >
            Terms Of Service
          </a>
        </StyledMenuItem>
        <StyledMenuItem>
          <a
            href="https://dashboard.spicaengine.com/terms"
            rel="noreferrer"
            target="_blank"
          >
            FAQ
          </a>
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <a href={logoutLink}>Sign Out</a>
        </StyledMenuItem>
      </MenuUnstyled>
      <iframe
        ref={iframeRef}
        id="hq-iframe"
        src="https://hq.spicaengine.com/api/fn-execute/v1/state"
        style={{ display: "none" }}
      ></iframe>
    </nav>
  );
}

export default Navbar;
