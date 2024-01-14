import React, { useEffect, useState } from "react";
import { InfoSectionWrapper } from "../../components/InfoSectionWrapper";
import { PrimaryNavigation } from "../../components/PrimaryNavigation";
import { UpcomingTable } from "../../components/UpcomingTable";
import "./style.css";
import "firebase/database";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  Drawer,
  SwipeableDrawer,
  MenuItem,
  IconButton,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../Firebase";
import { getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { styled, useTheme } from "@mui/material/styles";
import { on } from "process";
import { TimeInput } from "@mantine/dates";
import { Text, rem, TextInput, Popover } from "@mantine/core";
import { uid } from "uid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import "@mantine/core/styles.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Home = (): JSX.Element => {
  const [openTime, setOpenTime] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [timeValue, onTimeValueChange] = useState();
  const [promptValue, setPromptValue] = useState("");
  const [openIconPopover, setOpenIconPopover] = useState(false);
  //set up firebase:
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const auth = getAuth(app);

  const prompts = getCurrentPrompts();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function getCurrentPrompts(): string[] {
    console.log(localStorage.getItem("prompts"));
    return (
      Object.values(JSON.parse(localStorage.getItem("prompts") || "[]")) || []
    );
  }

  function saveNewPrompt(prompt: string): void {
    const prompts = getCurrentPrompts();
    prompts.push(prompt);
    localStorage.setItem("prompts", JSON.stringify(prompts));

    const dbRef = getDatabase();
    const uidGen = uid();
    const dataRef = ref(
      dbRef,
      "/users/" + localStorage.getItem("user") + "/prompts/" + uidGen
    );
    set(dataRef, prompt)
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }

  useEffect(() => {
    if (openHelp) {
      // Generate the mailto link with your desired email and subject
      const mailtoLink =
        "mailto:hackathonw2024@gmail.com?subject=Help%20Request&body=Hello%20there,%20I%20need%20help%20with...";

      // Open the email client
      window.location.href = mailtoLink;

      // Reset the variable after opening the email
      setOpenHelp(false);
    }
  }, [openHelp]);

  function onClickPrompt(prompt: string) {
    const dbRef = getDatabase();
    const uidGen = uid();
    const dataRef = ref(
      dbRef,
      "/users/" + localStorage.getItem("user") + "/Queue/" + uidGen
    );
    const dataRefQueue = ref(dbRef, "/queue/" + uidGen);
    console.log("prompt: ", prompt);
    if (prompt) {
      const unixTimeSeconds = Math.floor(Date.now() / 1000) + 90;
      const data = {
        time: unixTimeSeconds,
        prompt: prompt,
      };
      set(dataRef, data)
        .then(() => {
          console.log("Data written successfully!");
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
      const dataQueue = {
        id: unixTimeSeconds,
        user: localStorage.getItem("user"),
      };
      set(dataRefQueue, dataQueue)
        .then(() => {
          console.log("Data written successfully to queue!");
        })
        .catch((error) => {
          console.log("An error occurred writing to queue:", error);
        });
    }
    setOpenTime(false);
  }

  return (
    <>
      <div className="home">
        <SwipeableDrawer
          className="TimeDrawer"
          anchor="bottom"
          open={openTime}
          onClose={() => setOpenTime(false)}
          onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
            throw new Error("Function not implemented.");
          }}
        >
          <Box sx={{ width: "auto" }} role="presentation" textAlign="center">
            <DrawerHeader>
              <IconButton onClick={() => setOpenTime(false)}>X</IconButton>
            </DrawerHeader>
            <Divider style={{ width: "50%" }} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "",
              }}
            >
              <Typography variant="h6" component="div" style={{ width: "20%" }}>
                Schedule a Disruption
              </Typography>
              <TimeInput style={{ width: "20%" }} value={timeValue} />

              <div
                className="prompt-picker"
                style={{display: "flex" }}
              >
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Choose Prompt
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {prompts.map((prompt, index) => (
                    <MenuItem key={index} onClick={() => onClickPrompt(prompt)}>
                      {prompt}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Box>
        </SwipeableDrawer>

        <SwipeableDrawer
          className="PromptDrawer"
          anchor="bottom"
          open={openPrompt}
          onClose={() => setOpenPrompt(false)}
          sx={{
            width: 240,
            height: 400,
            flexshrink: 0,
          }}
          onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
            throw new Error("Function not implemented.");
          }}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpenPrompt(false)}>X</IconButton>
          </DrawerHeader>
          <Divider />
          <TextInput
            placeholder="Enter your prompt here"
            value={promptValue}
            onChange={(event) => setPromptValue(event.currentTarget.value)}
          ></TextInput>
          <Button
            onClick={() => {
              saveNewPrompt(promptValue);
            }}
          >
            Save
          </Button>
        </SwipeableDrawer>

        <div className="div">
          <div className="overlap-group">
            <div className="ellipse" />
            <div className="rectangle" />
            <InfoSectionWrapper className="info-section" />
          </div>
          <div className="overlap">
            <div className="rectangle-2" />
            <PrimaryNavigation
              setOpenTime={setOpenTime}
              setOpenPrompt={setOpenPrompt}
              setOpenHelp={setOpenHelp}
            />
          </div>
          <div className="overlap-2">
            <UpcomingTable />
            <p className="call-min"></p>
          </div>

          <img
            className="profile-picture"
            alt="Profile picture"
            src={localStorage.getItem("icon") || ""}
          />

          <button
            className="icon-button"
            onClick={() => {
              localStorage.setItem("icon", "")
              localStorage.setItem("user", "")
              localStorage.setItem("phoneNumber", "")
              window.location.reload();
          }
          }
          >
            Log Out
          </button>
          
          <div className="text-wrapper-2">Ready to Leave?</div>
          <div className="text-wrapper-3">Welcome</div>
        </div>
      </div>
    </>
  );
};
