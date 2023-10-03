const {useState} = React;
const {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} = MaterialUI;

const styles = {
    pill: {
        borderRadius: '25px',
        padding: '10px 20px',
        width: 'fit-content',
        margin: '10px 5px 5px',
        // ... other styles as needed
    },
    timeBox: {
        backgroundColor: '#f7f7f7',
        padding: '10px',
        margin: '5px',
        width: '45%',
        position: 'relative',  // New style
        // ... other styles as needed
    },
    accordion: {
        backgroundColor: '#f7f7f7',
        margin: '10px 5px 15px'
        // ... other styles as needed
    },
};

const accordionData = [
    {
        question: "Where do I Park?",
        answer: "Navigate to <a href='https://maps.app.goo.gl/QZnk9FUSVTaqnox68?g_st=ic' target='_blank'>1060 Delta Blvd, Hapeville, GA 30354</a>. Follow the signs to the Delta Flight Museum entrance.",
        iconClass: "fa-duotone fa-circle-parking fa-xl"
    },
    {
        question: "What is the Weather like in Atlanta?",
        answer: "It might be a little chilly in December, so bring a coat just in case.",
        iconClass: "fas fa-cloud-sun fa-xl"
    },
    {
        question: "What Hotel should I Book?",
        answer: "We recommend staying at the <a href='https://www.marriott.com/events/start.mi?id=1685740289697&key=GRP' target='_blank'>Renaissance Concourse Atlanta Airport</a>.",
        iconClass: "fa-duotone fa-bell-concierge fa-xl"
    },
    {
        question: "Is there Saturday Morning Yoga?",
        answer: "Why yes, yes there is. Stop by the Lambert Room in the Renaissance next to the restaurant at 7 am to join.",
        iconClass: "fa-duotone fa-dumbbell fa-xl"
    },
    {
        question: "Should I Print this Confirmation?",
        answer: "Sure! You can also bookmark this page if you want to reference it later.",
        iconClass: "fa-duotone fa-print fa-xl"
    }
];


function ConfirmationPage() {
  return (
    <div style={{ padding: '20px' }}>
        <div className="header-container">
            <div className="header-text">
                YOU'RE ALL SET
            </div>
            <div className="subheader-text">
                SEE YOU IN DECEMBER
            </div>
        </div>

        <div className="gradientBox">
          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '16px', fontWeight: '300' }}>
              DELTA FLIGHT MUSEUM<br />
              <span style={{ fontWeight: '300', fontSize: '11px' }}>DIAMOND MEDALLION / ELITE PLUS</span>
          </div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', textAlign: 'right', fontSize: '16px', fontWeight: '300' }}>
              <i class="fa-regular fa-hashtag"></i> KRO1216<br />
              <span style={{ fontWeight: '300', fontSize: '11px', textAlign: 'right' }}>DEC 16, 2023</span>
          </div>
          <img 
                src="/assets/confirmation.webp" 
                alt="Aloha from Ashley & Noah" 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '50%',
                    border: '4px solid #4F145C',
                    borderRadius: '500px',
                }}
          />  
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontWeight: '500', fontSize: '12px', lineHeight: '1.4' }}>SEAT<br/><span style={{ fontSize: '24px', fontWeight: '300' }}>2A</span></div>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right', fontWeight: '500', fontSize: '12px', lineHeight: '1.4' }}>ZONE<br/>
              <span style={{ fontWeight: 'normal', fontSize: '24px', fontWeight: '300' }}>DELTA ONE</span>
          </div>
      </div>

    <div className="pillContainer">
        <div className="pill" style={{ backgroundColor: '#e51937', color: '#fff' }}>SKY PRIORITY</div>
        <div className="pill" style={{ backgroundColor: '#1d284e', color: '#fff' }}>TSA Pre <i class="fa-regular fa-check"></i></div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div style={styles.timeBox}>
            <Typography variant="subtitle2" align="left">BOARDING TIME</Typography>
            <Typography variant="h5" align="left" style={{ fontWeight: '300' }}>5:30 pm</Typography>
            <Typography style={{ color: '#1c8617', fontWeight: '500' }} variant="caption" align="left">ON TIME</Typography>
            <i class="fa-duotone fa-suitcase-rolling fa-2xl" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
        </div>
        <div style={styles.timeBox}>
            <Typography variant="subtitle2" align="left">DEPARTURE TIME</Typography>
            <Typography variant="h5" align="left" style={{ fontWeight: '300' }}>6:00 pm</Typography>
            <Typography style={{ color: '#1c8617', fontWeight: '500' }} variant="caption" align="left">ON TIME</Typography>
            <i class="fa-duotone fa-plane-tail fa-2xl" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
        </div>
    </div>

    {accordionData.map((item, index) => (
        <Accordion style={styles.accordion} key={index}>
            <AccordionSummary>
                <i className={item.iconClass} style={{ marginRight: '10px', marginTop: '10px', width: '30px' }}></i>
                {item.question}
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    component="span"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                />
            </AccordionDetails>
        </Accordion>
    ))}
    </div>
  );
}

ReactDOM.render(<ConfirmationPage />, document.getElementById('root'));
