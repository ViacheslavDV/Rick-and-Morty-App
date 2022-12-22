import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCharacter = () => {
	return (
		<div className="p-4 border-2 border-slate-700 m-4 rounded-md w-[270px] h-[290px] shadow-md">
			<Skeleton width={234} height={234} />
			<p className="text-center mt-1 overflow-hidden h-[16px]">
				<Skeleton width={120} />
			</p>
		</div>
	);
};

export default SkeletonCharacter;
