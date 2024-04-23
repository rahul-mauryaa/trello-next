"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createApi } from "unsplash-js";
// import { updateBoardDetail } from '@/src/slices/board';
import { useDispatch } from "react-redux";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useUpdateBoardMutation } from "@/app/redux/api/boardApi";

const Unsplash = () => {
  const [value, setValue] = useState("");
  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY as string;

  const params = useParams();
  const BoardId = params && params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateBoardDetail, { data: ubData, isLoading: ubIsLOading }] =
    useUpdateBoardMutation();

  const dispatch = useDispatch();
  const unsplash = createApi({
    accessKey: unsplashKey,
  });

  useEffect(() => {
    async function fetchImages() {
      await findImages();
    }

    fetchImages();
  }, []);

  const findImages = async (value = "nature") => {
    setIsLoading(true);
    const images = await unsplash.search.getPhotos({
      query: value,
      page: currentPage,
      perPage: 10,
      orientation: "landscape",
    });

    setImages((images as unknown as any).response.results);
    setIsLoading(false);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    const imagesSet = await unsplash.search.getPhotos({
      query: value || "nature",
      page: currentPage + 1,
      perPage: 10,
      orientation: "landscape",
    });

    setCurrentPage(currentPage + 1);

    const response = (imagesSet as unknown as any).response.results;
    const sumAllImages = images.concat(response);
    setImages(sumAllImages);
    setIsLoading(false);
  };

  const handleImageClick = async (imageURL: any) => {
    const data = {
      backgroundImage: imageURL,
    };
    updateBoardDetail({ data, id: BoardId });
  };

  return (
    <>
      <Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Photos"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={() => findImages(value)}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        marginTop="20px"
        justifyContent="center"
      >
        {images &&
          images.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                role="button"
                cursor="pointer"
                backgroundImage={`url('${item.urls.small}')`}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                mr="10px"
                mb="10px"
                borderRadius="lg"
                height="150px"
                width="150px"
                src={item.urls.small as any}
                onClick={() => handleImageClick(item.urls.regular)}
              />
            );
          })}
      </Box>
      <Box display="flex" justifyContent="center" mt="20px">
        <Button
          onClick={loadMoreImages}
          size="xs"
          isLoading={isLoading}
          loadingText="Loading Images..."
        >
          Load more
        </Button>
      </Box>
    </>
  );
};

export default Unsplash;
