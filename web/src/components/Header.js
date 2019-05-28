import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import { green, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: createPalette({
        secondary: red,
        primary: green
    }),
    typography: {
        useNextVariants: true,
    },
})

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(1) * 3,
    },
});

class MenuAppBar extends React.Component {

    render() {
        const { classes, setData, isConnected } = this.props;
        return(
            
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <i className="fa fa-seedling"></i>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Vertx Api Test
                    </Typography>
                        <MuiThemeProvider theme={theme}>
                            <Button variant="contained" className={classes.button} color={isConnected ? 'secondary' : 'primary'} onClick={setData}>
                                {isConnected ? 'Clear' : 'Start'}
                            <i className={['fa', 'fa-wifi', classes.rightIcon].join(' ')} />
                            </Button>
                        </MuiThemeProvider>
                    </Toolbar>
                </AppBar>
            
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);