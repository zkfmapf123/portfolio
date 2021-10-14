import React, { useEffect, useState } from "react";
import st from "styled-components/native";
import admob, { BannerAd, BannerAdSize, MaxAdContentRating, TestIds } from "@react-native-firebase/admob";

const Container =st.SafeAreaView``;

const Banner = () =>{

    const [showBanner, setShowBanner] = useState<boolean>(true);

    const setBannerOption = () =>{
        setShowBanner(false);

        setTimeout(()=>{
            setShowBanner(true);
        },1000);
    }

    useEffect(()=>{
        admob()
        .setRequestConfiguration({
            maxAdContentRating : MaxAdContentRating.G,
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent : false
        })
    },[]);

    const adUnitIds = __DEV__ ? TestIds.BANNER : "ca-app-pub-5294299076712395/9650454659";
    const bannerSize = BannerAdSize.BANNER;

    return(
        <Container>
            {
                showBanner &&
                <BannerAd
                    unitId={adUnitIds}
                    size={bannerSize}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly : true,
                    }}
                    onAdLoaded={() : void =>{
                        setTimeout(()=>{
                            setBannerOption();
                        },10000);
                    }}

                    onAdClosed={():void =>{
                        console.log("advertise Close");
                    }}

                    onAdFailedToLoad={(err)=>{
                        console.log(`advertise error :${err}`);
                    }}

                    onAdOpened={()=>{
                        console.log("adOpen");
                    }}

                    onAdLeftApplication={()=>{
                        console.log("onAdLeftApplication");
                    }}
                />
            }
        </Container>
    );
};

export default Banner;


