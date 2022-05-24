import { MDBCol, MDBRow } from "mdb-react-ui-kit"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getToolList } from "../../features/tool/toolSlice"
import SingleToolCard from "../../common_components/SingleToolCard"
import Banner from "./components/Banner"
import BusinessSummary from "./components/BusinessSummary"
import Contact from "./components/Contact"
import Features from "./components/Features"
import Reviewlist from "./components/Reviewlist"
import LoadingSpinner from "../../common_components/LoadingSpinner";

const Home = () => {
    const dispatch = useDispatch();
    //get initial state from tool store
    const { toolList, isLoading, isError } = useSelector(
        (state) => state.tool
    );
    useEffect(() => {
        dispatch(getToolList())
    }, []);

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <h4>Some error occured.</h4>
    }

    return (
        <div className="home">
            {/* banner */}
            <Banner />
            {/* available-tools */}
            <div className="available-tools">
                <h4 className="text-center text-dark mb-3">Available Tools</h4>
                <MDBRow className="gy-4">
                    {toolList && toolList.map((i, index) => {
                        return <MDBCol size="12" lg="4" xxl="3" key={index}>
                            <SingleToolCard {...i} />
                        </MDBCol>
                    })}
                </MDBRow>
            </div>
            {/* business summary */}
            <BusinessSummary />
            {/* Customer review */}
            <Reviewlist />
            {/* extra sections */}
            {/* features */}
            <Features />
            {/* contact us */}
            <Contact />
        </div>
    )
}

export default Home