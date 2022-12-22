import {
	FC,
	useState,
	useCallback,
	memo,
	SetStateAction,
	Dispatch,
} from "react";
import styles from "./FilterLocations.module.css";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type FilterLocationsType = {
	locationType: string;
	setLocationType: Dispatch<SetStateAction<string>>;
	dimension: string;
	setDimension: Dispatch<SetStateAction<string>>;
};

const typeState: string[] = [
	"all",
	"planet",
	"cluster",
	"space station",
	"microverse",
	"tv",
	"resort",
	"fantasy town",
	"dream",
];
const dimensionState: string[] = [
	"all",
	"Dimension C-137",
	"unknown",
	"Post-Apocalyptic Dimension",
	"Replacement Dimension",
	"Cronenberg Dimension",
	"Fantasy Dimension",
	"Dimension 5-126",
];

const FilterLocations: FC<FilterLocationsType> = memo(
	({ locationType, setLocationType, dimension, setDimension }) => {
		// Click Outside
		const { ref, windowOne, windowTwo, setWindowOne, setWindowTwo } =
			useOutsideClick();
		// Type States
		const [activeType, setActiveType] = useState(0);
		const [typeName, setTypeName] = useState("all");

		// Dimension States
		const [activeDimension, setActiveDimension] = useState(0);
		const [dimensionName, setDimensionName] = useState("all");

		// Filter type status
		const changeTypeStatus = useCallback(({ index }: { index: number }) => {
			setLocationType(typeState[index]);
			setActiveType(index);
			if (index === 0) {
				setLocationType("");
			}
			setWindowOne(false);
			setTypeName(typeState[index]);
		}, []);

		// Filter dimension status
		const changeDimensionStatus = useCallback(
			({ index }: { index: number }) => {
				setDimension(dimensionState[index]);
				setActiveDimension(index);
				if (index === 0) {
					setDimension("");
				}
				setWindowTwo(false);
				setDimensionName(dimensionState[index]);
			},
			[]
		);

		return (
			<div className={styles.wrapper} ref={ref}>
				<span className={styles.select}>
					<div className={styles.fixedPosition}>
						<p>
							Type:
							<span
								className={styles.status}
								onClick={() => setWindowOne(!windowOne)}
							>
								{typeName}
							</span>
						</p>
						{windowOne && (
							<div className={styles.popupType}>
								{typeState.map((type: string, index: number) => (
									<p
										onClick={() => changeTypeStatus({ index })}
										className={styles.chooseStatus}
										key={index}
									>
										{type}
									</p>
								))}
							</div>
						)}
					</div>
				</span>
				<span className={styles.select}>
					<div className={styles.fixedPosition}>
						<p>
							Dimension:
							<span
								className={styles.status}
								onClick={() => setWindowTwo(!windowTwo)}
							>
								{dimensionName}
							</span>
						</p>
						{windowTwo && (
							<div className={styles.popupDimension}>
								{dimensionState.map((g: string, index: number) => (
									<p
										onClick={() => changeDimensionStatus({ index })}
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

export default FilterLocations;
