import Header from "../shared/Header";
import Footer from "../shared/Footer";
import EventsHero from "./EventsHero";
import EventsCard from "./EventsCard";

export default function EventPage(){
    return(
        <>
            <Header/>
            <EventsHero/>
            <EventsCard/>
            <Footer/>
    
        </>
    )
}