import Newsletter from "../Common/Newsletter";
import Categories from "./Categories";
import Hero from "./Hero";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";

const Home = () => {
    return (
        <main>
            <Hero />
            <Categories />
            <NewArrival />
            <PromoBanner />
            <Newsletter />
        </main>
    );
};

export default Home;
