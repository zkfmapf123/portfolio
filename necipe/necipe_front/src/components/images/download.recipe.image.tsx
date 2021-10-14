import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import st from "styled-components/native";
import storage from "@react-native-firebase/storage";
import { getDownloadImageUrl } from "~/Utils/middleware/imageUpload";
import { SimpleLoadingView } from "../Loading/Loading";

type fileNameType = "recipes" | "users";

interface Props{
  style: {};
  url: string;
  fileName?: fileNameType;
};

const Container = st.View``;

export const RecipeImage = ({ style, url, fileName="recipes" }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uri, setUri] = useState<string>();

  useEffect(() => {
    setLoading(true);

    (async() => {
      await getDownloadImageUrl(fileName, { fileName: url })
        .then((afterUrl) => {
          setUri(afterUrl);
        })
        .then(() => {
          setLoading(false);
        })
    })();

    return () => {
      setLoading(false);
    };
  
  }, []);

  if (loading) {
    return (
      <Container
        style={{
          flex: 1,
          marginLeft: "auto",
          marginRight : "auto"
        }}>
        <SimpleLoadingView/>
      </Container>
    )
  } else {
    return (
      <Container
        style={style}>
        {
          uri &&
            (
              <Image
                style={style}
                source={{
                  uri: uri
                }} />
            )
        }
      </Container>)
  }
};