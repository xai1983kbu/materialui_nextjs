import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Button } from '@material-ui/core';
import Link from '../Link'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        // marginBottom: "Yem" = Xem - 3.5em, where Xem = logo height
    },
    logo: {
        height: "3.5em"
    },
    logoContainer: {
        "&:hover": {
            background: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px",
        "&:hover": {
            textDecoration: "none"
        }
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "45px",
        marginRight: "25px",

    }
}))

const Header = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
      setValue(value);
  }

  useEffect(() => {
      if (window.location.pathname === "/" && value !== 0 ) {
          setValue(0)
      } else if (window.location.pathname === "/pageone" && value !== 1 ) {
          setValue(1)
      } else if (window.location.pathname === "/pagetwo" && value !== 2 ) {
          setValue(2)
      } else if (window.location.pathname === "/feedback" && value !== 3 ) {
          setValue(false)
      }
  }, [])

  return (
      <React.Fragment>
        <ElevationScroll>
        <AppBar position="fixed">
            <Toolbar disableGutters>
                <Button disableRipple component={Link} href='/' className={classes.logoContainer}>
                    <img alt="company logo" src='/logo.svg' className={classes.logo} />
                </Button>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" className={classes.tabContainer} >
                    <Tab label="Home" className={classes.tab} component={Link} href="/" label="Home" />
                    <Tab label="Page1" className={classes.tab} component={Link} href="/pageone" label="Page One"  />
                    <Tab label="Page2" className={classes.tab} component={Link} href="/pagetwo" label="Page Two"  />
                </Tabs>
                <Button variant="contained" color="secondary" className={classes.button} component={Link} href="/feedback" >
                    FeedBack
                </Button>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </React.Fragment>
  );
};

export default Header;
