import {
	useEffect,
	useRef,
	useState,
	SetStateAction,
	Dispatch,
	RefObject,
} from "react";

type OutsideType = {
	ref: RefObject<HTMLDivElement>;
	windowOne: boolean;
	windowTwo: boolean;
	setWindowOne: Dispatch<SetStateAction<boolean>>;
	setWindowTwo: Dispatch<SetStateAction<boolean>>;
};

export const useOutsideClick = (): OutsideType => {
	const [windowOne, setWindowOne] = useState(false);
	const [windowTwo, setWindowTwo] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setWindowOne(false);
			setWindowTwo(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return { ref, windowOne, windowTwo, setWindowOne, setWindowTwo };
};
