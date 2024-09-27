import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { LuDot } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Booking from './Booking';

const API = "AIzaSyDpcgpYosf08HeqBopzz4420zbdIL6he-s";

const Screening = () => {
    const [data, setData] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const { imdb_id } = useParams();

    // Fetch movie details from OMDb API
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?i=${imdb_id}&apikey=d167f361`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);  // To verify data fetching
            })
            .catch((error) => {
                console.log(error);
            });
    }, [imdb_id]);

    // Fetch trailer from YouTube API after `data` is set
    useEffect(() => {
        if (data && data.Title) {
            axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    maxResults: 1,
                    q: `${data.Title} trailer`,
                    key: API
                }
            })
                .then((response) => {
                    console.log(response.data.items[0].id.videoId);  // To verify video ID fetching
                    setVideoId(response.data.items[0].id.videoId);
                })
                .catch((error) => {
                    console.error(error.response ? error.response.data : error.message);
                });
        }
    }, [data]);

    if (!data) {
        return (
            <div role="status" className='h-screen flex justify-center items-center'>
                {/* Loading spinner */}
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <>
            <div className='md:ps-32 md:pe-20'>
                <div className='flex py-4 ps-2 bg-white pt-8'>
                    <img className="rounded-lg w-36 h-56 md:h-96 md:w-auto" src={data.Poster} alt={data.Title} />
                    <div className="flex flex-col ps-2 pe-2 pt-4 leading-normal w-full md:gap-3 md:ps-4">
                        <h5 className={`mb-2 text-xl font-bold tracking-tight text-black ps-1 ${data.Title.length >= 12 ? 'text-2xl' : 'text-3xl'} md:text-3xl`}>{data.Title}</h5>
                        <div className='flex bg-gray-200 py-1 text-black text-lg font-medium justify-evenly rounded-lg md:w-56'>
                            <div className='flex'>
                                <FaStar className="mt-1 me-1 text-lg" style={{ color: "#D70040" }} />
                                {data.imdbRating === "N/A" ? `8.2/10` : `${data.imdbRating}/10`}
                            </div>
                            <div className='text-base pt-0.5'>
                                ({data.imdbVotes === "N/A" ? `50K` : `${data.imdbVotes}`} <span className='hidden md:inline'>Votes</span>)
                            </div>
                        </div>
                        <div className=" p-1 text-base flex md:text-xl hidden md:flex">
                            <div className="md:font-semibold">Director-</div>
                            <div className='ps-1'>{data.Director}</div>
                        </div>
                        <div className=" p-1 text-base flex md:text-xl">
                            <div className="md:font-semibold hidden md:block">Genre-</div>
                            <div className='ps-1'>{data.Genre.split(",").slice(0, 2).join(", ")}</div>
                        </div>
                        <div className="flex p-1 md:text-xl">
                            <div className="md:font-semibold hidden md:block">Language-</div>
                            <div className='text-base ps-1 md:text-xl'>{data.Language.includes("Hindi") ? "Hindi" : data.Language.split(",")[0]}</div>
                            <LuDot className='mt-1.5 md:text-xl' />
                            <div className='text-base md:text-xl'>{data.Runtime}</div>
                        </div>
                        <div className='text-base mb-1 p-1 md:text-xl'>
                            <span className='md:font-semibold ps-1 md:ps-0'>Date-</span> {data.Released}
                        </div>
                        <Link className="rounded-full bg-rose-500 text-white py-1 text-center md:w-72 md:p-2 md:mt-auto m-1" to={`/booking/${imdb_id}`}> 
                            Book Tickets
                        </Link>
                    </div>
                    <div className='hidden md:flex md:items-center md:justify-center md:w-full'>
                        <div>
                            {videoId && (
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&mute=1&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&loop=1&playlist=${videoId}`}
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen className=''>
                                </iframe>
                            )}
                        </div>
                    </div>
                </div>

                <div className="plot md:text-xl md:mt-12">
                    <div className="plot-heading md:text-xl ps-3 font-semibold">Cast-</div>
                    <p className="mb-3 font-normal text-gray-600 px-3">{data.Actors}</p>
                </div>
                <div className="plot md:text-xl md:pb-5">
                    <div className="plot-heading md:text-xl ps-3 font-semibold">About The Movie-</div>
                    <p className="mb-3 font-normal text-gray-600 px-3">{data.Plot}</p>
                </div>
            </div>
        </>
    );
};

export default Screening;
