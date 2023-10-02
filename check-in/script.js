const {useState} = React;
const {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Tooltip,
    IconButton,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ClickAwayListener,
    Typography
} = MaterialUI;

function GuestForm({index, handleGuestChange}) {
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState(false);

    const [openTooltips, setOpenTooltips] = useState({
        tooltip1: false,
        tooltip2: false,
        tooltip3: false,
    });

    const handleTooltipOpen = (tooltipKey) => {
        setOpenTooltips(prevState => ({
            ...prevState,
            [tooltipKey]: true,
        }));
    };

    const handleTooltipClose = (tooltipKey) => {
        setOpenTooltips(prevState => ({
            ...prevState,
            [tooltipKey]: false,
        }));
    };

    const handleFullNameChange = (e) => {
        const value = e.target.value;
        setFullName(value);
        setFullNameError(value.trim() === ''); // Check if "Full Name" is empty
        handleGuestChange(index, 'name', value);
    };

    return (
        <div className="guest-box">
            <Box display="flex" alignItems="center" width="100%" mb={2}>
                <TextField
                    label="Full Name*"
                    variant="outlined"
                    style={{flex: 1, marginRight: 8}}
                    onChange={handleFullNameChange}
                    error={fullNameError} // Show error if fullNameError is true
                    helperText={fullNameError ? 'Full Name is required' : ''}
                />
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <FormControl variant="outlined" style={{flex: 1, marginRight: 8}}>
                    <InputLabel>Ticket Type</InputLabel>
                    <Select
                        defaultValue="Delta One"
                        label="Ticket Type"
                        onChange={e => handleGuestChange(index, 'ticketType', e.target.value)}
                    >
                        <MenuItem value="Delta One">Delta One</MenuItem>
                        <MenuItem value="Comfort Plus">Comfort Plus</MenuItem>
                        <MenuItem value="Unaccompanied Minors">Unaccompanied Minors</MenuItem>
                        <MenuItem value="Infant-in-Arms">Infant-in-Arms</MenuItem>
                    </Select>
                </FormControl>
                <ClickAwayListener onClickAway={() => handleTooltipClose('tooltip1')}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => handleTooltipClose('tooltip1')}
                            open={openTooltips.tooltip1}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">
                                        <b>DELTA ONE</b>: Adults 21+ with access to all you can eat and drink
                                        (including
                                        unlimited beer, wine, and spirits). These guests will also have access to the
                                        737 Flight Simulator. Seating will be in Hanger Two.<br/><br/>
                                        <b>COMFORT PLUS</b>: Young Adults aged 12+ who are not legally allowed to drink
                                        alcohol. These guests will sit with the adults for dinner (Hanger Two) and will
                                        have access to all you can eat and drink (soda, etc). These guests will also
                                        have access to the 737 Flight Simulator with parents permission.<br/><br/>
                                        <b>UNACCOMPANIED MINORS</b>: Children aged 3 to 11. These children will sit in a
                                        separate area away from the adults with babysitters (Hanger One). Food
                                        appropriate for children will be provided for these guests unless otherwise
                                        noted by their parents.<br/><br/>
                                        <b>INFANT-IN-ARMS</b>: Children under 3 years old or children who are still in
                                        diapers. These children will sit with the adults for dinner (Hanger Two). Please
                                        bring your own food for these guests unless they will eat mac & cheese.
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <IconButton onClick={() => handleTooltipOpen('tooltip1')} color="primary">
                                <i className="material-icons">info</i>
                            </IconButton>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <FormControl variant="outlined" style={{flex: 1, marginRight: 8}}>
                    <InputLabel>Special Meals</InputLabel>
                    <Select
                        label="Special Meals"
                        onChange={e => handleGuestChange(index, 'specialMeals', e.target.value)}
                    >
                        <MenuItem value="Vegan">Vegan</MenuItem>
                        <MenuItem value="Kosher">Kosher</MenuItem>
                        <MenuItem value="Halal">Halal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <ClickAwayListener onClickAway={() => handleTooltipClose('tooltip2')}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={() => handleTooltipClose('tooltip2')}
                            open={openTooltips.tooltip2}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">
                                        The Delta One buffet will include many food options, including
                                        a variety of <b>vegetarian</b> and <b>gluten-free</b> dishes.<br/><br/>
                                        If you request a special meal, our wedding planner
                                        will reach out to you a few weeks before the event to confirm your dietary
                                        restrictions.
                                    </Typography>
                                </React.Fragment>
                            }
                        >
                            <IconButton onClick={() => handleTooltipOpen('tooltip2')} color="primary">
                                <i className="material-icons">info</i>
                            </IconButton>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            </Box>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={e => handleGuestChange(index, 'interestInFlightSimulator', e.target.checked ? 1 : 0)}
                        color="primary"
                    />
                }
                label={
                    <span>
            Interest in Flight Simulator
            <ClickAwayListener onClickAway={() => handleTooltipClose('tooltip3')}>
                <div style={{display: 'inline-block', marginLeft: 8}}>  {/* Adjust styling as needed */}
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={() => handleTooltipClose('tooltip3')}
                        open={openTooltips.tooltip3}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={
                            <React.Fragment>
                                <Typography color="inherit">
                                    The 737 Flight Simulator sessions last approximately 30 minutes. If you've ever
                                    dreamt of piloting a real Boeing 737 (with the guidance of a certified flight
                                    trainer) express your interest and we'll ensure this one-of-a-kind wedding
                                    experience becomes a reality!
                                </Typography>
                            </React.Fragment>
                        }
                    >
                        <IconButton onClick={() => handleTooltipOpen('tooltip3')} color="primary">
                            <i className="material-icons">info</i>
                        </IconButton>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </span>
                }
            />

        </div>
    );
}

