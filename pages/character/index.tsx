import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCharacter } from "../../app/hooks/useCharacter";
import Search from "../../app/components/Search/Search";
import Filter from "../../app/components/Filter/Filter";
import { FC, memo } from "react";
import Error from "../../app/components/Error/Error";
import SkeletonCharacter from "../../app/components/Skeletons/SkeletonCharacter";
import styles from "./Characters.module.css";
import ScrollToTop from "../../app/components/Buttons/ScrollToTop";

const Character: FC = memo(() => {
 const {
  characters,
  fetchNextPage,
  hasNextPage,
  status,
  search,
  setSearch,
  lifeStatus,
  setLifeStatus,
  gender,
  setGender,
 } = useCharacter();

 // Load Images
 const myLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`;
 };

 return (
  <div className={styles.wrapper}>
   <div className={styles.search}>
    <Search search={search} setSearch={setSearch} />
   </div>
   <div>
    <Filter
     lifeStatus={lifeStatus}
     setLifeStatus={setLifeStatus}
     gender={gender}
     setGender={setGender}
    />
   </div>
   <div className={styles.container}>
    {status === "loading" &&
     [...new Array(12)].map((_, i) => (
      <div key={i}>
       <SkeletonCharacter />
      </div>
     ))}
    {status === "error" && <Error />}
    <InfiniteScroll
     dataLength={characters ? characters.results.length : 0}
     next={() => fetchNextPage()}
     hasMore={!!hasNextPage}
     loader={<p className={styles.loader}>Loading...</p>}
     className={styles.infinite}
    >
     {characters &&
      characters.results.map((character) => (
       <div key={character.id}>
        <Link href="/character/[id]" as={`/character/${character.id}`}>
         <div className={styles.icon}>
          {character.image && (
           <Image
            className={styles.image}
            loader={myLoader}
            src={character.image}
            alt={character.name}
            width={260}
            height={260}
           />
          )}
          <p className={styles.name}>{character.name}</p>
         </div>
        </Link>
       </div>
      ))}
    </InfiniteScroll>
   </div>
   <ScrollToTop />
  </div>
 );
});

export default Character;
