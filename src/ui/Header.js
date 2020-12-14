import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Button, Grid } from "@material-ui/core";
import Link from "../Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuIconClose from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  selectedMenuItem: {
    opacity: 1,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
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
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  accordion: {
    backgroundColor: theme.palette.common.blue,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "&.Mui-expanded": {
      margin: 0,
      borderBottom: 0,
    },
    "&::before": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
  accordionDetails: {
    padding: 0,
    backgroundColor: theme.palette.primary.light,
  },
  accordionSummary: {
    padding: "0 24px 0 16px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    backgroundColor: (props) => {
      return props.value === 1 ? "rgba(0, 0, 0, 0.14)" : "inherit";
    },
  },
}));

const menuOptions = [
  {
    name: "SubPageOne of PageOne",
    link: "/pageonetabone",
    activeIndex: 1,
    selectedIndex: 0,
  },
  {
    name: "SubTwoOne of PageOne",
    link: "/pagetwotabone",
    activeIndex: 1,
    selectedIndex: 1,
  },
  {
    name: "SubThreeOne of PageOne",
    link: "/pagethreetabone",
    activeIndex: 1,
    selectedIndex: 2,
  },
];

const Header = () => {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const [openMenu, setOpenMenu] = useState(false);

  const classes = useStyles({ value, selectedIndex });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleMouseOverTab = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  //  (typeof window !== "undefined") is false for SSR
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  useEffect(() => {
    switch (pathname) {
      case "/":
        value !== 0 && setValue(0);
        break;
      case "/pageone":
        value !== 1 && setValue(1);
        selectedIndex !== false && setSelectedIndex(false);
        break;
      case "/pageonetabone":
        value !== 1 && setValue(1);
        selectedIndex !== 0 && setSelectedIndex(0);
        break;
      case "/pagetwotabone":
        value !== 1 && setValue(1);
        selectedIndex !== 1 && setSelectedIndex(1);
        break;
      case "/pagethreetabone":
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
  }, []);

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
          selected={value === 0}
        />
        <Tab
          label=// {`Page One${
          //   selectedIndex !== false ? `-${selectedIndex}` : ""
          // }`}
          {
            <>
              Page One
              <span style={{ fontSize: "0.75rem" }}>
                {selectedIndex !== false &&
                  `/${menuOptions[selectedIndex]["name"]}`}
              </span>
            </>
          }
          className={classes.tab}
          component={Link}
          href="/pageone"
          selected={value === 1}
          aria-owns={openMenu ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onMouseOver={(event) => handleMouseOverTab(event)}
          onMouseLeave={() => setOpenMenu(false)}
          onClick={() => setSelectedIndex(false)}
        />
        <Tab
          label="Page2"
          className={classes.tab}
          component={Link}
          href="/pagetwo"
          label="Page Two"
          selected={value === 2}
        />
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        href="/feedback"
        onClick={() => {
          setValue(false);
        }}
      >
        FeedBack
      </Button>
      <Popper
        open={openMenu}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "top left",
            }}
          >
            <Paper classes={{ root: classes.menu }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={false}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  onMouseOver={() => setOpenMenu(true)}
                  onMouseLeave={() => setOpenMenu(false)}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setValue(1);
                      setSelectedIndex(0);
                    }}
                    component={Link}
                    href="/pageonetabone"
                    color="inherit"
                    selected={selectedIndex === 0}
                    ListItemClasses={{
                      root: classes.menuItem,
                      selected: classes.selectedMenuItem,
                    }}
                  >
                    SubPageOne of PageOne{" "}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setValue(1);
                      setSelectedIndex(1);
                    }}
                    classes={{ root: classes.menuItem }}
                    component={Link}
                    href="/pagetwotabone"
                    color="inherit"
                    selected={selectedIndex === 1}
                    ListItemClasses={{
                      root: classes.menuItem,
                      selected: classes.selectedMenuItem,
                    }}
                  >
                    SubPageTwo of PageOne
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setValue(1);
                      setSelectedIndex(2);
                    }}
                    classes={{ root: classes.menuItem }}
                    component={Link}
                    href="/pagethreetabone"
                    color="inherit"
                    selected={selectedIndex === 2}
                    ListItemClasses={{
                      root: classes.menuItem,
                      selected: classes.selectedMenuItem,
                    }}
                  >
                    SubPageTree of PageOne
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
              setSelectedIndex(false);
            }}
            selected={value === 0}
            classes={{ selected: classes.drawerItemSelected }}
            style={{
              backgroundColor: value == 0 ? "rgba(0, 0, 0, 0.14)" : null,
            }}
            component={Link}
            href="/"
          >
            <ListItemText disableTypography className={classes.drawerItemText}>
              Home
            </ListItemText>
          </ListItem>
          <Accordion classes={{ root: classes.accordion }} elevation={0}>
            <AccordionSummary
              expandIcon={
                <IconButton
                  style={{ backgroundColor: "transparent" }}
                  disableRipple
                >
                  <ExpandMoreIcon color="secondary" />
                </IconButton>
              }
              classes={{ root: classes.accordionSummary }}
            >
              <ListItemText
                disableTypography
                className={classes.drawerItemText}
                style={{
                  opacity: value === 1 && selectedIndex === false ? 1 : null,
                }}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(1);
                  setSelectedIndex(false);
                }}
              >
                <Link href="/pageone" color="inherit">
                  Page One
                </Link>
              </ListItemText>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accordionDetails }}>
              <Grid container direction="column">
                {menuOptions.map((menuRoute) => (
                  <Grid
                    item
                    key={`${menuRoute.name}${menuRoute.selectedIndex}`}
                  >
                    <ListItem
                      divider
                      button
                      onClick={() => {
                        // setOpenDrawer(false);
                        setSelectedIndex(menuRoute.selectedIndex);
                        setValue(1);
                      }}
                      selected={
                        value === 1 &&
                        selectedIndex === menuRoute.selectedIndex &&
                        pathname !== "/pageone"
                      }
                      classes={{ selected: classes.drawerItemSelected }}
                      style={{
                        backgroundColor:
                          selectedIndex === menuRoute.selectedIndex
                            ? "rgba(0, 0, 0, 0.14)"
                            : null,
                      }}
                      component={Link}
                      href={menuRoute.link}
                    >
                      <ListItemText
                        disableTypography
                        className={classes.drawerItemText}
                      >
                        {`${menuRoute.name}`}
                      </ListItemText>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            selected={value === 1}
            classes={{ selected: classes.drawerItemSelected }}
            component={Link}
            href="/pageone"
          >
            <ListItemText disableTypography className={classes.drawerItemText}>
              Page One
            </ListItemText>
          </ListItem> */}
          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            selected={value === 2}
            classes={{ selected: classes.drawerItemSelected }}
            style={{
              backgroundColor: value == 2 ? "rgba(0, 0, 0, 0.14)" : null,
            }}
            component={Link}
            href="/pagetwo"
          >
            <ListItemText disableTypography className={classes.drawerItemText}>
              Page Two
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(3);
            }}
            divider
            button
            selected={value === 3}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            style={{
              backgroundColor: value == 3 ? "rgba(0, 0, 0, 0.14)" : null,
            }}
            component={Link}
            href="/feedback"
          >
            <ListItemText className={classes.drawerItemText} disableTypography>
              Feedback
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
        <AppBar position="fixed" classes={{ root: classes.appBar }}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              href="/"
              className={classes.logoContainer}
              onClick={() => { setValue(0); setSelectedIndex(false); setOpenMenu(false); }}
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
