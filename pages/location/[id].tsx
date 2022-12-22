import { FC } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { GiRingedPlanet, GiArtificialHive } from "react-icons/gi";
import styles from "./Location.module.css";
import BackToLocations from "../../app/components/Buttons/BackToLocations";

const Location: FC = () => {
 const router = useRouter();
 const id = router.query.id;

 const { data, status } = useQuery({
  queryKey: ["location", { id }],
  queryFn: () =>
   axios.get(`https://rickandmortyapi.com/api/location/${id}`).then((res) => res.data),
 });

 if (status === "loading") return <p className={styles.info}>Loading...</p>;
 if (status === "error") return <p className={styles.info}>Error</p>;

 return (
  <div className={styles.top}>
   <p className={styles.name}>{data.name}</p>
   <p className={styles.dimension}>
    <GiRingedPlanet className={styles.planet} />
    {data.dimension}
   </p>
   <p className={styles.type}>
    <GiArtificialHive className={styles.hive} />
    {data.type}
   </p>
   <span className={styles.residents}>Residents:</span>
   <div className={styles.container}>
    {data &&
     data.residents.map((item: string, i: number) => (
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
    <span className={styles.noResidents}>
     {data.residents.length <= 0 && "No residents has been detected!"}
    </span>
   </div>
   <BackToLocations />
  </div>
 );
};

export default Location;
