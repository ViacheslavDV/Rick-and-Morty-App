import { BsArrowUpCircleFill } from "react-icons/bs";

const ScrollToTop: React.FC = () => {
	const handleTop = (): void => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="fixed h-[68px] w-[68px] top-[90%] left-[2%] z-10">
			<button onClick={() => handleTop()}>
				<BsArrowUpCircleFill className="h-[100%] w-[38px] text-white bg-slate-800 rounded-full" />
			</button>
		</div>
	);
};

export default ScrollToTop;
