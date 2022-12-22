import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEpisode } from "../../app/hooks/useEpisode";
import Search from "../../app/components/Search/Search";
import { IoCalendarOutline, IoList } from "react-icons/io5";
import Error from "../../app/components/Error/Error";
import SkeletonEpisode from "../../app/components/Skeletons/SkeletonEpisode";
import styles from "./Episodes.module.css";
import ScrollToTop from "../../app/components/Buttons/ScrollToTop";

const Episode = () => {
	const { episodes, fetchNextPage, hasNextPage, status, search, setSearch } =
		useEpisode();

	return (
		<div className={styles.wrapper}>
			<div className={styles.search}>
				<Search search={search} setSearch={setSearch} />
			</div>
			<div className={styles.container}>
				{status === "loading" &&
					[...new Array(15)].map((_, i) => (
						<div key={i}>
							<SkeletonEpisode />
						</div>
					))}
				{status === "error" && <Error />}
				<InfiniteScroll
					dataLength={episodes ? episodes.results.length : 0}
					next={() => fetchNextPage()}
					hasMore={!!hasNextPage}
					loader={<p className={styles.loader}>Loading...</p>}
					className={styles.infinite}
				>
					{episodes &&
						episodes.results.map((episodes) => (
							<div key={episodes.id}>
								<Link href="/episode/[id]" as={`/episode/${episodes.id}`}>
									<div className={styles.border}>
										<span>
											<p className={styles.name}>{episodes.name}</p>
											<p className={styles.episode}>
												<IoList className={styles.list} />
												{episodes.episode}
											</p>
											<p className={styles.date}>
												<IoCalendarOutline className={styles.calendar} />
												{episodes.air_date}
											</p>
										</span>
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

export default Episode;
