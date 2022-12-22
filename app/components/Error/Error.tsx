import { TbMoodSad } from "react-icons/tb";
import styles from "./Error.module.css";

const Error = () => {
	return (
		<p className={styles.wrapper}>
			Something went wrong
			<TbMoodSad className={styles.icon} />
		</p>
	);
};

export default Error;
