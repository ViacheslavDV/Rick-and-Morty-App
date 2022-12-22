import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "../../app/hooks/useLocation";
import Search from "../../app/components/Search/Search";
import FilterLocations from "../../app/components/FilterLocations/FilterLocations";
import { GiRingedPlanet, GiArtificialHive } from "react-icons/gi";
import Error from "../../app/components/Error/Error";
import SkeletonLocation from "../../app/components/Skeletons/SkeletonLocation";
import styles from "./Locations.module.css";
import ScrollToTop from "../../app/components/Buttons/ScrollToTop";

const Location = () => {
	const {
		locations,
		fetchNextPage,
		hasNextPage,
		status,
		search,
		setSearch,
		locationType,
		setLocationType,
		dimension,
		setDimension,
	} = useLocation();

	return (
		<div className={styles.wrapper}>
			<div className={styles.search}>
				<Search search={search} setSearch={setSearch} />
			</div>
			<div>
				<FilterLocations
					locationType={locationType}
					setLocationType={setLocationType}
					dimension={dimension}
					setDimension={setDimension}
				/>
			</div>
			<div className={styles.container}>
				{status === "loading" &&
					[...new Array(15)].map((_, i) => (
						<div key={i}>
							<SkeletonLocation />
						</div>
					))}
				{status === "error" && <Error />}
				<InfiniteScroll
					dataLength={locations ? locations.results.length : 0}
					next={() => fetchNextPage()}
					hasMore={!!hasNextPage}
					loader={<p className={styles.loader}>Loading...</p>}
					className={styles.infinite}
				>
					{locations &&
						locations.results.map((locations) => (
							<div key={locations.id}>
								<Link href="/location/[id]" as={`/location/${locations.id}`}>
									<div className={styles.border}>
										<p className={styles.name}>{locations.name}</p>
										<p className={styles.type}>
											<GiArtificialHive className={styles.hive} />
											{locations.type}
										</p>
										<p className={styles.dimension}>
											<GiRingedPlanet className={styles.planet} />
											{locations.dimension}
										</p>
									</div>
								</Link>
							</div>
						))}
				</InfiniteScroll>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default Location;
