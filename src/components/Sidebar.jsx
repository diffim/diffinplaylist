import React, { useEffect } from "react";
import { useState } from "react";
import {
  Form,
  Link,
  NavLink,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { nanoid } from "nanoid";
import "./css-files/Sidebar.css";

function Sidebar(props) {
  // I would not use redux at all, react context api is much better
  // If you really want to use something, consider these two:
  // 1. For simple global state: Jotai: https://github.com/pmndrs/jotai
  // 2. For a bit more complicated state: Zustand: https://github.com/pmndrs/zustand

  const playlists = props.playlists;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);

  function toggleInputBox() {
    setShowInputBox((oldinputbox) => !oldinputbox);
  }

  const actionurl = `playlists/${useParams().playlistId}/destroy`;
  return (
    <>
      <div className={props.showSidebar}>
        <span>
          <h1
            onClick={props.hideSidebarFunc}
            style={{
              width: "30%",
              marginBottom: "0px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
          >
            x
          </h1>
        </span>
        <h1>Your playlists:</h1>
        {playlists.length ? (
          <ol>
            {playlists.map((playlist) => (
              // Use a valid unique value for key prop as mentioned before
              <div className="sidebar__playlist-item" key={playlist.id}>
                <li>
                  <NavLink
                    to={`/playlists/${playlist.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active "
                        : isPending
                        ? "pending "
                        : "sidebar__playlist-NavLink"
                    }
                  >
                    <Link to={`/playlists/${playlist.id}`}>
                      {playlist.name ? (
                        <>{playlist.name}</>
                      ) : (
                        <i style={{ color: "#5f301bdc", fontSize: "23px" }}>
                          No Name
                        </i>
                      )}
                    </Link>
                  </NavLink>
                </li>
                <button
                  className="sidebar__playlist-item-delete"
                  onClick={() => setShowConfirmDelete(true)}
                >
                  <div className="gg-trash_container">
                    <i className="gg-trash"></i>
                  </div>
                </button>
              </div>
            ))}
          </ol>
        ) : (
          <h2>
            <i>no playlists</i>
          </h2>
        )}
        <div className="addplaylist__container">
          {showInputBox && (
            <Form method="post" className="sidebar__form">
              <input
                type="text"
                className="inputThing sidebar__input"
                autoComplete="off"
                name="playlist"
              />
              <button type="submit">submit</button>
            </Form>
          )}

          <div className="sidebar__newPlaylist_header"></div>
          <h2 onClick={toggleInputBox}> + new playlist</h2>
        </div>
      </div>
      {showConfirmDelete ? (
        <div className="sidebar__deleteConfirmation">
          <p>Are you sure you want to delete this playlist?</p>

          <div className="sidebar__deleteConfirmation-buttons">
            <Form
              method="post"
              action={actionurl}
              onSubmit={() => setShowConfirmDelete(false)}
            >
              <button
                className="deleteButton firstbuttonz"
                style={{ transform: "scale(1.125)" }}
                type="submit"
              >
                <i className="gg-trash"></i>
              </button>
            </Form>
            <button
              className="deleteButton"
              style={{ marginTop: "-3px" }}
              onClick={() => setShowConfirmDelete(false)}
            >
              <h2 style={{ textDecoration: "none" }}>x</h2>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Sidebar;
