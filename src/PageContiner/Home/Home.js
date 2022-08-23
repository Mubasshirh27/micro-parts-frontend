import React from 'react';
import Banner from '../../Components/Banner/Banner';
import BusinessSummary from '../../Components/BusinessSummary/BusinessSummary';
import Carousel from '../../Components/Carousel/Carousel';
import Navbar from '../../Components/Navbar/Navbar';
import BG from '../../Assests/network-mesh-wire-digital-technology-background_1017-27428.jpg'
import Expertise from './Expertise';
import Footer from '../../Components/Footer/Footer';
import useProducts from '../../Hooks/useProducts';
import Products from '../../Components/Products/Products';
import './Home.css'
import useRole from '../../Hooks/useRole';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { QueryClient, useQuery } from 'react-query';
import ShowReview from '../../Components/ShowReview/ShowReview';
const Home = () => {
    const { data, isLoading } = useProducts();
    const queryClient = new QueryClient()
    const { isLoading: reviewLoading, error, data: review, refetch } = useQuery('review', () =>
        fetch('http://localhost:5000/review').then(res =>
            res.json()
        )
    )
    const [user] = useAuthState(auth)
    console.log(localStorage.getItem('token'))
    const role = useRole(user)
    if (isLoading || reviewLoading) {
        return
    }
    return (
        <div style={{ background: `url(${BG})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", height: "90vh", backgroundAttachment: "fixed" }}>
            <Navbar></Navbar>
            <Banner></Banner>
            <BusinessSummary></BusinessSummary>
            <Expertise></Expertise>
            <div className="products-container">
                {
                    data.map(product => <Products
                        key={product._id}
                        product={product}
                    ></Products>)
                }
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='font-bold'>Scroll to see other review</h3>
                <div class="carousel carousel-center md:w-1/2 w-5/6  p-4 space-x-10 overflow-scroll bg-neutral rounded-box">
                    {
                        review.map(elem => <ShowReview key={elem._id} elem={elem}></ShowReview>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;