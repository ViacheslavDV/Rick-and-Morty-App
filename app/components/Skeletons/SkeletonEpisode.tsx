import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonEpisode = () => {
	return (
		<div className="p-4 border-2 border-slate-700 m-4 w-[340px] h-[132px] rounded-md shadow-md">
			<p className="flex justify-center my-1">
				<Skeleton width={240} height={20} />
			</p>
			<p className="flex justify-center my-1">
				<Skeleton width={100} height={20} />
			</p>
			<p className="flex justify-center my-1">
				<Skeleton width={150} height={20} />
			</p>
		</div>
	);
};

export default SkeletonEpisode;
