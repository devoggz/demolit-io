import Newsletter from "../Common/Newsletter";
import Categories from "./Categories";
import Hero from "./Hero";
import FooterFeature from "./Hero/FooterFeature";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";

const Home = () => {
    return (
        <main>
            <Hero />
            <Categories />
            <NewArrival />
            <PromoBanner />
            {/*<BestSeller />*/}
            {/*<CountDown />*/}
            {/*<Testimonials />*/}
            <Newsletter />
            {/*<FooterFeature />*/}
        </main>
    );
};

export default Home;
