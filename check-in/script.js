const {
    Button,
} = MaterialUI;

function DeclinedPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className="header-container">
            <div className="header-text">
                CHECK-IN IS CLOSED
            </div>
            <div className="subheader-text">
                THANKS FOR STOPPING BY
            </div>
        </div>

        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.location.href = '/'}>
            RETURN TO SITE
        </Button>
    </div>
    );
}

ReactDOM.render(<DeclinedPage />, document.getElementById('root'));
