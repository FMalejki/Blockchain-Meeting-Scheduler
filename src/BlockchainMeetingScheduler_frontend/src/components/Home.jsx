import React from 'react';
import '../index.scss'

function Home() {
  return (
    <div>
        <header class="sticky navbar bg-light">
            <img class="logoBMS" src="/BMS_Logo_Green.png"/>
        </header>
        <div class="container center kontenerHome">
            <div class="container center">
                <br />
                <br />
                <h1 class="display-2">BLOCKCHAIN MEETING SCHEDULER</h1>
                <p>by AGH Blockchain</p>
                <br />
                <br />
                <br />
                <br />
                <h1 class="mt-10">SCHEDULE YOUR MEETING NOW!</h1>
                <p>Login using your ICP Internet Identity!</p>
                <button type="button" class="btn btn-success btn-lg">START!</button> 
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="container center border-top border-black">
                <br />
                <br />
                <h1>ABOUT OUR APP!</h1>
                <br />
                <img class="logoBMSHome" src="/BMS_Logo_Green.png"/>
                <br />
                <p>BLOCKCHAIN MEETING SCHEDULER (BMS) made by student research group from AGH University of Science and Technology in Krakow</p>
                <p>Our goal was to make a useful tool not only for us but also for other participants of ICP Network</p>
                <p>The application has been crafted with a passion for blockchain technology by our members, with a keen focus on anonymity and decentralization, while maximizing the functionality that the ICP network offers.</p>
            </div>
            <br />
            <div class="container center border-top border-black">
                <br />
                <br />
                <div class="container center">
                    <h1>ABOUT US!</h1>
                    <br />
                    <p>Welcome to the AGH Blockchain Student Research Group!</p>
                    <p>We are a team of enthusiasts from the AGH University of Science and Technology, dedicated to exploring the potential of blockchain technology in meeting scheduling.</p>
                    <p>Our mission is to harness blockchain technology to develop a cutting-edge platform for scheduling and managing meetings. By leveraging blockchain's inherent benefits such as security, immutability, and transparency, we aim to provide users with unmatched reliability and confidence when organizing meetings, both online and offline.</p>
                    <p>Within our application, you'll find advanced tools for creating schedules, managing participants, checking availability, and tracking meeting history. Our team is committed to delivering an intuitive and efficient tool that simplifies meeting organization across various domains including business, education, and social settings.</p>
                    <p>Join our community today and embark on the journey towards revolutionizing meeting scheduling with blockchain technology!</p>
                <br />
                </div>
            </div>       
        </div>
    </div>

  );
}

export default Home;