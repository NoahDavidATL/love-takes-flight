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
    ClickAwayListener
} = MaterialUI;

function GuestForm({index, handleGuestChange}) {
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
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
                    label="Full Name"
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
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Add"
                        >
                            <IconButton onClick={handleTooltipOpen} color="primary">
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
                <Tooltip disableFocusListener
                         title="The around-the-world buffet includes many food types including vegetarian and gluten free options."
                         arrow>
                    <IconButton color="primary">
                        <i className="material-icons">info</i>
                    </IconButton>
                </Tooltip>
            </Box>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={e => handleGuestChange(index, 'interestInFlightSimulator', e.target.checked ? 1 : 0)}
                        color="primary"/>
                }
                label="Interest in Flight Simulator"
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
                <div style={{fontFamily: 'Roboto, sans-serif'}}>Select # of additional guests</div>
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
                Complete Check In
            </Button>

            {/* Dialog for displaying error message */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Error</DialogTitle>
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
