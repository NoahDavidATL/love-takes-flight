const {
    Button,
} = MaterialUI;

function DeclinedPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className="header-container">
            <div className="header-text">
                THIS FLIGHT HAS DEPARTED
            </div>
            <div className="subheader-text">
                THANKS FOR STOPPING BY
            </div>
        </div>

        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.location.href = 'https://www.delta.com'}>
            BOOK YOUR OWN FLIGHT
        </Button>
    </div>
    );
}

ReactDOM.render(<DeclinedPage />, document.getElementById('root'));