function App() {
    const [guests, setGuests] = useState([{
        name: '',
        ticketType: 'Delta One',
        specialMeals: '',
        interestInFlightSimulator: 0
    }]);
    const [additionalGuests, setAdditionalGuests] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGuestChange = (index, key, value) => {
        setGuests(prevGuests => {
            const newGuests = [...prevGuests];
            newGuests[index][key] = value;
            return newGuests;
        });
    };

    const handleAdditionalGuestsChange = (amount) => {
        const newCount = additionalGuests + amount;
        if (newCount >= 0) {
            setAdditionalGuests(newCount);
            if (amount > 0) {
                setGuests([...guests, {
                    name: '',
                    ticketType: 'Delta One',
                    specialMeals: '',
                    interestInFlightSimulator: 0
                }]);
            } else {
                setGuests(guests.slice(0, guests.length - 1));
            }
        }
    };

    const handleSubmit = () => {
        const isFullNameEmpty = guests.some(guest => guest.name.trim() === '');

        if (isFullNameEmpty) {
            setErrorMessage('Please fill out all required fields (Full Name).');
            setOpenDialog(true);
        } else {
            fetch('submit_rsvp.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guests),
            })
                .then(response => response.text())
                .then(data => {
                    console.log('Success:', data);
                    window.location.href = 'confirmation.html';
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div>
            <GuestForm key={0} index={0} handleGuestChange={handleGuestChange}/> {/* First guest */}
            <div className="guest-box" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'Roboto, sans-serif'
            }}>
                <div style={{fontFamily: 'Roboto, sans-serif'}}>Select # of Additional Guests</div>
                <div>
                    <IconButton onClick={() => handleAdditionalGuestsChange(-1)} disabled={additionalGuests <= 0}>
                        <i className="material-icons">remove</i>
                    </IconButton>
                    <span style={{fontFamily: 'Roboto, sans-serif'}}>{additionalGuests}</span>
                    <IconButton onClick={() => handleAdditionalGuestsChange(1)}>
                        <i className="material-icons">add</i>
                    </IconButton>
                </div>
            </div>
            {guests.slice(1).map((guest, index) => (
                <GuestForm key={index + 1} index={index + 1} handleGuestChange={handleGuestChange}/>
            ))}
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: 16}}>
                Complete Check-In
            </Button>

            {/* Dialog for displaying error message */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Check-In Issue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
