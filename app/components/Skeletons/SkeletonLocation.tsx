import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLocation = () => {
	return (
		<div className="p-4 border-2 border-slate-700 m-4 w-[340px] h-[132px] rounded-md shadow-md">
			<p className="flex justify-center my-1">
				<Skeleton width={220} height={20} />
			</p>
			<p className="flex justify-center my-1">
				<Skeleton width={120} height={20} />
			</p>
			<p className="flex justify-center my-1">
				<Skeleton width={160} height={20} />
			</p>
		</div>
	);
};

export default SkeletonLocation;
