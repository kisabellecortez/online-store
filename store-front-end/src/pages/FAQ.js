import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Sidebar from '../components/Sidebar.js';
import TopNav from '../components/TopNav.js';
import EndBanner from '../components/EndBanner.js';

export default function FAQ(){
    return(
        <div>
            <TopNav/>
            <Sidebar/>

            <div className="faq">
                <h1>FAQ</h1>
                <h2>Popular Questions</h2>

                <div className="accordian">
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">What materials do you use in your jewelry?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            We use high-quality sterling silver, 14k/18k gold, and ethically sourced gemstones. Each piece is crafted with durability and timeless design in mind.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">Is your jewelry hypoallergenic?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        Yes, all of our jewelry is nickel-free and safe for sensitive skin.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">Do you offer custom designs?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        Absolutely! Our design team can work with you to create one-of-a-kind pieces. Please contact us to discuss your vision.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">How do I care for my jewelry?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        We recommend storing your jewelry in a dry place, avoiding water and harsh chemicals. To clean, use a soft cloth or mild jewelry cleaner.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">What is your return policy?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        We accept returns within 30 days of purchase in original condition. Custom or personalized pieces are final sale.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">Do you offer gift wrapping?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        Yes! Complimentary gift wrapping is available upon request at checkout.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">IHow long does shipping take?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        Standard shipping takes 5–7 business days within Canada/US. Express options are also available.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        <Typography component="span">Do you ship internationally?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        Yes, we ship worldwide. International shipping times vary depending on location.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <EndBanner/>
        </div>
    )
}