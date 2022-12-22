import {
	FC,
	useState,
	useCallback,
	memo,
	SetStateAction,
	Dispatch,
} from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "./Filter.module.css";

type FilterItem = {
	lifeStatus: string;
	setLifeStatus: Dispatch<SetStateAction<string>>;
	gender: string;
	setGender: Dispatch<SetStateAction<string>>;
};

const statusState = ["all", "alive", "dead", "unknown"];
const genderState = ["all", "female", "male", "genderless", "unknown"];

const Filter: FC<FilterItem> = memo(
	({ lifeStatus, setLifeStatus, gender, setGender }) => {
		// Click Outside
		const { ref, windowOne, windowTwo, setWindowOne, setWindowTwo } =
			useOutsideClick();

		// Status States
		const [activeStatus, setActiveStatus] = useState(0);
		const [statusName, setStatusName] = useState("all");

		// Gender States
		const [activeGender, setActiveGender] = useState(0);
		const [genderName, setGenderName] = useState("all");

		// Filter life status
		const changeLifeStatus = useCallback(({ index }: { index: number }) => {
			setLifeStatus(statusState[index]);
			setActiveStatus(index);
			if (index === 0) {
				setLifeStatus("");
			}
			setWindowOne(false);
			setStatusName(statusState[index]);
		}, []);

		// Filter by gender
		const changeGenderFiltering = useCallback(
			({ index }: { index: number }) => {
				setGender(genderState[index]);
				setActiveGender(index);
				if (index === 0) {
					setGender((gender = ""));
				}
				setWindowTwo(false);
				setGenderName(genderState[index]);
			},
			[]
		);

		return (
			<div className={styles.wrapper} ref={ref}>
				<span className={styles.select}>
					<div className={styles.fixedPosition}>
						<p>
							Status:
							<span
								className={styles.status}
								onClick={() => setWindowOne(!windowOne)}
							>
								{statusName}
							</span>
						</p>
						{windowOne && (
							<div className={styles.popupStatus}>
								{statusState.map((s: string, index: number) => (
									<p
										onClick={() => changeLifeStatus({ index })}
										className={styles.chooseStatus}
										key={index}
									>
										{s}
									</p>
								))}
							</div>
						)}
					</div>
				</span>
				<span className={styles.select}>
					<div className={styles.fixedPosition}>
						<p>
							Gender:
							<span
								className={styles.status}
								onClick={() => setWindowTwo(!windowTwo)}
							>
								{genderName}
							</span>
						</p>
						{windowTwo && (
							<div className={styles.popupGender}>
								{genderState.map((g: string, index) => (
									<p
										onClick={() => changeGenderFiltering({ index })}
										className={styles.chooseStatus}
										key={index}
									>
										{g}
									</p>
								))}
							</div>
						)}
					</div>
				</span>
			</div>
		);
	}
);

export default Filter;
