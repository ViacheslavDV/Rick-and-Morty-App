import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IoCalendarOutline, IoList } from "react-icons/io5";
import styles from "./Episode.module.css";
import BackToEpisodes from "../../app/components/Buttons/BackToEpisodes";

const Episode: FC = () => {
 const router = useRouter();
 const id = router.query.id;

 const { data, status } = useQuery({
  queryKey: ["episode", { id }],
  queryFn: () => axios.get(`https://rickandmortyapi.com/api/episode/${id}`).then((res) => res.data),
 });

 if (status === "loading") return <p className={styles.info}>Loading...</p>;
 if (status === "error") return <p className={styles.info}>Error</p>;

 return (
  <div className={styles.top}>
   <p className={styles.name}>{data.name}</p>
   <p className={styles.episode}>
    <IoList className={styles.list} />
    {data.episode}
   </p>
   <p className={styles.date}>
    <IoCalendarOutline className={styles.calendar} />
    {data.air_date}
   </p>
   <span className={styles.characters}>Characters:</span>
   <div className={styles.container}>
    {data &&
     data.characters.map((item: string, i: number) => (
      <div key={i} className={styles.border}>
       <Link href={`/character/${item.slice(42)}`}>
        <Image
         src={`https://rickandmortyapi.com/api/character/avatar/${item.slice(42)}.jpeg`}
         alt={item}
         width={150}
         height={150}
        />
       </Link>
      </div>
     ))}
   </div>
   <BackToEpisodes />
  </div>
 );
};

export default Episode;
