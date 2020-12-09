import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Button } from "@material-ui/core";
import Link from "../Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuIconClose from "@material-ui/icons/Close";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: "Yem" = Xem - 3.5em, where Xem = logo height
  },
  logo: {
    height: "3.5em",
  },
  logoContainer: {
    "&:hover": {
      background: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    "&:hover": {
      textDecoration: "none",
    },
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "45px",
    marginRight: "25px",
  },
  menu: {
    background: theme.palette.common.blue,
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  selectedMenuItem: {
    color: theme.palette.common.orange,
    opacity: 1,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": { background: "transparent" },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItemText: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
  appBar: {
    zIndex: 1301,
  },
}));

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  useEffect(() => {
    switch (pathname) {
      case "/":
        value !== 0 && setValue(0);
        break;
      case "/pageone":
        value !== 1 && setValue(1);
        selectedIndex !== 0 && setSelectedIndex(0);
        break;
      case "/pageoneone":
        value !== 1 && setValue(1);
        selectedIndex !== 1 && setSelectedIndex(1);
        break;
      case "/pageonetwo":
        value !== 1 && setValue(1);
        selectedIndex !== 2 && setSelectedIndex(2);
        break;
      case "/pagetwo":
        value !== 2 && setValue(2);
        break;
      case "/feedback":
        value !== false && setValue(false);
        break;
      default:
        break;
    }
    // if (window.location.pathname === "/" && value !== 0) {
    //   setValue(0);
    // } else if (window.location.pathname === "/pageone" && value !== 1) {
    //   setValue(1);
    // } else if (window.location.pathname === "/pagetwo" && value !== 2) {
    //   setValue(2);
    // } else if (window.location.pathname === "/feedback" && value !== 3) {
    //   setValue(false);
    // }
  }, [value, selectedIndex, pathname]);

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (i) => {
    setSelectedIndex(i);
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        className={classes.tabContainer}
      >
        <Tab
          label="Home"
          className={classes.tab}
          component={Link}
          href="/"
          label="Home"
        />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onMouseOver={(event) => handleClick(event)}
          label="Page1"
          className={classes.tab}
          component={Link}
          href="/pageone"
          label="Page One"
        />
        <Tab
          label="Page2"
          className={classes.tab}
          component={Link}
          href="/pagetwo"
          label="Page Two"
        />
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PopoverClasses={{ paper: classes.menu }}
        elevation={0}
      >
        <MenuItem
          component={Link}
          href="/pageone"
          ListItemClasses={{
            root: classes.menuItem,
            selected: classes.selectedMenuItem,
          }}
          onClick={() => {
            setValue(1);
            handleMenuItemClick(0);
            handleClose();
          }}
          selected={value === 1 && selectedIndex === 0}
        >
          Page One
        </MenuItem>
        <MenuItem
          component={Link}
          href="/pageoneone"
          ListItemClasses={{
            root: classes.menuItem,
            selected: classes.selectedMenuItem,
          }}
          onClick={() => {
            setValue(1);
            handleMenuItemClick(1);
            handleClose();
          }}
          selected={value === 1 && selectedIndex === 1}
        >
          Page11
        </MenuItem>
        <MenuItem
          component={Link}
          href="/pageonetwo"
          ListItemClasses={{
            root: classes.menuItem,
            selected: classes.selectedMenuItem,
          }}
          onClick={() => {
            setValue(1);
            handleMenuItemClick(2);
            handleClose();
          }}
          selected={value === 1 && selectedIndex === 2}
        >
          Page12
        </MenuItem>
      </Menu>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        href="/feedback"
      >
        FeedBack
      </Button>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{ className: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            selected={value === 0}
            classes={{selected: classes.drawerItemSelected}}
            component={Link}
            href="/"
          >
            <ListItemText disableTypography className={classes.drawerItemText}>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            selected={value === 1}
            classes={{selected: classes.drawerItemSelected}}
            component={Link}
            href="/pageone"
          >
            <ListItemText disableTypography className={classes.drawerItemText}>
              Page One
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            selected={value === 2}
            classes={{selected: classes.drawerItemSelected}}
            component={Link}
            href="/pagetwo"
          >
            <ListItemText
              disableTypography
              className={classes.drawerItemText}
            >
              Page Two
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        disableRipple
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        {!openDrawer ? (
          <MenuIcon fontSize="large" />
        ) : (
          <MenuIconClose fontSize="large" />
        )}
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              href="/"
              className={classes.logoContainer}
            >
              <img
                alt="company logo"
                src="/logo.svg"
                className={classes.logo}
              />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
