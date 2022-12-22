import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.link}>
				<Link href="/">Home</Link>
			</p>
			<p className={styles.link}>
				<Link href="/character">Characters</Link>
			</p>
			<p className={styles.link}>
				<Link href="/episode">Episodes</Link>
			</p>
			<p className={styles.link}>
				<Link href="/location">Locations</Link>
			</p>
		</div>
	);
};

export default Header;
